
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
			},
			{
				role: Role.Mason,
				maxNum: 2,
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
		const basics = s.basic.map(function (b, index) {
			const basic = [];
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

			basic.forEach(function (role, index) {
				role.index = index;
			});

			basic.index = index;
			return basic;
		});

		const roles = [];
		for (const role of Role.enums) {
			if (role.team.value !== s.team.value) {
				continue;
			}
			if (s.basic.some(b => b.role === role)) {
				continue;
			}
			const selected = config.indexOf(role) >= 0;
			roles.push({...role, selected});
		}

		roles.forEach(function (role, index) {
			role.index = index;
		});

		roles.index = basics.length;
		const teamConfig = {
			team: s.team,
			groups: [...basics, roles],
		};
		selectors.push(teamConfig);
	}

	selectors.forEach(function (selector, index) {
		selector.index = index;
	});
	return selectors;
}

export default parseSelector;
