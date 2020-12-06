import Player from '../../Player';
import DoublePlayerSkill from '../DoublePlayerSkill';

export default class Troublemaker extends DoublePlayerSkill {
	protected buttonLabel = '交换身份';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}
