import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Mason extends TargetlessSkill {
	protected buttonLabel = '巡逻';
}

const mason: CollectionEntry = {
	role: Role.Mason,
	name: '守夜人',
	description: '今晚你在村庄外守夜巡逻。夜色渐深，村庄外一片寂静。除了你的搭档以外你没有见过任何人，直到天亮。现在你可以查看另一个守夜人的身份。',
};

export default mason;
