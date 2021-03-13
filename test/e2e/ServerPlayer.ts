import { client } from './Client';

export default class ServerPlayer {
	protected roomId: number;

	protected seat: number;

	constructor(roomId: number, seat: number) {
		this.roomId = roomId;
		this.seat = seat;
	}

	protected get baseUrl(): string {
		return `/room/${this.roomId}/player/${this.seat}`;
	}

	async takeSeat(): Promise<void> {
		await client.get(`${this.baseUrl}/seat?seatKey=${this.seat}`);
	}

	async invokeSkill(index = 0): Promise<void> {
		await client.post(`${this.baseUrl}/skill/${index}?seatKey=${this.seat}`);
	}

	async vote(target: number): Promise<void> {
		await client.post(`${this.baseUrl}/lynch?seatKey=${this.seat}`, {
			target,
		});
	}
}
