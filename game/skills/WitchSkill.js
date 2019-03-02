
import Skill from '../Skill';

const State = {
	Init: 0,
	CardSelected: 1,
	PlayerSelected: 2,
};

class WitchSkill extends Skill {

	constructor() {
		super();
		this.stateNum = 2;
	}

	selectCard(all, target, selected) {
		if (this.state !== State.Init) {
			return false;
		}

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

	selectPlayer(all, target, selected) {
		if (this.state !== State.CardSelected) {
			return false;
		}

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
		if (this.state === State.Init) {
			return cards.length === 1;
		} else if (this.state === State.CardSelected) {
			return players.length === 1;
		}
	}

	addLog(players, cards) {
		if (players && players[0]) {
			this.logs.push(`你选择了${players[0].seat}号`);
		} else if (cards && cards[0]) {
			this.logs.push(`你选择了第${cards[0].pos + 1}张牌`);
		}
	}

}

export default WitchSkill;
