import BoardObject from '../BoardObject';
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

	selectCard(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (this.state !== State.Init) {
			return false;
		}

		if (selected) {
			for (const card of all) {
				card.setSelected(false);
			}
			target.setSelected(true);
		} else {
			target.setSelected(false);
		}
		return true;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (this.state !== State.CardSelected) {
			return false;
		}

		if (selected) {
			for (const player of all) {
				player.setSelected(false);
			}
			target.setSelected(true);
		} else {
			target.setSelected(false);
		}
		return true;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (this.state === State.Init) {
			return cards.length === 1;
		}
		if (this.state === State.CardSelected) {
			return players.length === 1;
		}
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		if (players && players[0]) {
			this.logs.push(`你选择了${players[0].getSeat()}号`);
		} else if (cards && cards[0]) {
			this.logs.push(`你选择了第${cards[0].getPos() + 1}张牌`);
		}
	}
}

export default WitchSkill;
