import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Insomniac extends TargetlessSkill {
	protected buttonLabel = '辗转反侧';
}

const insomniac: CollectionEntry = {
	role: Role.Insomniac,
	name: '失眠者',
	background: '整个村庄都睡了，唯独留下你与黑夜对峙。你已经记不得这是第几个不眠的夜晚。',
	description: '天亮前你再次查看自己的身份牌。',
	skills: [Insomniac],
};

export default insomniac;
