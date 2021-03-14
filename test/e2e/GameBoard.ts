import Element from 'miniprogram-automator/out/Element';
import Card from './Card';
import Player from './Player';
import waitUntil from './util/waitUntil';

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

	async getButtonText(): Promise<string | undefined> {
		const button = await this.board.$('.button-area button');
		return button ? button.text() : undefined;
	}

	async waitForButton(buttonText: string): Promise<void> {
		await waitUntil(async () => {
			const text = await this.getButtonText();
			return text === buttonText;
		});
	}

	async submit(): Promise<void> {
		const button = await this.board.$('.button-area button');
		await button.tap();
	}

	async waitForVoteResult(): Promise<void> {
		await waitUntil(async () => {
			const headers = await this.board.$$('view.box text.header');
			const finalHeader = headers[headers.length - 1];
			const headerText = await finalHeader?.text();
			return headerText === '投票结果';
		});
	}
}
