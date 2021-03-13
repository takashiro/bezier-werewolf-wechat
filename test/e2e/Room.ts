import { InputElement } from 'miniprogram-automator/out/Element';
import Page from 'miniprogram-automator/out/Page';

import GameBoard from './GameBoard';

type Condition = () => void;

export default class Room {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async takeSeat(seat: number): Promise<void> {
		await this.page.waitFor('roleviewer');
		const roleviewer = await this.page.$('roleviewer');
		const input = await roleviewer.$('input') as InputElement;
		await input.input(`${seat}`);
		const button = await roleviewer.$('button');
		await button.tap();
	}

	async getBoard(): Promise<GameBoard> {
		await this.page.waitFor('roleviewer board');
		const board = await this.page.$('roleviewer board');
		return new GameBoard(board);
	}

	async exit(): Promise<void> {
		const buttonArea = await this.page.$('.container > .button-area');
		const exit = await buttonArea.$('button');
		await exit.tap();
	}

	async waitFor(condition: string | number | Condition): Promise<void> {
		await this.page.waitFor(condition);
	}
}
