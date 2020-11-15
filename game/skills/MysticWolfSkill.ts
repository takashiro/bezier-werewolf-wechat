import Board from '../Board';
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

	selectPlayer(board: Board, target: Player): boolean {
		if (this.state === State.Forecast) {
			return super.selectPlayer(board, target);
		}
		return false;
	}

	validate(board: Board): boolean {
		if (this.state === State.MeetWolves) {
			const cards = board.getSelectedCards();
			const players = board.getSelectedPlayers();
			return players.length === 0 && cards.length === 0;
		}
		if (this.state === State.Forecast) {
			return super.validate(board);
		}
		return false;
	}

	addLog(board: Board): void {
		if (this.state === State.Forecast) {
			super.addLog(board);
		}
	}

	invoke(board: Board): void {
		this.addLog(board);
		this.state++;
		this.used = true;
	}
}

export default MysticWolfSkill;
