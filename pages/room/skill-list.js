
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

class DisabledSkill extends Skill {

	validate() {
		this.message = '你什么都不知道';
	}

};

const disabled = new DisabledSkill;

class NoTargetSkill extends Skill {

	validate() {
		return {};
	}

};

const noTarget = new NoTargetSkill;

const Action = {
	Invalid: 0,
	Exchange: 1,
};

class NormalSkill extends Skill {

	constructor(action, playerNum, cardNum) {
		super();

		this.action = action;
		this.playerNum = playerNum || 0;
		this.cardNum = cardNum || 0;
	}

	validate() {
		const targets = [];
		if (this.playerNum) {
			targets.push(`${this.playerNum}名玩家`);
		}
		if (this.cardNum) {
			targets.push(`${this.cardNum}张牌`);
		}
		const text = '请选择' + targets.join('和');

		const players = this.getPlayers();
		const cards = this.getCards();
		if (players.size === this.playerNum && cards.size === this.cardNum) {
			return this.input;
		} else {
			this.message = text;
		}
	}

	getActionLog() {
		switch (this.action) {
			case Action.Exchange: {
				const texts = [];
				if (this.input) {
					if (this.input.players && this.input.players.size > 0) {
						for (const seat of this.input.players) {
							texts.push(seat + '号');
						}
					} else if (this.input.centerCards && this.input.centerCards.size > 0) {
						for (const pos of this.input.centerCards) {
							texts.push(`第${pos + 1}张牌`);
						}
					}
				}
				return texts.length > 0 ? '你交换了' + texts.join('和') : null;
			}
		}
	}

}

class SeerSkill {

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

const skills = [
	// Unknown
	disabled,

	// Werewolf
	noTarget,

	// Villager
	disabled,

	// Seer
	new SeerSkill,

	// Tanner
	disabled,

	// Minion
	noTarget,

	// Troublemaker
	new NormalSkill(Action.Exchange, 2, 0),

	// Robber
	new NormalSkill(Action.Exchange, 1, 0),

	// Drunk
	new NormalSkill(Action.Exchange, 0, 1),
];

export default skills;
