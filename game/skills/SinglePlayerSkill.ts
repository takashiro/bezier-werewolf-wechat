import BoardObject from '../BoardObject';
import Card from '../Card';
import Player from '../Player';
import Skill from '../Skill';

class SinglePlayerSkill extends Skill {
	selectCard(): boolean {
		return false;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		if (selected) {
			for (const player of all) {
				player.setSelected(false);
			}
			target.setSelected(true);
		} else {
			target.setSelected(false);
		}
		return true;
	}

	validate(players: Player[], cards: Card[]): boolean {
		if (players.length === 1) {
			return true;
		}

		this.message = '请选择1名玩家';
		return false;
	}

	addLog(players: Player[], cards: Card[]): void {
		this.logs.push(`你选择了${players[0].getSeat()}号`);
	}
}

export default SinglePlayerSkill;
