import { Role } from '@bezier/werewolf-core';

import RoleItem from '../../base/RoleItem';
import CollectionEntry, { SkillConstructor } from './CollectionEntry';

export type CollectionMap = Map<Role, CollectionEntry>;

export default class Collection {
	protected name: string;

	protected map: CollectionMap;

	constructor(name: string) {
		this.name = name;
		this.map = new Map();
	}

	add(entry: CollectionEntry): void {
		this.map.set(entry.role, entry);
	}

	get(role: Role): CollectionEntry | undefined {
		return this.map.get(role);
	}

	describe(role: Role): RoleItem {
		const item = this.get(role);
		if (!item) {
			return {
				key: 'Unknown',
				value: Role.Unknown,
				name: '未知',
				background: '',
				description: '',
			};
		}

		return {
			key: Role[item.role],
			value: item.role,
			name: item.name,
			background: item.background,
			description: item.description,
		};
	}

	getSkills(role: Role): SkillConstructor[] | undefined {
		return this.map.get(role)?.skills;
	}

	getRoles(): IterableIterator<Role> {
		return this.map.keys();
	}

	getEntries(): IterableIterator<CollectionEntry> {
		return this.map.values();
	}
}
