
import Role from '../RoleItem';
import Team from '../TeamItem';

const selectorConfig = [
	{
		team: Team.Werewolf,
		basic: [
			{
				role: Role.Werewolf,
				maxNum: 3,
			}
		],
	},
	{
		team: Team.Villager,
		basic: [
			{
				role: Role.Villager,
				maxNum: 3,
			}
		],
	},
	{
		team: Team.Other,
		basic: [],
	},
];


function parseSelector(config) {
	const selectors = [];
	for (const s of selectorConfig) {
		const basic = [];
		for (const b of s.basic) {
			let selected = 0;
			for (const role of config) {
				if (role === b.role) {
					selected++;
				}
			}
			selected = Math.min(selected, b.maxNum);

			let unselected = b.maxNum - selected;

			while (selected--) {
				basic.push({ ...b.role, selected: true });
			}
			while (unselected--) {
				basic.push({ ...b.role, selected: false });
			}
		}

		const roles = [];
		for (const role of Role.enums) {
			if (role.team.value !== s.team.value) {
				continue;
			}
			if (s.basic.some(b => b.role === role)) {
				continue;
			}
			const selected = config.indexOf(role) >= 0;
			roles.push({...role, selected: true});
		}

		const teamConfig = {
			team: s.team,
			groups: [basic, roles],
		};
		selectors.push(teamConfig);
	}

	return selectors;
}

export default parseSelector;
