
import Skill from '../Skill';

class SeerSkill extends Skill {

	selectPlayer(all, target, selected) {
		if (selected) {
			for (const player of all) {
				player.selected = false;
			}
			target.selected = true;
		} else {
			target.selected = false;
		}
		return true;
	}

	selectCard(all, target, selected) {
		if (selected) {
			const prev = all.filter(card => card.selected);
			if (prev.length >= 2) {
				return false;
			}
			target.selected = true;
		} else {
			target.selected = false;
		}
		return true;
	}

	validate(players, cards) {
		if ((players.length === 1 && cards.length === 0)
			|| (players.length === 0 && cards.length === 2)) {
			return true;
		}

		this.message = '请选择1名玩家或2张牌';
	}

}

export default SeerSkill;
