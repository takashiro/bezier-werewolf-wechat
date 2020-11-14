import { Role } from '@bezier/werewolf-core';
import { lobby } from '../../base/Lobby';

const input = {
	seat: 0,
};

const errorMap = new Map<number, string>();
errorMap.set(404, '请输入正确的座位号');
errorMap.set(409, '该座位已被占用');

function showToast(message: string): void {
	wx.showToast({
		title: message,
		icon: 'none',
	});
}

Component({
	/**
	 * Component properties
	 */
	properties: {
	},

	/**
	 * Component initial data
	 */
	data: {
		seat: 0,
		role: Role.Unknown,
	},

	async ready() {
		const room = lobby.getCurrentRoom();
		try {
			const profile = await room?.readProfile();
			if (profile) {
				this.setData(profile);
			}
		} catch (error) {
			// Ignore
		}
	},

	/**
	 * Component methods
	 */
	methods: {
		updateSeat(e: WechatMiniprogram.Input): void {
			input.seat = parseInt(e.detail.value, 10);
		},

		async takeSeat(): Promise<void> {
			if (this.data.seat > 0) {
				return;
			}

			const room = lobby.getCurrentRoom();
			if (!room) {
				return;
			}

			if (input.seat <= 0) {
				return showToast('请输入您的座位号');
			}

			try {
				const player = await room.fetchProfile(input.seat);
				await room.saveProfile();
				this.setData(player);
			} catch (error) {
				const message = errorMap.get(error && error.statusCode) || '查看身份失败';
				showToast(message);
			}
		},
	},
});
