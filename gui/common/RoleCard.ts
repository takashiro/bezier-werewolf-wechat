import { Role } from '@bezier/werewolf-core';
import col from '../../game/collection/index';

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
		description: '',
	},
	observers: {
		role(role: Role): void {
			const item = col.describe(role);
			this.setData({
				key: item.key,
				name: item.name,
				description: item.description,
			});
		},
	},
});
