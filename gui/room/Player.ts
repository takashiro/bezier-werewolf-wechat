Component({
	properties: {
		seat: {
			type: Number,
		},
		role: {
			type: Number,
		},
		selected: {
			type: Boolean,
		},
	},

	data: {
	},

	methods: {
		handleClick(): void {
			this.triggerEvent('click', {
				seat: this.data.seat,
			});
		},
	},
});
