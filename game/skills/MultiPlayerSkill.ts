import Board from '../Board';
import Player from '../Player';
import Skill from '../Skill';

class MultiPlayerSkill extends Skill {
	protected playerNum: number;

	constructor(playerNum: number) {
		super();

		this.playerNum = playerNum;
	}

	selectCard(): boolean {
		return false;
	}

	selectPlayer(board: Board, target: Player): boolean {
		const prev = board.getSelectedPlayers();
		if (prev.length >= this.playerNum) {
			return false;
		}
		target.setSelected(true);
		return true;
	}

	unselectPlayer(board: Board, target: Player): boolean {
		if (!target.isSelected()) {
			return false;
		}
		target.setSelected(false);
		return true;
	}

	validate(board: Board): boolean {
		const players = board.getSelectedPlayers();
		if (players.length === this.playerNum) {
			return true;
		}

		this.message = `请选择${this.playerNum}名玩家`;
		return false;
	}

	addLog(board: Board): void {
		const players = board.getSelectedPlayers();
		const texts = players.map((player) => `${player.getSeat()}号`);
		this.logs.push(texts.length > 0 ? `你选择了${texts.join('和')}` : '');
	}
}

export default MultiPlayerSkill;
