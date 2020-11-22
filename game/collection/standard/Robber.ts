import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

export default class Robber extends SinglePlayerSkill {
	protected buttonLabel = '交换身份';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}
