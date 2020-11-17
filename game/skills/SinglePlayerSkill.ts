import Player from '../Player';
import Skill from '../Skill';

class SinglePlayerSkill extends Skill {
	selectCard(): boolean {
		return false;
	}

	selectPlayer(target: Player): boolean {
		this.board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(target: Player): boolean {
		if (!target.isSelected()) {
			return false;
		}
		target.setSelected(false);
		return true;
	}

	validate(): boolean {
		const cards = this.board.getSelectedCards();
		const players = this.board.getSelectedPlayers();
		if (cards.length <= 0 && players.length === 1) {
			return true;
		}

		this.message = '请选择1名玩家';
		return false;
	}

	addLog(): void {
		const [player] = this.board.getSelectedPlayers();
		this.logs.push(`你选择了${player.getSeat()}号`);
	}
}

export default SinglePlayerSkill;
