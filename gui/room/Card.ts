Component({
	properties: {
		pos: {
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
				pos: this.data.pos,
			});
		},
	},
});
