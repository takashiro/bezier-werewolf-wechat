import { Room as RoomConfig } from '@bezier/werewolf-core';

import { client } from './Client';
import Room from './Room';
import RoomOptions from './RoomOptions';

type ExpiryMap = Record<string, number>;

export default class Lobby {
	protected currentRoom?: Room;

	protected expiryMap: ExpiryMap;

	protected expiryLimit: number;

	constructor(expiryLimit = 12 * 3600) {
		this.expiryMap = {};
		this.expiryLimit = expiryLimit;
	}

	setCurrentRoom(room: Room): void {
		this.currentRoom = room;
	}

	getCurrentRoom(): Room | undefined {
		return this.currentRoom;
	}

	async createRoom(options: RoomOptions): Promise<number> {
		delete this.currentRoom;
		return new Promise((resolve, reject) => {
			client.post({
				url: 'room',
				data: options,
				success: async (res) => {
					if (res.statusCode === 200) {
						const config = res.data as RoomConfig;
						const { id } = config;
						if (id) {
							const room = new Room(id);
							room.setConfig(config);
							this.setCurrentRoom(room);
							await this.saveRoom(room);
						}
					}
					resolve(res.statusCode);
				},
				fail: reject,
			});
		});
	}

	async enterRoom(id: number): Promise<number> {
		delete this.currentRoom;

		const room = new Room(id);
		if (await this.hasRoom(room)) {
			try {
				await room.readConfig();
				this.setCurrentRoom(room);
				return 200;
			} catch (error) {
				// Ignore
			}
		}

		const statusCode = await room.fetchConfig();
		if (statusCode === 200) {
			this.setCurrentRoom(room);
			await this.saveRoom(room);
		}
		return statusCode;
	}

	async hasRoom(room: Room): Promise<boolean> {
		const id = room.getId();
		const expiryMap = await this.filterExpiryMap();
		return Boolean(expiryMap[id]);
	}

	async saveRoom(room: Room): Promise<void> {
		this.expiryMap[room.getId()] = new Date().getTime() + 3600 * 1000;
		await room.saveConfig();
		await this.saveExpiryMap();
	}

	async filterExpiryMap(): Promise<ExpiryMap> {
		await this.readExpiryMap();

		const now = new Date().getTime();
		const roomIds = Object.keys(this.expiryMap);

		let modified = false;
		for (const roomId of roomIds) {
			const expiry = this.expiryMap[roomId];
			if (expiry <= now) {
				modified = true;
				delete this.expiryMap[roomId];
				const id = Number.parseInt(roomId, 10);
				if (Number.isNaN(id)) {
					continue;
				}
				const room = new Room(id);
				room.delete();
			}
		}

		if (modified) {
			await this.saveExpiryMap();
		}

		return this.expiryMap;
	}

	protected readExpiryMap(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: 'expiry-map',
				success: (res) => {
					Object.assign(this.expiryMap, res.data);
					resolve();
				},
				fail: reject,
			});
		});
	}

	protected saveExpiryMap(): Promise<void> {
		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: 'expiry-map',
				data: this.expiryMap,
				success: () => resolve(),
				fail: reject,
			});
		});
	}
}

export const lobby = new Lobby();
