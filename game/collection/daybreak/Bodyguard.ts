import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';

const bodyBuard: CollectionEntry = {
	role: Role.Bodyguard,
	name: '守卫',
	background: '保护村民是你的工作。比起找到狼人，你认为暗中保护好人更重要。',
	description: '公投时，你的票保护目标玩家，使其不会出局。若你保护的玩家票数最高，则票数第二（须至少1票）的玩家出局。',
};

export default bodyBuard;
