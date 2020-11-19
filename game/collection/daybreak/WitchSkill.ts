import Player from '../../Player';
import Card from '../../Card';
import Skill from '../../Skill';

const enum State {
	Init,
	CardSelected,
	PlayerSelected,
}

class WitchSkill extends Skill {
	protected state = State.Init;

	isUsed(): boolean {
		return this.state === State.PlayerSelected;
	}

	selectCard(target: Card): boolean {
		if (this.state !== State.Init) {
			return false;
		}

		this.board.resetSelectedCards();
		target.setSelected(true);
		return true;
	}

	unselectCard(target: Card): boolean {
		if (this.state !== State.Init) {
			return false;
		}

		target.setSelected(false);
		return true;
	}

	selectPlayer(target: Player): boolean {
		if (this.state !== State.CardSelected) {
			return false;
		}

		this.board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(target: Player): boolean {
		if (this.state !== State.CardSelected) {
			return false;
		}

		target.setSelected(false);
		return true;
	}

	validate(): boolean {
		if (this.state === State.Init) {
			const cards = this.board.getSelectedCards();
			return cards.length === 1;
		}
		if (this.state === State.CardSelected) {
			const players = this.board.getSelectedPlayers();
			return players.length === 1;
		}
		return false;
	}

	addLog(): void {
		if (this.state === State.Init) {
			const [card] = this.board.getSelectedCards();
			this.logs.push(`你选择了第${card.getPos() + 1}张牌`);
		} else if (this.state === State.CardSelected) {
			const [player] = this.board.getSelectedPlayers();
			this.logs.push(`你选择了${player.getSeat()}号`);
		}
	}
}

export default WitchSkill;
