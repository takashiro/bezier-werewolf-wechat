import Card from '../../Card';
import Player from '../../Player';
import Skill from '../../Skill';

class Seer extends Skill {
	protected buttonLabel = '预知未来';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		this.board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(target: Player): boolean {
		target.setSelected(false);
		return true;
	}

	selectCard(target: Card): boolean {
		const prev = this.board.getSelectedCards();
		if (prev.length >= 2) {
			return false;
		}
		target.setSelected(true);
		return true;
	}

	unelectCard(target: Card): boolean {
		target.setSelected(false);
		return true;
	}

	validate(): boolean {
		const cards = this.board.getSelectedCards();
		const players = this.board.getSelectedPlayers();
		if ((players.length === 1 && cards.length === 0)
			|| (players.length === 0 && cards.length === 2)) {
			return true;
		}

		this.message = '请选择1名玩家或2张牌';
		return false;
	}
}

export default Seer;
