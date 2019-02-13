
import Skill from '../Skill';

class SeerSkill extends Skill {

	validate() {
		const input = this.input;

		if (input) {
			if ((input.players.size === 1 && input.centerCards.size === 0)
				|| (input.players.size === 0 && input.centerCards.size === 2)) {
				return input;
			}
		}

		return '请选择1名玩家或2张牌';
	}

}

export default SeerSkill;
