import { Role } from '@bezier/werewolf-core';

import Card from '../../Card';
import Player from '../../Player';
import Skill from '../../Skill';
import CollectionEntry from '../CollectionEntry';

class Seer extends Skill {
	protected buttonLabel = '预知未来';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		this.board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	unselectPlayer(target: Player): boolean {
		target.setSelected(false);
		return true;
	}

	selectCard(target: Card): boolean {
		const prev = this.board.getSelectedCards();
		if (prev.length >= 2) {
			return false;
		}
		target.setSelected(true);
		return true;
	}

	unelectCard(target: Card): boolean {
		target.setSelected(false);
		return true;
	}

	validate(): boolean {
		const cards = this.board.getSelectedCards();
		const players = this.board.getSelectedPlayers();
		if ((players.length === 1 && cards.length === 0)
			|| (players.length === 0 && cards.length === 2)) {
			return true;
		}

		this.message = '请选择1名玩家或2张牌';
		return false;
	}
}

const seer: CollectionEntry = {
	role: Role.Seer,
	name: '预言家',
	background: '你正要入睡，预言球突然有些异样 —— 村庄里似乎暗藏杀机。',
	description: '你可以查看1名其他玩家的身份牌或2张未使用的牌。',
	skills: [Seer],
};

export default seer;
