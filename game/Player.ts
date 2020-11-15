import BoardObject from './BoardObject';

export default class Player extends BoardObject {
	protected seat: number;

	constructor(seat: number) {
		super();
		this.seat = seat;
	}

	getSeat(): number {
		return this.seat;
	}
}
