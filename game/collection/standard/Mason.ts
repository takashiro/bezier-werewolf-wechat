import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Mason extends TargetlessSkill {
	protected buttonLabel = '巡逻';
}

const mason: CollectionEntry = {
	role: Role.Mason,
	name: '守夜人',
	background: '今晚你和搭档在村庄外巡逻。夜色渐深，村庄外一片寂静。除了你的搭档以外你没有见到任何人。',
	description: '你可以查看另一个抽到守夜人的玩家。',
	skills: [Mason],
};

export default mason;
