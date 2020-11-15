import Board from '../Board';
import Player from '../Player';
import Skill from '../Skill';

class SinglePlayerSkill extends Skill {
	selectCard(): boolean {
		return false;
	}

	selectPlayer(board: Board, target: Player): boolean {
		board.resetSelectedPlayers();
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
		const cards = board.getSelectedCards();
		const players = board.getSelectedPlayers();
		if (cards.length <= 0 && players.length === 1) {
			return true;
		}

		this.message = '请选择1名玩家';
		return false;
	}

	addLog(board: Board): void {
		const [player] = board.getSelectedPlayers();
		this.logs.push(`你选择了${player.getSeat()}号`);
	}
}

export default SinglePlayerSkill;
