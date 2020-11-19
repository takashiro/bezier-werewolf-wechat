import Card from '../Card';
import Skill from '../Skill';

class SingleCardSkill extends Skill {
	selectCard(target: Card): boolean {
		this.board.resetSelectedCards();
		target.setSelected(true);
		return true;
	}

	unselectCard(target: Card): boolean {
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

	validate(): boolean {
		const cards = this.board.getSelectedCards();
		const players = this.board.getSelectedPlayers();
		if (cards.length === 1 && players.length <= 0) {
			return true;
		}

		this.message = '请选择1张牌';
		return false;
	}

	addLog(): void {
		const [card] = this.board.getSelectedCards();
		this.logs.push(`你选择了第${card.getPos() + 1}张牌`);
	}
}

export default SingleCardSkill;
