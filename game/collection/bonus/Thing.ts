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
	description: '你可以碰一下你左边或右边的玩家，让其知道你是东西。',
	skills: [Thing],
};

export default thing;
