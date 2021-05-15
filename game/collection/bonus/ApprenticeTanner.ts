import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class ApprenticeTanner extends TargetlessSkill {
	protected buttonLabel = '查看';
}

const apprenticeTanner: CollectionEntry = {
	role: Role.ApprenticeTanner,
	name: '皮匠学徒',
	background: '你刚入行就遭遇了失业潮，无法承受生活重担的你和皮匠一心寻求解脱。',
	description: '你可以查看抽到皮匠的玩家，并查看其身份牌。若没有人抽到皮匠，你成为皮匠。天亮后，请引导大家公投出皮匠。',
	skills: [ApprenticeTanner],
};

export default apprenticeTanner;
