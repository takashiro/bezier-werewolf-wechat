import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';
import { Werewolf } from '../standard/Werewolf';

class MysticWolf extends SinglePlayerSkill {
	protected buttonLabel = '预知未来';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const mysticWolf: CollectionEntry = {
	role: Role.MysticWolf,
	name: '狼先知',
	background: '你拥有神秘的预言能力，理所当然被选入今晚的狼队行动中。',
	description: '你可以查看抽到狼人牌的玩家，然后你可以查看任意一名其他玩家的身份。',
	skills: [Werewolf, MysticWolf],
};

export default mysticWolf;
