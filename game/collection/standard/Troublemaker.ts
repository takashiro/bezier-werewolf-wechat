import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import DoublePlayerSkill from '../DoublePlayerSkill';

export class Troublemaker extends DoublePlayerSkill {
	protected buttonLabel = '交换身份';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const troublemaker: CollectionEntry = {
	role: Role.Troublemaker,
	name: '捣蛋鬼',
	background: '你不小心打翻了女巫的药水，村庄里将有两个人因你被互换身份。',
	description: '你可以交换两名其他玩家的身份牌。',
	skills: [Troublemaker],
};

export default troublemaker;
