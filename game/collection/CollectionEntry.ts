import { Role } from '@bezier/werewolf-core';

import Board from '../Board';
import Player from '../Player';
import Skill from '../Skill';

export type SkillConstructor = new(board: Board, self: Player) => Skill;

interface CollectionEntry {
	role: Role;
	name: string;
	description: string;
	skills?: SkillConstructor[];
}

export default CollectionEntry;
