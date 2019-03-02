
import Skill from '../Skill';

class SinglePlayerSkill extends Skill {

	selectCard() {}

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

	validate(players, cards) {
		if (players.length === 1) {
			return true;
		} else {
			this.message = `请选择1名玩家`;
		}
	}

	addActionLog(players, cards) {
		this.logs.push(`你选择了${players[0].seat}号`);
	}

}

export default SinglePlayerSkill;
