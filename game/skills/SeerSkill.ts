import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import Skill from '../Skill';

class SeerSkill extends Skill {
	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
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

	selectCard(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (selected) {
			const prev = all.filter((card) => card.isSelected());
			if (prev.length >= 2) {
				return false;
			}
			target.setSelected(true);
		} else {
			target.setSelected(false);
		}
		return true;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if ((players.length === 1 && cards.length === 0)
			|| (players.length === 0 && cards.length === 2)) {
			return true;
		}

		this.message = '请选择1名玩家或2张牌';
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
	}
}

export default SeerSkill;
