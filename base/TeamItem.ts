import { Team } from '@bezier/werewolf-core';

const teamNames = [
	'其他角色',
	'狼人阵营',
	'村民阵营',
	'其他角色',
];

export default class TeamItem {
	readonly key: string;

	readonly value: number;

	readonly name: string;

	constructor(team: Team) {
		this.key = Team[team];
		this.value = team;
		this.name = teamNames[team];
	}
}
