import Board from './Board';
import Card from './Card';
import Player from './Player';

export default abstract class Skill {
	protected board: Board;

	protected owner: Player;

	protected used = false;

	protected logs: string[] = [];

	protected message?: string;

	protected buttonLabel = '';

	constructor(board: Board, self: Player) {
		this.board = board;
		this.owner = self;
	}

	getButtonLabel(): string {
		return this.buttonLabel;
	}

	isUsed(): boolean {
		return this.used;
	}

	// eslint-disable-next-line class-methods-use-this
	selectCard(target: Card): boolean {
		target.setSelected(true);
		return true;
	}

	// eslint-disable-next-line class-methods-use-this
	unselectCard(target: Card): boolean {
		target.setSelected(false);
		return true;
	}

	// eslint-disable-next-line class-methods-use-this
	selectPlayer(target: Player): boolean {
		target.setSelected(true);
		return true;
	}

	// eslint-disable-next-line class-methods-use-this
	unselectPlayer(target: Player): boolean {
		target.setSelected(false);
		return true;
	}

	abstract validate(): boolean;

	async invoke(): Promise<boolean> {
		const updated = await this.board.invokeSkill();
		this.used = true;
		this.addLog();
		this.board.resetSelection();
		return updated;
	}

	skip(): void {
		this.used = true;
	}

	// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function
	addLog(): void {
		// Do nothing by default
	}

	getLogs(): string[] {
		return this.logs;
	}

	getMessage(): string | undefined {
		return this.message;
	}
}
