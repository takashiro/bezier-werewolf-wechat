
import Team from '../game/Team';

class TeamItem {

	constructor(team, name) {
		this.key = team.key;
		this.value = team.value;
		this.name = name;

		TeamItem[this.key] = this;
	}

	toNum() {
		return this.value;
	}

	static fromNum(num) {
		const list = TeamItem.enums;
		if (0 <= num && num < list.length) {
			return list[num];
		} else {
			return list[0];
		}
	}

}

TeamItem.enums = [
	new TeamItem(Team.Unknown, '未知'),

	new TeamItem(Team.Werewolf, '狼人阵营'),
	new TeamItem(Team.Villager, '村民阵营'),
	new TeamItem(Team.Other, '其他角色'),
];

export default TeamItem;
