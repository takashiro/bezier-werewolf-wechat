import { Role } from '@bezier/werewolf-core';
import SinglePlayerSkill from '../SinglePlayerSkill';

export default class ParanormalInvestigator extends SinglePlayerSkill {
	protected buttonLabel = '探索领域';

	isUsed(): boolean {
		return super.isUsed() || this.owner.getRole() === Role.Werewolf;
	}
}
