Component({

	properties: {
		role: {
			type: Number,
			value: 0,
		},
		icon: {
			type: String,
			value: 'werewolf',
		},
		name: {
			type: String,
			value: 'Takashiro',
		},
		selected: {
			type: Boolean,
			value: false,
		}
	},

	data: {
	},

	methods: {
		handleTap: function () {
			let selected = !this.data.selected;
			this.setData({ selected: selected });
			this.triggerEvent('numberchange', {
				role: this.data.role,
				value: selected ? 1 : 0,
			});
		},
	}
})
