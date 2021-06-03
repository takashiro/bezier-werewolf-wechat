import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';
import SingleCardSkill from '../SingleCardSkill';

export class Drunk extends SingleCardSkill {
	protected buttonLabel = '交换身份';
}

const drunk: CollectionEntry = {
	role: Role.Drunk,
	name: '酒鬼',
	background: '你常常在酒吧喝得烂醉，你是谁又有什么关系呢？',
	description: '你选择1张中央牌与自己的身份牌交换。你不能查看被交换的牌。',
	skills: [Drunk],
};

export default drunk;
