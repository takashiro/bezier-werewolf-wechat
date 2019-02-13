Component({

	properties: {
		key: {
			type: Number,
			value: 0,
		},
		icon: {
			type: String,
			value: 'Werewolf',
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
			this.triggerEvent('numberchange', {
				key: this.data.key,
				value: selected ? 1 : 0,
			});
		},
	}
})
