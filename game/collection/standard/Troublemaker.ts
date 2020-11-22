import Player from '../../Player';
import TwoPlayerSkill from '../TwoPlayerSkill';

export default class Troublemaker extends TwoPlayerSkill {
	protected buttonLabel = '交换身份';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}
