import { Role } from '@bezier/werewolf-core';
import CollectionEntry from '../CollectionEntry';

const hunter: CollectionEntry = {
	role: Role.Hunter,
	name: '猎人',
	background: '你是村庄里的猎人，你相信最后一刻你的猎枪将会拯救村庄。',
	description: '你被公投出局时，所有投票给你的玩家出局。',
};

export default hunter;
