
import Skill from '../Skill';

class ExchangeSkill extends Skill {

	constructor(playerNum, cardNum) {
		super();

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

export default ExchangeSkill;