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
	description: '你喜欢做各种疯狂又刺激的实验。今晚你可以查看至多2名玩家的身份，若其中有狼人（或皮匠），你必须立刻停止研究，然后变身为同一阵营的狼人（或皮匠）。',
	skills: [ParanormalInvestigator, ParanormalInvestigator],
};

export default paranormalInvestigator;
