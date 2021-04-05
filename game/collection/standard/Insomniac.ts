import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Insomniac extends TargetlessSkill {
	protected buttonLabel = '辗转反侧';
}

const insomniac: CollectionEntry = {
	role: Role.Insomniac,
	name: '失眠者',
	description: '整个村庄都睡了，唯独留下你与黑夜对峙。你已经记不得这是第几个夜晚。由于你一夜未眠，天亮前你会再次查看自己的身份牌。',
	skills: [Insomniac],
};

export default insomniac;
