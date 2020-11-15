import Board from '../Board';
import Player from '../Player';
import Card from '../Card';
import Skill from '../Skill';

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

	selectCard(board: Board, target: Card): boolean {
		if (this.state !== State.Init) {
			return false;
		}

		board.resetSelectedCards();
		target.setSelected(true);
		return true;
	}

	unselectCard(board: Board, target: Card): boolean {
		if (this.state !== State.Init) {
			return false;
		}

		target.setSelected(false);
		return true;
	}

	selectPlayer(board: Board, target: Player): boolean {
		if (this.state !== State.CardSelected) {
			return false;
		}

		board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(board: Board, target: Player): boolean {
		if (this.state !== State.CardSelected) {
			return false;
		}

		target.setSelected(false);
		return true;
	}

	validate(board: Board): boolean {
		if (this.state === State.Init) {
			const cards = board.getSelectedCards();
			return cards.length === 1;
		}
		if (this.state === State.CardSelected) {
			const players = board.getSelectedPlayers();
			return players.length === 1;
		}
		return false;
	}

	addLog(board: Board): void {
		if (this.state === State.Init) {
			const [card] = board.getSelectedCards();
			this.logs.push(`你选择了第${card.getPos() + 1}张牌`);
		} else if (this.state === State.CardSelected) {
			const [player] = board.getSelectedPlayers();
			this.logs.push(`你选择了${player.getSeat()}号`);
		}
	}
}

export default WitchSkill;
