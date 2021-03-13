import { Room as MetaRoom } from '@bezier/werewolf-core';
import { InputElement } from 'miniprogram-automator/out/Element';
import Page from 'miniprogram-automator/out/Page';

import GameBoard from './GameBoard';
import { client } from './Client';
import ServerPlayer from './ServerPlayer';

export default class Room {
	protected readonly id: number;

	protected readonly ownerKey: string;

	protected readonly page: Page;

	constructor(room: MetaRoom, page: Page) {
		this.id = room.id;
		this.ownerKey = room.ownerKey;
		this.page = page;
	}

	getBaseUrl(): string {
		return `/room/${this.id}`;
	}

	createPlayer(seat: number): ServerPlayer {
		return new ServerPlayer(this.id, seat);
	}

	async delete(): Promise<void> {
		await client.delete(`${this.getBaseUrl()}?ownerKey=${encodeURIComponent(this.ownerKey)}`);
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
		await this.delete();
	}

	async waitFor(condition: string | number): Promise<void> {
		await this.page.waitFor(condition);
	}
}
