import Card from './Card';
import Player from './Player';

interface BoardConfiguration {
	cardNum: number;
	playerNum: number;
}

export default class Board {
	protected cards: Card[];

	protected players: Player[];

	constructor(config: BoardConfiguration) {
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

	getPlayers(): Player[] {
		return this.players;
	}

	getSelectedCards(): Card[] {
		return this.cards.filter((card) => card.isSelected());
	}

	getSelectedPlayers(): Player[] {
		return this.players.filter((player) => player.isSelected());
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
}
