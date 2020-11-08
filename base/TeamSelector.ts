import {
	Role,
	Team,
	Teamship,
} from '@bezier/werewolf-core';

const roleList = Object.values(Role).filter((role) => !Number.isNaN(role)) as Role[];

interface RoleLimit {
	role: Role;
	maxNum: number;
}

interface RoleSelection extends RoleLimit {
	num: number;
}

export default class TeamSelector {
	team: Team;

	selections: RoleSelection[];

	constructor(team: Team, ...limit: RoleLimit[]) {
		this.team = team;
		this.selections = [];

		for (const role of roleList) {
			if (Teamship.get(role) !== team) {
				continue;
			}

			const conf = limit.find((config) => config.role === role);
			const maxNum = conf ? conf.maxNum : 1;
			this.selections.push({
				role,
				num: 0,
				maxNum,
			});
		}
	}

	update(items: IterableIterator<[Role, number]>): void {
		for (const [role, num] of items) {
			const config = this.selections.find((sel) => sel.role === role);
			if (config) {
				config.num = num;
			}
		}
	}
}

export const selectors: TeamSelector[] = [
	new TeamSelector(
		Team.Werewolf,
		{
			role: Role.Werewolf,
			maxNum: 3,
		},
	),
	new TeamSelector(
		Team.Villager,
		{
			role: Role.Villager,
			maxNum: 3,
		}, {
			role: Role.Mason,
			maxNum: 2,
		},
	),
	new TeamSelector(
		Team.Tanner,
	),
];
