import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class ParanormalInvestigator extends SinglePlayerSkill {
	protected buttonLabel = '探索领域';

	protected usedCount = 0;

	isUsed(): boolean {
		if (this.usedCount <= 0 || !super.isUsed()) {
			return false;
		}

		return this.owner.getRole() === Role.Werewolf || this.usedCount >= 2;
	}

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}

	async invoke(): Promise<boolean> {
		const updated = await super.invoke();
		this.usedCount++;
		return updated;
	}
}

const paranormalInvestigator: CollectionEntry = {
	role: Role.ParanormalInvestigator,
	name: '超自然研究员',
	background: '你喜欢研究各种超自然现象，紧张又刺激。',
	description: '你可以依次查看至多2名玩家的身份牌。若看到狼人（或皮匠），你变为狼人（或皮匠），不能继续使用此技能。',
	skills: [ParanormalInvestigator],
};

export default paranormalInvestigator;
