
import Skill from '../Skill';

class MultiPlayerSkill extends Skill {

	constructor(playerNum) {
		super();

		this.playerNum = playerNum;
	}

	selectCard() {
	}

	selectPlayer(all, target, selected) {
		if (selected) {
			const prev = all.filter(player => player.selected);
			if (prev.length >= this.playerNum) {
				return false;
			}
			target.selected = true;
		} else {
			target.selected = false;
		}
		return true;
	}

	validate(players, cards) {
		if (players.length === this.playerNum) {
			return true;
		} else {
			this.message = `请选择${this.playerNum}名玩家`;
		}
	}

	addLog(players, cards) {
		const texts = players.map(player => player.seat + '号');
		this.logs.push(texts.length > 0 ? '你选择了' + texts.join('和') : '');
	}

}

export default MultiPlayerSkill;
