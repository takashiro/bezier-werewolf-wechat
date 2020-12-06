import Player from '../../Player';
import SinglePlayerSkill from '../SinglePlayerSkill';

export default class VillageIdiot extends SinglePlayerSkill {
	protected buttonLabel = '捣乱';

	selectPlayer(target: Player): boolean {
		const distance = Math.abs(target.getSeat() - this.owner.getSeat());
		return distance <= 1;
	}
}
