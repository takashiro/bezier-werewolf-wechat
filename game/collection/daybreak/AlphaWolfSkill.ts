import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

const enum State {
	MeetWolves,
	Infect,
}

class AlphaWolfSkill extends SinglePlayerSkill {
	protected state = State.MeetWolves;

	isUsed(): boolean {
		return this.state > State.Infect;
	}

	selectPlayer(target: Player): boolean {
		if (this.state === State.Infect) {
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
		if (this.state === State.Infect) {
			return super.validate();
		}
		return false;
	}

	addLog(): void {
		if (this.state === State.Infect) {
			super.addLog();
		}
	}

	invoke(): void {
		this.addLog();
		this.state++;
		this.used = true;
	}
}

export default AlphaWolfSkill;
