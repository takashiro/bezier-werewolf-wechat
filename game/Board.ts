import {
	Selection,
	Vision,
	LynchResult,
	LynchVote,
} from '@bezier/werewolf-core';

import Room from '../base/Room';
import RequestError from '../base/RequestError';
import { client } from '../base/Client';

import Card from './Card';
import Player from './Player';
import Skill from './Skill';

import collection from './collection/index';
import WakeUp from './collection/WakeUp';
import Vote from './collection/Vote';
import VoteBulletin from './VoteBulletin';
import VoteGroup from './VoteGroup';

export default class Board {
	protected room: Room;

	protected skills: Skill[] = [];

	protected cards: Card[] = [];

	protected players: Player[] = [];

	protected result?: LynchResult;

	constructor(room: Room) {
		this.room = room;
	}

	async prepare(): Promise<void> {
		const config = await this.room.readConfig();

		const cardNum = 3;
		this.cards = new Array(cardNum);
		for (let i = 0; i < this.cards.length; i++) {
			this.cards[i] = new Card(i);
		}

		this.players = new Array(config.roles.length - cardNum);
		for (let i = 0; i < this.players.length; i++) {
			this.players[i] = new Player(i + 1);
		}

		const self = await this.room.readProfile();
		const me = this.getPlayer(self.seat);
		if (me) {
			const SkillClasses = collection.get(self.role) || [WakeUp];
			SkillClasses.push(Vote);
			me.setRole(self.role);
			this.skills = SkillClasses.map((SkillClass) => new SkillClass(this, me));
		} else {
			this.skills = [];
		}
	}

	getSkill(): Skill | undefined {
		for (const skill of this.skills) {
			if (!skill.isUsed()) {
				return skill;
			}
		}
	}

	getCards(): Card[] {
		return this.cards;
	}

	getSelectedCards(): Card[] {
		return this.cards.filter((card) => card.isSelected());
	}

	getCard(pos: number): Card | undefined {
		return this.cards[pos];
	}

	getPlayers(): Player[] {
		return this.players;
	}

	getSelectedPlayers(): Player[] {
		return this.players.filter((player) => player.isSelected());
	}

	getPlayer(seat: number): Player | undefined {
		return this.players[seat - 1];
	}

	resetSelectedCards(): void {
		for (const card of this.cards) {
			card.setSelected(false);
		}
	}

	resetSelectedPlayers(): void {
		for (const player of this.players) {
			player.setSelected(false);
		}
	}

	resetSelection(): void {
		this.resetSelectedCards();
		this.resetSelectedPlayers();
	}

	togglePlayer(seat: number): boolean {
		const skill = this.getSkill();
		if (!skill || skill.isUsed()) {
			return false;
		}

		const player = this.getPlayer(seat);
		if (!player) {
			return false;
		}

		if (player.isSelected()) {
			return skill.unselectPlayer(player);
		}
		return skill.selectPlayer(player);
	}

	toggleCard(pos: number): boolean {
		const skill = this.getSkill();
		if (!skill || skill.isUsed()) {
			return false;
		}

		const card = this.getCard(pos);
		if (!card) {
			return false;
		}

		if (card.isSelected()) {
			return skill.unselectCard(card);
		}
		return skill.selectCard(card);
	}

	async vote(): Promise<void> {
		const targets = this.getSelectedPlayers();
		if (targets.length <= 0) {
			return;
		}

		const room = await this.room.readConfig();
		const self = await this.room.readProfile();
		const seatKey = await this.room.fetchSeatKey();

		const data = {
			target: targets[0].getSeat(),
		};
		return new Promise((resolve, reject) => {
			client.post({
				url: `room/${room.id}/player/${self.seat}/lynch?seatKey=${seatKey}`,
				data,
				success: (res) => {
					if (res.statusCode === 200) {
						resolve();
					} else {
						reject(new RequestError(res.statusCode, res.data as string));
					}
				},
				fail: reject,
			});
		});
	}

	async invokeSkill(): Promise<boolean> {
		const vision = await this.sendSkillTargets();
		return this.update(vision);
	}

	async refreshResult(): Promise<VoteBulletin> {
		const res = await this.fetchVotes();
		if (res.cards || res.players) {
			this.update(res);
		}

		const {
			progress,
			limit,
			players,
		} = res;
		const items: VoteGroup[] = [];
		if (players) {
			const map = this.countVotes(players);
			for (const [to, from] of map) {
				items.push({
					from,
					to,
				});
			}
			items.sort((a, b) => b.from.length - a.from.length);
		}
		return {
			progress,
			limit,
			items,
		};
	}

	protected async sendSkillTargets(): Promise<Vision> {
		const room = await this.room.readConfig();
		const self = await this.room.readProfile();
		const seatKey = await this.room.fetchSeatKey();

		const selectedCards = this.getSelectedCards();
		const selectedPlayers = this.getSelectedPlayers();
		const data: Selection = {
			cards: selectedCards.length > 0 ? selectedCards.map((card) => card.getPos()) : undefined,
			players: selectedPlayers.length > 0 ? selectedPlayers.map((player) => player.getSeat()) : undefined,
		};

		return new Promise((resolve, reject) => {
			client.post({
				url: `room/${room.id}/player/${self.seat}/skill?seatKey=${seatKey}`,
				data,
				success: (res) => {
					if (res.statusCode === 200) {
						const vision = (res.data || {}) as Vision;
						resolve(vision);
					} else {
						reject(new RequestError(res.statusCode, res.data as string));
					}
				},
				fail: reject,
			});
		});
	}

	protected update(vision: Vision): boolean {
		let updated = false;
		const { players, cards } = vision;
		if (players) {
			for (const { seat, role } of players) {
				const player = this.getPlayer(seat);
				if (player && player.getRole() !== role) {
					player.setRole(role);
					updated = true;
				}
			}
		}
		if (cards) {
			for (const { pos, role } of cards) {
				const card = this.getCard(pos);
				if (card && card.getRole() !== role) {
					card.setRole(role);
					updated = true;
				}
			}
		}
		return updated;
	}

	protected async fetchVotes(): Promise<LynchResult> {
		const room = await this.room.readConfig();
		const self = await this.room.readProfile();
		const seatKey = await this.room.fetchSeatKey();

		return new Promise((resolve, reject) => {
			client.get({
				url: `room/${room.id}/player/${self.seat}/lynch?seatKey=${seatKey}`,
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data as LynchResult);
					} else {
						reject(new RequestError(res.statusCode, res.data as string));
					}
				},
				fail: reject,
			});
		});
	}

	protected countVotes(votes: LynchVote[]): Map<Player, Player[]> {
		votes.sort((a, b) => a.seat - b.seat);
		const map = new Map<Player, Player[]>();
		for (const vote of votes) {
			const from = this.getPlayer(vote.seat);
			const to = this.getPlayer(vote.target);
			if (!from || !to) {
				continue;
			}

			const votes = map.get(to);
			if (votes) {
				votes.push(from);
			} else {
				map.set(to, [from]);
			}
		}
		return map;
	}
}
