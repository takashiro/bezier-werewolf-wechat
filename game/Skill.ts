import Board from './Board';
import Card from './Card';
import Player from './Player';

export default abstract class Skill {
	protected used = false;

	protected logs: string[] = [];

	protected message?: string;

	isUsed(): boolean {
		return this.used;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	selectCard(board: Board, target: Card): boolean {
		target.setSelected(true);
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	unselectCard(board: Board, target: Card): boolean {
		target.setSelected(false);
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	selectPlayer(board: Board, target: Player): boolean {
		target.setSelected(true);
		return true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
	unselectPlayer(board: Board, target: Player): boolean {
		target.setSelected(false);
		return true;
	}

	abstract validate(board: Board): boolean;

	invoke(board: Board): void {
		this.addLog(board);
		this.used = true;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this, @typescript-eslint/no-empty-function
	addLog(board: Board): void {
		// Do nothing by default
	}

	getLogs(): string[] {
		return this.logs;
	}

	getMessage(): string | undefined {
		return this.message;
	}
}
