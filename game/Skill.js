
class Skill {

	constructor() {
		this.state = 0;
		this.stateNum = 1;
		this.logs = [];
	}

	isUsed() {
		return this.state >= this.stateNum;
	}

	selectCard(all, target, selected) {
		target.selected = selected;
		return true;
	}

	selectPlayer(all, target, selected) {
		target.selected = selected;
		return true;
	}

	validate(players, cards) {
	}

	invoke(players, cards) {
		this.state++;
		this.addLog(players, cards);
	}

	addLog(players, cards) {
	}

	getLogs() {
		return this.logs;
	}

	getMessage() {
		return this.message;
	}

}

export default Skill;
