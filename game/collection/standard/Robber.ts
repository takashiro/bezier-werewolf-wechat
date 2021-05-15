import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class Robber extends SinglePlayerSkill {
	protected buttonLabel = '交换身份';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const robber: CollectionEntry = {
	role: Role.Robber,
	name: '盗贼',
	background: '你趁着夜色潜入一户人家，正准备下手，神秘事件发生了。',
	description: '你选择1名玩家，与之交换身份并查看你的新身份牌。',
	skills: [Robber],
};

export default robber;
