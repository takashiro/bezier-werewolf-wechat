import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

class MysticWolf extends SinglePlayerSkill {
	protected buttonLabel = '预知未来';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

export default MysticWolf;
