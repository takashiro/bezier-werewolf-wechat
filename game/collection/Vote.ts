import SinglePlayerSkill from './SinglePlayerSkill';

export default class Vote extends SinglePlayerSkill {
	protected buttonLabel = '投票';

	async invoke(): Promise<boolean> {
		await this.board.vote();
		this.used = true;
		this.addLog();
		this.board.resetSelection();
		return true;
	}
}
