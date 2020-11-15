import BoardObject from './BoardObject';
import Card from './Card';
import Player from './Player';

export default abstract class Skill {
	protected used = false;

	protected logs: string[] = [];

	protected message?: string;

	isUsed(): boolean {
		return this.used;
	}

	selectCard(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		target.setSelected(selected);
		return true;
	}

	selectPlayer(all: BoardObject[], target: BoardObject, selected: boolean): boolean {
		target.setSelected(selected);
		return true;
	}

	abstract validate(players: Player[], cards: Card[]): boolean;

	invoke(players: Player[], cards: Card[]): void {
		this.addLog(players, cards);
		this.used = true;
	}

	abstract addLog(players: Player[], cards: Card[]): void;

	getLogs(): string[] {
		return this.logs;
	}

	getMessage(): string | undefined {
		return this.message;
	}
}
