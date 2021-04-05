import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import SingleCardSkill from '../SingleCardSkill';

export class Drunk extends SingleCardSkill {
	protected buttonLabel = '交换身份';
}

const drunk: CollectionEntry = {
	role: Role.Drunk,
	name: '酒鬼',
	description: '你昨晚在酒吧喝得尽兴，迷迷糊糊中似乎被人带走，早上醒来发现镜子中的你变了样。现在请选择1张未使用的牌，与自己的身份牌交换。你不能查看被交换牌。',
	skills: [Drunk],
};

export default drunk;
