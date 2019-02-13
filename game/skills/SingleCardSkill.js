
import Skill from '../Skill';

class SingleCardSkill extends Skill {

	selectCard(all, target, selected) {
		if (selected) {
			for (const card of all) {
				card.selected = false;
			}
			target.selected = true;
		} else {
			target.selected = false;
		}
		return true;
	}

	selectPlayer() {}

	validate(players, cards) {
		if (cards.length === 1) {
			return true;
		} else {
			this.message = `请选择1张牌`;
		}
	}

	getActionLog(players, cards) {
		return `你选择了第${cards[0].pos + 1}张牌`;
	}

}

export default SingleCardSkill;
