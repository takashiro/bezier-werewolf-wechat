import {
	Role,
	Room,
} from '@bezier/werewolf-core';
import bent from 'bent';

import automator from 'miniprogram-automator';
import { InputElement } from 'miniprogram-automator/out/Element';
import MiniProgram from 'miniprogram-automator/out/MiniProgram';

import RoomPage from './Room';
import waitUntil from './util/waitUntil';

const post = bent('json', 'POST', 'https://onuw.takashiro.cn/api');

export default class Lobby {
	protected wsEndpoint: string;

	protected program?: MiniProgram;

	constructor(wsEndpoint: string) {
		this.wsEndpoint = wsEndpoint;
	}

	async start(): Promise<void> {
		if (!this.program) {
			this.program = await automator.connect({
				wsEndpoint: this.wsEndpoint,
			});
		}
	}

	async quit(): Promise<void> {
		if (this.program) {
			this.program.disconnect();
		}
	}

	async createRoom(roles: Role[]): Promise<RoomPage> {
		if (!this.program) {
			throw new Error('No program is connected.');
		}

		const room: Room = await post('/room', {
			random: false,
			roles,
		});

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
		return new RoomPage(await this.program.currentPage());
	}
}

export const lobby = new Lobby('ws://127.0.0.1:8888');
