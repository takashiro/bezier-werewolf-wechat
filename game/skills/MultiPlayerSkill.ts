import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import Skill from '../Skill';

class MultiPlayerSkill extends Skill {
	protected playerNum: number;

	constructor(playerNum: number) {
		super();

		this.playerNum = playerNum;
	}

	selectCard(): boolean {
		return false;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (selected) {
			const prev = all.filter((player) => player.isSelected());
			if (prev.length >= this.playerNum) {
				return false;
			}
			target.setSelected(true);
		} else {
			target.setSelected(false);
		}
		return true;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (players.length === this.playerNum) {
			return true;
		}

		this.message = `请选择${this.playerNum}名玩家`;
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		const texts = players.map((player) => `${player.getSeat()}号`);
		this.logs.push(texts.length > 0 ? `你选择了${texts.join('和')}` : '');
	}
}

export default MultiPlayerSkill;
