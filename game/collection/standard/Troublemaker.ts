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
	description: '你不小心打翻了女巫的药水，药水洒到了两只人偶上。你意识到这两个人互换了身份。现在请选择两名玩家。',
	skills: [Troublemaker],
};

export default troublemaker;
