import BoardObject from './BoardObject';

export default class Card extends BoardObject {
	protected pos: number;

	constructor(pos: number) {
		super();
		this.pos = pos;
	}

	getPos(): number {
		return this.pos;
	}
}
