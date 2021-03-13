import {
	Role,
	Room,
} from '@bezier/werewolf-core';

import automator from 'miniprogram-automator';
import { InputElement } from 'miniprogram-automator/out/Element';
import Page from 'miniprogram-automator/out/Page';
import MiniProgram from 'miniprogram-automator/out/MiniProgram';

import { client } from './Client';
import RoomPage from './Room';
import checkHttp from './util/checkHttp';
import waitUntil from './util/waitUntil';

export default class Lobby {
	protected wsEndpoint: string;

	protected timeout: number;

	protected program?: MiniProgram;

	constructor(wsEndpoint: string, timeout = 60000) {
		this.wsEndpoint = wsEndpoint;
		this.timeout = timeout;
	}

	async connect(): Promise<void> {
		if (this.program) {
			return;
		}

		const link = this.wsEndpoint.replace(/^ws:\/\//, 'http://');
		await waitUntil(() => checkHttp(link, 426), this.timeout, 1000);

		this.program = await automator.connect({
			wsEndpoint: this.wsEndpoint,
		});
	}

	async disconnect(): Promise<void> {
		if (!this.program) {
			return;
		}
		this.program.disconnect();
		delete this.program;
	}

	async prepare(): Promise<void> {
		const pages = await this.program.pageStack();
		if (pages.length > 1 || pages.length <= 0 || pages[0].path !== 'gui/index') {
			await this.program.reLaunch('/gui/index');
		}
		const [page] = await this.program.pageStack();
		await page.waitFor('.creator');
		await page.waitFor('.entrance');
	}

	async getCurrentPage(): Promise<Page | undefined> {
		return this.program?.currentPage();
	}

	async createRoom(roles: Role[]): Promise<RoomPage> {
		if (!this.program) {
			throw new Error('No program is connected.');
		}

		const room = await client.postJson('/room', {
			random: false,
			roles,
		}) as Room;

		const page = await this.program.currentPage();
		await page.waitFor('.creator');
		await page.waitFor('.entrance');
		const entrance = await page.$('.entrance');
		const input = await entrance.$('input') as InputElement;
		await input.input(`${room.id}`);
		const button = await entrance.$('button');
		await button.tap();

		await waitUntil(async () => {
			const next = await this.program.currentPage();
			return next.path === 'gui/room/index';
		});
		return new RoomPage(room, await this.program.currentPage());
	}
}

export const lobby = new Lobby('ws://127.0.0.1:8888');
