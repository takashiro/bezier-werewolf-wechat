import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import SingleCardSkill from '../SingleCardSkill';

export class ApprenticeSeer extends SingleCardSkill {
	protected buttonLabel = '预知未来';
}

const apprenticeSeer: CollectionEntry = {
	role: Role.ApprenticeSeer,
	name: '预言家学徒',
	background: '你是一名预言家学徒，今年春天开始你也可以看到一些未来了，虽然还不是很熟练。',
	description: '你可以查看1张中央牌。',
	skills: [ApprenticeSeer],
};

export default apprenticeSeer;
