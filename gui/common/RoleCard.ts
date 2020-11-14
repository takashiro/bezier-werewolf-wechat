import RoleItem from '../../base/RoleItem';

Component({
	properties: {
		role: {
			type: Number,
			value: 0,
		},
		seat: {
			type: Number,
			value: 0,
		},
	},
	data: {
		key: '',
		name: '',
	},
	lifetimes: {
		attached() {
			const { role } = this.properties;
			if (!role) {
				return;
			}
			const item = new RoleItem(role);
			this.setData({
				key: item.key,
				name: item.name,
			});
		},
	},
	methods: {
	},
});
