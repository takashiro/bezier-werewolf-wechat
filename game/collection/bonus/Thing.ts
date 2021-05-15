import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class Thing extends SinglePlayerSkill {
	protected buttonLabel = '碰一下';

	selectPlayer(player: Player): boolean {
		const distance = this.board.getDistance(this.owner, player);
		if (distance !== 1) {
			return false;
		}
		return super.selectPlayer(player);
	}
}

const thing: CollectionEntry = {
	role: Role.Thing,
	name: '东西',
	background: '“昨晚上好像有什么东西碰了我一下。”你是制造灵异事件的神秘存在。',
	description: '你可以选择你左边或右边的玩家，该玩家将看到身边有你（无法看到交换后的身份）。',
	skills: [Thing],
};

export default thing;
