import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Squire extends TargetlessSkill {
	protected buttonLabel = '暗中观察';
}

const squire: CollectionEntry = {
	role: Role.Squire,
	name: '狼孩',
	background: '你被狼人抚养长大，早已习惯了夜间活动，但因为年龄太小，没能参与今晚的行动。可这又如何？你还是偷偷跟了过去。',
	description: '你可以查看所有抽到狼人的玩家，并查看其身份牌。你不是狼人，你被公投出局不影响狼人阵营胜利。',
	skills: [Squire],
};

export default squire;
