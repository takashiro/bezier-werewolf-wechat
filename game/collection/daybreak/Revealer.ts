import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class Revealer extends SinglePlayerSkill {
	protected buttonLabel = '启示';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const revealer: CollectionEntry = {
	role: Role.Revealer,
	name: '启示者',
	background: '这个神秘的村庄引起了你极大的兴趣，而你拥有的特殊能力可以显现原本不可见的事物。',
	description: '你可以翻开一名其他角色的身份牌，如果翻开的是狼人或皮匠，将身份牌翻回背面朝上。',
	skills: [Revealer],
};

export default revealer;
