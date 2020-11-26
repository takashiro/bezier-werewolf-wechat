import {
	Role,
	Team,
	Teamship,
} from '@bezier/werewolf-core';

export default class TeamProfile {
	readonly team: Team;

	readonly roles: Role[];

	constructor(team: Team, roles: Role[]) {
		this.team = team;
		this.roles = roles;
	}

	static fromRoles(roles: Role[]): TeamProfile[] {
		const teamships = new Map<Team, Role[]>();
		for (const role of roles) {
			const team = Teamship.get(role);
			if (team === undefined) {
				continue;
			}

			const ship = teamships.get(team);
			if (ship) {
				ship.push(role);
			} else {
				teamships.set(team, [role]);
			}
		}

		const profiles: TeamProfile[] = [];
		for (const [team, members] of teamships) {
			profiles.push(new TeamProfile(team, members));
		}

		profiles.sort((a, b) => a.team - b.team);

		return profiles;
	}
}
