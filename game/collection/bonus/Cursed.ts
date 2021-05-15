import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';

const cursed: CollectionEntry = {
	role: Role.Cursed,
	name: '受诅咒者',
	background: '由于猎杀过多狼人，你受到了狼群的诅咒。',
	description: '如果至少1名狼人投票给你，你加入狼人阵营。',
};

export default cursed;
