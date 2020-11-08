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

	lifetimes: {
		attached() {
			const { team } = this.properties;
			if (!team) {
				return;
			}
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
