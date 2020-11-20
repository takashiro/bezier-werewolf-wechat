import { Role } from '@bezier/werewolf-core';
import Board from '../Board';
import Player from '../Player';
import Skill from '../Skill';

export type SkillConstructor = new(board: Board, self: Player) => Skill;
export type SkillMap = Map<Role, SkillConstructor[]>;

export default class Collection {
	protected name: string;

	protected skills: SkillMap;

	constructor(name: string) {
		this.name = name;
		this.skills = new Map();
	}

	add(role: Role, ...skills: SkillConstructor[]): void {
		this.skills.set(role, skills);
	}

	get(role: Role): SkillConstructor[] | undefined {
		return this.skills.get(role);
	}

	getEntries(): IterableIterator<[Role, SkillConstructor[]]> {
		return this.skills.entries();
	}
}
