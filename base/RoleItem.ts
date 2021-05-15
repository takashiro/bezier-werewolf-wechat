import { Role } from '@bezier/werewolf-core';

interface RoleItem {
	readonly key: string;
	readonly value: Role;
	readonly name: string;
	readonly background: string;
	readonly description: string;
}

export default RoleItem;
