import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Werewolf extends TargetlessSkill {
	protected buttonLabel = '碰面';
}

const werewolf: CollectionEntry = {
	role: Role.Werewolf,
	name: '狼人',
	background: '夜色渐深，狼人们正要动手时发现村里似乎有些不寻常，于是匆匆变回人形，等待天亮。',
	description: '你可以查看其他抽到狼人牌的玩家。',
	skills: [Werewolf],
};

export default werewolf;
