import { Role } from '@bezier/werewolf-core';

import { Werewolf } from '../standard/Werewolf';
import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class AlphaWolf extends SinglePlayerSkill {
	protected buttonLabel = '感染';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const alphaWolf: CollectionEntry = {
	role: Role.AlphaWolf,
	name: '狼王',
	background: '你带领狼人们进入村庄。正要动手时，你敏锐的野性嗅到了危险决定撤退。为了保护狼群，你趁机感染了一名熟睡的村民。',
	description: '你可以查看抽到狼人的玩家。中央牌堆中额外暗置1张狼人牌（最右），你将该牌与一名其他玩家交换。',
	skills: [Werewolf, AlphaWolf],
};

export default alphaWolf;
