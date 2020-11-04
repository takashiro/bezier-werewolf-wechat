import {
	Player as PlayerProfile,
	Room as RoomConfig,
} from '@bezier/werewolf-core';

import { client } from './Client';

export default class Room {
	protected readonly id: number;

	protected config?: RoomConfig;

	protected profile?: PlayerProfile;

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
			this.deleteSession(),
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

	readSession(): Promise<PlayerProfile | undefined> {
		if (this.profile) {
			return Promise.resolve(this.profile);
		}

		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: `room-${this.id}-session`,
				success: (res) => {
					this.profile = res.data;
					resolve(this.profile);
				},
				fail: reject,
			});
		});
	}

	saveSession(profile: PlayerProfile): Promise<void> {
		this.profile = profile;
		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: `room-${this.id}-session`,
				data: profile,
				success: () => resolve(),
				fail: reject,
			});
		});
	}

	deleteSession(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.removeStorage({
				key: `room-${this.id}-session`,
				success: () => resolve(),
				fail: reject,
			});
		});
	}
}
