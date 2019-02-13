
class Skill {

	constructor() {
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

	getActionLog(players, cards) {
		return '';
	}

	getMessage() {
		return this.message;
	}

}

export default Skill;
