import { Role } from '@bezier/werewolf-core';
import col from '../../game/collection/index';

Component({
	properties: {
		role: {
			type: Number,
			value: 0,
		},
		selectable: {
			type: Boolean,
			value: false,
		},
		selected: {
			type: Boolean,
			value: false,
		},
	},
	data: {
		key: '',
		name: '',
		description: '',
		n: 0,
	},
	observers: {
		role(role: Role): void {
			const item = col.describe(role);
			this.setData({
				key: item.key,
				name: item.name,
				description: item.description,
				n: item.name.length,
			});
		},
	},
	methods: {
		handleTap() {
			if (!this.data.selectable) {
				return;
			}

			const selected = !this.data.selected;
			this.triggerEvent('numberchange', {
				role: this.data.role,
				num: selected ? 1 : 0,
			});
		},
		handleLongPress() {
			wx.showModal({
				title: this.data.name,
				content: this.data.description,
				showCancel: false,
			});
		},
	},
});
