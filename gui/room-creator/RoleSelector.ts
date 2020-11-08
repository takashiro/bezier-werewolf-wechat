import RoleChangeEvent from './RoleChangeEvent';

Component({
	properties: {
		role: {
			type: Number,
			value: 0,
		},
		num: {
			type: Number,
			value: 0,
		},
		maxNum: {
			type: Number,
			value: 1,
		},
	},

	data: {
		icons: [] as number[],
	},

	lifetimes: {
		attached(): void {
			const icons: number[] = new Array(this.data.maxNum);
			for (let i = 0; i < icons.length; i++) {
				icons[i] = i;
			}
			this.setData({ icons });
		},
	},

	/**
	 * Component methods
	 */
	methods: {
		handleChange(e: RoleChangeEvent): void {
			const selected = e.detail.num > 0;
			let { num } = this.data;
			if (selected) {
				num++;
			} else {
				num--;
			}
			this.setData({ num });

			this.triggerEvent('numberchange', {
				role: this.data.role,
				num,
			});
		},
	},
});
