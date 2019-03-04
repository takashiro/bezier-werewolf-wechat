
import SinglePlayerSkill from './SinglePlayerSkill';

const State = {
	MeetWolves: 0,
	Infect: 1,
};

class AlphaWolfSkill extends SinglePlayerSkill {

	constructor() {
		super();
		this.stateNum = 2;
	}

	selectPlayer(all, target, selected) {
		if (this.state === State.Infect) {
			return super.selectPlayer(all, target, selected);
		}
	}

	validate(players, cards) {
		if (this.state === State.MeetWolves) {
			return players.length === 0 && cards.length === 0;
		} else if (this.state === State.Infect) {
			return super.validate(players, cards);
		} else {
			return false;
		}
	}

	addActionLog(players, cards) {
		if (this.state === State.Infect) {
			super.addActionLog(players, cards);
		}
	}

}

export default AlphaWolfSkill;
