import { Role } from '@bezier/werewolf-core';

export default class BoardObject {
	protected role = Role.Unknown;

	protected selected = false;

	getRole(): Role {
		return this.role;
	}

	setRole(role: Role): void {
		this.role = role;
	}

	setSelected(selected: boolean): void {
		this.selected = selected;
	}

	isSelected(): boolean {
		return this.selected;
	}
}
