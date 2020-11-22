import { Role } from '@bezier/werewolf-core';
import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

export default class ParanormalInvestigator extends SinglePlayerSkill {
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
