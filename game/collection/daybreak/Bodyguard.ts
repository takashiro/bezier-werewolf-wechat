import { Role } from '@bezier/werewolf-core';

import CollectionEntry from '../CollectionEntry';

const bodyBuard: CollectionEntry = {
	role: Role.Bodyguard,
	name: '守卫',
	description: '比起找到狼人，你认为暗中保护好人更重要。公投时，你的票会保护目标玩家，该玩家不会出局。若你保护的玩家票数最高，则票数第二（至少1票）的玩家出局。',
};

export default bodyBuard;
