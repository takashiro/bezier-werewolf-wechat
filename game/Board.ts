import {
	Selection,
	Vision,
} from '@bezier/werewolf-core';

import Room from '../base/Room';
import RequestError from '../base/RequestError';
import { client } from '../base/Client';

import Card from './Card';
import Player from './Player';
import Skill from './Skill';
import collection from './collection/index';

export default class Board {
	protected room: Room;

	protected skills: Skill[] = [];

	protected cards: Card[] = [];

	protected players: Player[] = [];

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
		const SkillClasses = collection.get(self.role);
		if (me && SkillClasses) {
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

	async invokeSkill(): Promise<boolean> {
		const vision = await this.sendSkillTargets();
		return this.update(vision);
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
}
