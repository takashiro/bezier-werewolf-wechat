import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Minion extends TargetlessSkill {
	protected buttonLabel = '暗中观察';
}

const minion: CollectionEntry = {
	role: Role.Minion,
	name: '爪牙',
	background: '你目睹了狼人的行动，决定暗中帮助他们，借狼人之手报复村庄。',
	description: '你可以查看所有抽到狼人牌的玩家。',
	skills: [Minion],
};

export default minion;
