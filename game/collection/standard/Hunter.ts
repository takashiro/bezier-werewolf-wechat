import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';

const hunter: CollectionEntry = {
	role: Role.Hunter,
	name: '猎人',
	description: '你是村庄里的猎人。当你被公投出局时，所有投票给你的玩家都同时出局。如果有狼人出局，则村民阵营胜利。',
};

export default hunter;
