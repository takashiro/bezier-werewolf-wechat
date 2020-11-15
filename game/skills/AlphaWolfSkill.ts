import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import SinglePlayerSkill from './SinglePlayerSkill';

const enum State {
	MeetWolves,
	Infect,
}

class AlphaWolfSkill extends SinglePlayerSkill {
	protected state = State.MeetWolves;

	isUsed(): boolean {
		return this.state > State.Infect;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (this.state === State.Infect) {
			return super.selectPlayer(all, target, selected);
		}
		return false;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (this.state === State.MeetWolves) {
			return players.length === 0 && cards.length === 0;
		}
		if (this.state === State.Infect) {
			return super.validate(players, cards);
		}
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		if (this.state === State.Infect) {
			super.addLog(players, cards);
		}
	}
}

export default AlphaWolfSkill;
