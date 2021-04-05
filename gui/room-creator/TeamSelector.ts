import {
	Role,
	Team,
	Teamship,
} from '@bezier/werewolf-core';

import col from '../../game/collection/index';

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

		for (const role of col.getRoles()) {
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

		this.selections.sort((a, b) => {
			if (a.maxNum !== b.maxNum) {
				return b.maxNum - a.maxNum;
			}
			return a.role - b.role;
		});
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
		Team.Other,
	),
];
