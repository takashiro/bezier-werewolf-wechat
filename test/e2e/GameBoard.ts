import Element from 'miniprogram-automator/out/Element';
import Card from './Card';
import Player from './Player';

export default class GameBoard {
	protected readonly board: Element;

	constructor(board: Element) {
		this.board = board;
	}

	async getCards(): Promise<Card[]> {
		const cards: Element[] = await this.board.$$('.card-list card');
		return cards.map((card) => new Card(card));
	}

	async getPlayers(): Promise<Player[]> {
		const players: Element[] = await this.board.$$('.player-list player');
		return players.map((player) => new Player(player));
	}

	async submit(): Promise<void> {
		const button = await this.board.$('.button-area button');
		await button.tap();
	}
}
