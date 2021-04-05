import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import SingleCardSkill from '../SingleCardSkill';

export class ApprenticeSeer extends SingleCardSkill {
	protected buttonLabel = '预知未来';
}

const apprenticeSeer: CollectionEntry = {
	role: Role.ApprenticeSeer,
	name: '小预言家',
	description: '你是一名预言家学徒，今年春天开始你也可以看到一点未来发生的事了，虽然还不是很熟练。现在你可以查看其中1张未使用的身份牌。',
	skills: [ApprenticeSeer],
};

export default apprenticeSeer;
