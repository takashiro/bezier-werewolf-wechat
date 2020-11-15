import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import SinglePlayerSkill from './SinglePlayerSkill';

const enum State {
	MeetWolves,
	Forecast,
}

class MysticWolfSkill extends SinglePlayerSkill {
	protected state = State.MeetWolves;

	isUsed(): boolean {
		return this.state > State.Forecast;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (this.state === State.Forecast) {
			return super.selectPlayer(all, target, selected);
		}
		return false;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (this.state === State.MeetWolves) {
			return players.length === 0 && cards.length === 0;
		}
		if (this.state === State.Forecast) {
			return super.validate(players, cards);
		}
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		if (this.state === State.Forecast) {
			super.addLog(players, cards);
		}
	}
}

export default MysticWolfSkill;
