import Board from '../Board';
import Card from '../Card';
import Skill from '../Skill';

class SingleCardSkill extends Skill {
	selectCard(board: Board, target: Card): boolean {
		board.resetSelectedCards();
		target.setSelected(true);
		return true;
	}

	unselectCard(board: Board, target: Card): boolean {
		if (target.isSelected()) {
			target.setSelected(false);
			return true;
		}
		return false;
	}

	selectPlayer(): boolean {
		return false;
	}

	unselectPlayer(): boolean {
		return false;
	}

	validate(board: Board): boolean {
		const cards = board.getSelectedCards();
		const players = board.getSelectedPlayers();
		if (cards.length === 1 && players.length <= 0) {
			return true;
		}

		this.message = '请选择1张牌';
		return false;
	}

	addLog(board: Board): void {
		const [card] = board.getSelectedCards();
		this.logs.push(`你选择了第${card.getPos() + 1}张牌`);
	}
}

export default SingleCardSkill;
