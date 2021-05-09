import TargetlessSkill from './TargetlessSkill';

export default class WakeUp extends TargetlessSkill {
	protected buttonLabel = '进入白天';

	async invoke(): Promise<boolean> {
		await this.board.updateBoard();
		this.board.resetSelection();
		this.used = true;
		return true;
	}
}
