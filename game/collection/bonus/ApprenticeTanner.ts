import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class ApprenticeTanner extends TargetlessSkill {
	protected buttonLabel = '查看';
}

const apprenticeTanner: CollectionEntry = {
	role: Role.ApprenticeTanner,
	name: '皮匠学徒',
	description: '你刚入行就遭遇了失业潮，无法承受生活重担的你和皮匠一心寻求解脱。天亮后，请引导大家公投出皮匠（场上没有皮匠时，你成为皮匠）。现在你可以查看抽到皮匠的玩家。',
	skills: [ApprenticeTanner],
};

export default apprenticeTanner;
