import {
	Player,
	Room as RoomConfig,
} from '@bezier/werewolf-core';

import randstr from '../util/randstr';

import { client } from './Client';
import RequestError from './RequestError';

export default class Room {
	protected readonly id: number;

	protected config?: RoomConfig;

	protected profile?: Player;

	constructor(id: number) {
		this.id = id;
	}

	getId(): number {
		return this.id;
	}

	getSalt(): string | undefined {
		return this.config?.salt;
	}

	getOwnerKey(): string | undefined {
		return this.config?.ownerKey;
	}

	getConfig(): RoomConfig | undefined {
		return this.config;
	}

	setConfig(config: RoomConfig): void {
		this.config = config;
	}

	async delete(): Promise<void> {
		await Promise.all([
			this.deleteConfig(),
			this.deleteSeatKey(),
			this.deleteProfile(),
		]);
	}

	fetchConfig(): Promise<number> {
		return new Promise((resolve, reject) => {
			client.get({
				url: `room/${this.id}`,
				success: (res) => {
					if (res.statusCode === 200) {
						this.config = res.data as RoomConfig;
					}
					resolve(res.statusCode);
				},
				fail: reject,
			});
		});
	}

	readConfig(): Promise<RoomConfig> {
		if (this.config) {
			return Promise.resolve(this.config);
		}

		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: `room-${this.id}`,
				success: (res) => {
					this.config = res.data;
					resolve(res.data);
				},
				fail: reject,
			});
		});
	}

	saveConfig(): Promise<void> {
		return new Promise((resolve, reject) => {
			if (!this.config) {
				reject(new Error('Configuration does not exist. Fetch it first.'));
				return;
			}
			wx.setStorage({
				key: `room-${this.id}`,
				data: this.config,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	deleteConfig(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.removeStorage({
				key: `room-${this.id}`,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	async fetchSeatKey(): Promise<string> {
		let seatKey = '';
		try {
			seatKey = await this.readSeatKey();
		} catch (error) {
			// Ignore
		}

		if (seatKey) {
			return seatKey;
		}

		seatKey = randstr(16);
		await this.writeSeatKey(seatKey);

		return seatKey;
	}

	async fetchProfile(seat: number): Promise<Player> {
		if (this.profile) {
			return this.profile;
		}

		const seatKey = await this.fetchSeatKey();
		return new Promise((resolve, reject) => {
			client.get({
				url: `room/${this.id}/player/${seat}/seat?seatKey=${seatKey}`,
				success: (res) => {
					if (res.statusCode === 200) {
						this.profile = res.data as Player;
						resolve(res.data as Player);
					} else {
						reject(new RequestError(res.statusCode, res.data as string));
					}
				},
				fail: reject,
			});
		});
	}

	readProfile(): Promise<Player> {
		if (this.profile) {
			return Promise.resolve(this.profile);
		}

		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: `room-${this.id}-profile`,
				success: (res) => {
					if (res.data) {
						const player: Player = res.data;
						this.profile = res.data;
						resolve(player);
					} else {
						reject(new Error(res.errMsg || res.data));
					}
				},
				fail: reject,
			});
		});
	}

	saveProfile(): Promise<void> {
		if (!this.profile) {
			return Promise.reject(new Error('No profile exists'));
		}

		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: `room-${this.id}-profile`,
				data: this.profile,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	deleteProfile(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.removeStorage({
				key: `room-${this.id}-profile`,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	protected readSeatKey(): Promise<string> {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: `${this.id}-seatKey`,
				success(res) {
					if (res && typeof res.data === 'string') {
						resolve(res.data);
					} else {
						resolve('');
					}
				},
				fail: reject,
			});
		});
	}

	protected writeSeatKey(seatKey: string): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: `${this.id}-seatKey`,
				data: seatKey,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	protected deleteSeatKey(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.removeStorage({
				key: `${this.id}-seatKey`,
				success: () => resolve(),
				fail: reject,
			});
		});
	}
}
