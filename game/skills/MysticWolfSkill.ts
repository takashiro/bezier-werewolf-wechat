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

	selectPlayer(target: Player): boolean {
		if (this.state === State.Forecast) {
			return super.selectPlayer(target);
		}
		return false;
	}

	validate(): boolean {
		if (this.state === State.MeetWolves) {
			const cards = this.board.getSelectedCards();
			const players = this.board.getSelectedPlayers();
			return players.length === 0 && cards.length === 0;
		}
		if (this.state === State.Forecast) {
			return super.validate();
		}
		return false;
	}

	addLog(): void {
		if (this.state === State.Forecast) {
			super.addLog();
		}
	}

	invoke(): void {
		this.addLog();
		this.state++;
		this.used = true;
	}
}

export default MysticWolfSkill;
