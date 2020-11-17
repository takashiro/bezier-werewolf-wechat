import { Role } from '@bezier/werewolf-core';

import Card from './Card';
import Player from './Player';
import Skill from './Skill';
import skillMap from './skills/index';

interface BoardConfiguration {
	role: Role;
	cardNum: number;
	playerNum: number;
}

export default class Board {
	protected skill?: Skill;

	protected cards: Card[];

	protected players: Player[];

	constructor(config: BoardConfiguration) {
		const SkillClass = skillMap.get(config.role);
		if (SkillClass) {
			this.skill = new SkillClass(this);
		}

		this.cards = new Array(config.cardNum);
		for (let i = 0; i < this.cards.length; i++) {
			this.cards[i] = new Card(i);
		}
		this.players = new Array(config.playerNum);
		for (let i = 0; i < this.players.length; i++) {
			this.players[i] = new Player(i + 1);
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

	togglePlayer(seat: number): boolean {
		if (!this.skill) {
			return false;
		}

		const player = this.getPlayer(seat);
		if (!player) {
			return false;
		}

		if (player.isSelected()) {
			return this.skill.unselectPlayer(player);
		}
		return this.skill.selectPlayer(player);
	}

	toggleCard(pos: number): boolean {
		if (!this.skill) {
			return false;
		}

		const card = this.getCard(pos);
		if (!card) {
			return false;
		}

		if (card.isSelected()) {
			return this.skill.unselectCard(card);
		}
		return this.skill.selectCard(card);
	}
}
