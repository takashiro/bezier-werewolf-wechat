import Board from '../Board';
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

	selectPlayer(board: Board, target: Player): boolean {
		if (this.state === State.Infect) {
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
		if (this.state === State.Infect) {
			return super.validate(board);
		}
		return false;
	}

	addLog(board: Board): void {
		if (this.state === State.Infect) {
			super.addLog(board);
		}
	}

	invoke(board: Board): void {
		this.addLog(board);
		this.state++;
		this.used = true;
	}
}

export default AlphaWolfSkill;
