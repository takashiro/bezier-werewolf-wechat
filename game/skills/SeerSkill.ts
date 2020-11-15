import Board from '../Board';
import Card from '../Card';
import Player from '../Player';
import Skill from '../Skill';

class SeerSkill extends Skill {
	selectPlayer(board: Board, target: Player): boolean {
		board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(board: Board, target: Player): boolean {
		target.setSelected(false);
		return true;
	}

	selectCard(board: Board, target: Card): boolean {
		const prev = board.getSelectedCards();
		if (prev.length >= 2) {
			return false;
		}
		target.setSelected(true);
		return true;
	}

	unelectCard(board: Board, target: Card): boolean {
		target.setSelected(false);
		return true;
	}

	validate(board: Board): boolean {
		const cards = board.getSelectedCards();
		const players = board.getSelectedPlayers();
		if ((players.length === 1 && cards.length === 0)
			|| (players.length === 0 && cards.length === 2)) {
			return true;
		}

		this.message = '请选择1名玩家或2张牌';
		return false;
	}
}

export default SeerSkill;
