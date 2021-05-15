import { Role } from '@bezier/werewolf-core';

import Card from '../../Card';
import Player from '../../Player';
import Skill from '../../Skill';
import CollectionEntry from '../CollectionEntry';

export class Witch extends Skill {
	protected buttonLabel = '查看';

	protected selectedCard?: Card;

	protected selectedPlayer?: Player;

	isUsed(): boolean {
		return super.isUsed() && Boolean(this.selectedCard && this.selectedPlayer);
	}

	selectCard(target: Card): boolean {
		if (this.selectedCard) {
			return false;
		}
		this.board.resetSelectedCards();
		return super.selectCard(target);
	}

	selectPlayer(target: Player): boolean {
		if (!this.selectedCard || this.selectedPlayer) {
			return false;
		}
		this.board.resetSelectedPlayers();
		target.setSelected(true);
		return true;
	}

	validate(): boolean {
		const cards = this.board.getSelectedCards();
		const players = this.board.getSelectedPlayers();
		if (!this.selectedCard) {
			if (cards.length === 1 && players.length <= 0) {
				return true;
			}
			this.message = '请选择1张牌';
		} else if (!this.selectedPlayer) {
			if (cards.length === 0 && players.length === 1) {
				return true;
			}
			this.message = '请选择1名玩家';
		}
		return false;
	}

	async invoke(): Promise<boolean> {
		const selectedCards = this.board.getSelectedCards();
		const selectedPlayers = this.board.getSelectedPlayers();
		const invoked = await super.invoke();
		if (!this.selectedCard) {
			[this.selectedCard] = selectedCards;
			this.buttonLabel = '交换';
		} else if (!this.selectedPlayer) {
			[this.selectedPlayer] = selectedPlayers;
		}
		return invoked;
	}

	addLog(): void {
		const [card] = this.board.getSelectedCards();
		if (card) {
			this.logs.push(`你选择了第${card.getPos() + 1}张牌`);
		}
		const [player] = this.board.getSelectedPlayers();
		if (player) {
			this.logs.push(`你选择了${player.getSeat()}号玩家`);
		}
	}
}

const witch: CollectionEntry = {
	role: Role.Witch,
	name: '女巫',
	background: '今晚你又炼制出了一瓶变身药水，跃跃欲试。',
	description: '你可以查看一张未使用的身份牌，然后将它和任意一名玩家交换。',
	skills: [Witch],
};

export default witch;
