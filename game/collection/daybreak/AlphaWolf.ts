import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

class AlphaWolf extends SinglePlayerSkill {
	protected buttonLabel = '感染';

	selectPlayer(target: Player): boolean {
		if (target === this.owner) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

export default AlphaWolf;
