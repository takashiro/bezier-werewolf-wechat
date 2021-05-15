import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class VillageIdiot extends SinglePlayerSkill {
	protected buttonLabel = '捣乱';

	selectPlayer(target: Player): boolean {
		const distance = this.board.getDistance(this.owner, target);
		if (distance > 1) {
			return false;
		}
		return super.selectPlayer(target);
	}
}

const villageIdiot: CollectionEntry = {
	role: Role.VillageIdiot,
	name: '白痴',
	background: '这个村里大概找不到比你更智障的人了，而你乐此不疲。',
	description: '你可以选择你的上家、下家或自己。若选择上家（或下家），则你将所有身份牌（除你以外）依次移动给各自的上家（或下家），计算上下家时跳过你。',
	skills: [VillageIdiot],
};

export default villageIdiot;
