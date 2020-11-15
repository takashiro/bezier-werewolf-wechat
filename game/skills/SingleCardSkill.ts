import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import Skill from '../Skill';

class SingleCardSkill extends Skill {
	selectCard(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
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

	selectPlayer(): boolean {
		return false;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (cards.length === 1) {
			return true;
		}

		this.message = '请选择1张牌';
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		this.logs.push(`你选择了第${cards[0].getPos() + 1}张牌`);
	}
}

export default SingleCardSkill;
