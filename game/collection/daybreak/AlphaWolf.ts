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
	description: '你带领狼人们进入村庄。正要动手时，你敏锐的野性嗅到了危险，决定撤退。为了保护狼群，你趁机感染了村庄里一名熟睡的村民。现在你可以和狼同伴互相确认身份，然后选择一名玩家感染为狼人。',
	skills: [Werewolf, AlphaWolf],
};

export default alphaWolf;
