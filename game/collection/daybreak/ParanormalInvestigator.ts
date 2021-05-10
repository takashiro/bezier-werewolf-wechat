import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class ParanormalInvestigator extends SinglePlayerSkill {
	protected buttonLabel = '探索领域';

	isUsed(): boolean {
		return super.isUsed() || this.owner.getRole() === Role.Werewolf;
	}

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const paranormalInvestigator: CollectionEntry = {
	role: Role.ParanormalInvestigator,
	name: '超自然研究员',
	description: '你喜欢研究各种超自然现象，紧张又刺激。今晚你可以依次查看至多2名玩家的身份牌，若看到狼人（或皮匠），你必须立刻停止研究，然后你变为狼人（或皮匠）。',
	skills: [ParanormalInvestigator, ParanormalInvestigator],
};

export default paranormalInvestigator;
