import { Role } from '@bezier/werewolf-core';

import Player from '../../Player';
import CollectionEntry from '../CollectionEntry';
import SinglePlayerSkill from '../SinglePlayerSkill';

export class Doppelganger extends SinglePlayerSkill {
	protected buttonLabel = '复制';

	selectPlayer(player: Player): boolean {
		if (player === this.owner) {
			return false;
		}
		return super.selectPlayer(player);
	}

	async invoke(): Promise<boolean> {
		const [target] = this.board.getSelectedPlayers();
		const updated = await super.invoke();
		if (!updated) {
			return false;
		}

		if (!target) {
			return true;
		}

		const role = target.getRole();
		if (role && role !== Role.Doppelganger) {
			this.board.addSkills(role);
		}

		return true;
	}
}

const doppelganger: CollectionEntry = {
	role: Role.Doppelganger,
	name: '二重身',
	background: '你们拥有同样的面容，同样的穿着打扮甚至同样的能力，你是世界上另一个你。',
	description: '你查看一名玩家的身份牌，然后你成为同样的身份。若有夜间技能，你们按照座位顺序（由小到大）依次使用技能。',
	skills: [Doppelganger],
};

export default doppelganger;
