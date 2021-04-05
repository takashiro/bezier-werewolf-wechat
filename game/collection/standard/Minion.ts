import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Minion extends TargetlessSkill {
	protected buttonLabel = '暗中观察';
}

const minion: CollectionEntry = {
	role: Role.Minion,
	name: '爪牙',
	description: '你目睹了狼人的行动，决定暗中帮助他们，借狼人之手报复村庄。现在你可以查看狼人到底是谁。',
	skills: [Minion],
};

export default minion;
