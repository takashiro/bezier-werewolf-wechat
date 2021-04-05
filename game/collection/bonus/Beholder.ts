import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Beholder extends TargetlessSkill {
	protected buttonLabel = '预知未来';
}

const beholder: CollectionEntry = {
	role: Role.Beholder,
	name: '旁观者',
	description: '你拥有第三只眼睛，可以看到别人看不见的东西，小时候也因此被村里的小孩欺负过，所以总是用长发遮住额头。今晚你可以确认预言家的身份牌。',
	skills: [Beholder],
};

export default beholder;
