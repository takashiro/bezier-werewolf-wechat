import { Team } from '@bezier/werewolf-core';
import TeamItem from '../../base/TeamItem';

Component({
	properties: {
		team: {
			type: Number,
			value: 0,
		},
	},

	data: {
	},

	observers: {
		team(team: Team): void {
			const item = new TeamItem(team);
			this.setData({
				key: item.key,
				name: item.name,
			});
		},
	},

	methods: {
	},
});
