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
		const cards: Element[] = await this.getCardElements();
		return cards.map((card) => new Card(card));
	}

	async getCard(pos: number): Promise<Card | undefined> {
		const cards: Element[] = await this.getCardElements();
		const card = cards[pos];
		return card && new Card(card);
	}

	async tapCard(pos: number): Promise<void> {
		const card = await this.getCard(pos);
		await card?.tap();
	}

	async waitForCard(pos: number, labelText: string): Promise<void> {
		await waitUntil(async () => {
			const card = await this.getCard(pos);
			const text = await card?.text();
			return text === labelText;
		});
	}

	async getPlayers(): Promise<Player[]> {
		const players: Element[] = await this.getPlayerElements();
		return players.map((player) => new Player(player));
	}

	async getPlayer(seat: number): Promise<Player | undefined> {
		const players: Element[] = await this.getPlayerElements();
		const player = players[seat - 1];
		return player && new Player(player);
	}

	async tapPlayer(seat: number): Promise<void> {
		const player = await this.getPlayer(seat);
		await player?.tap();
	}

	async waitForPlayer(seat: number, labelText: string): Promise<void> {
		await waitUntil(async () => {
			const player = await this.getPlayer(seat);
			const text = await player?.text();
			return text === labelText;
		});
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

	async start(): Promise<void> {
		const button = await this.board.$('.night-button');
		await button.tap();
	}

	async ready(): Promise<void> {
		await waitUntil(async () => {
			const players = await this.getPlayerElements();
			const cards = await this.getCardElements();
			return players.length > 0 && cards.length > 0;
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

	protected getCardElements(): Promise<Element[]> {
		return this.board.$$('.card-list card');
	}

	protected getPlayerElements(): Promise<Element[]> {
		return this.board.$$('.player-list player');
	}
}
