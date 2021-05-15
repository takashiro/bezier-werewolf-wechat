import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';
import TargetlessSkill from '../TargetlessSkill';

export class Beholder extends TargetlessSkill {
	protected buttonLabel = '预知未来';
}

const beholder: CollectionEntry = {
	role: Role.Beholder,
	name: '旁观者',
	background: '你拥有第三只眼睛，可以看到不寻常的现象。',
	description: '你可以查看抽到预言家的玩家，并查看其身份牌。',
	skills: [Beholder],
};

export default beholder;
