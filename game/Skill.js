
class Skill {

	constructor() {
		this.input = null;
	}

	setInput(input) {
		this.input = input;
	}

	validate() {
	}

	getPlayers() {
		return (this.input && this.input.players) || new Set;
	}

	getCards() {
		return (this.input && this.input.centerCards) || new Set;
	}

	getActionLog() {
		return '';
	}

	getMessage() {
		return this.message;
	}

}

export default Skill;
