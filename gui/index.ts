import { lobby } from '../base/Lobby';

let roomNumber = 0;

Page({
	data: {},

	createRoom(): void {
		wx.redirectTo({
			url: './room-creator/index',
		});
	},

	async enterRoom(): Promise<void> {
		if (!roomNumber) {
			wx.showToast({
				title: '请输入房间号。',
				icon: 'none',
			});
			return;
		}

		wx.showLoading({
			title: '加载中...',
			icon: 'none',
		});

		try {
			const statusCode = await lobby.enterRoom(roomNumber);
			wx.hideLoading();

			if (statusCode === 404) {
				wx.showToast({
					title: '房间不存在。',
					icon: 'none',
				});
				return;
			}

			if (statusCode !== 200) {
				wx.showToast({
					title: '服务器错误，请稍后重试。',
					icon: 'none',
				});
				return;
			}

			wx.redirectTo({ url: './room/index' });
		} catch (error) {
			wx.showToast({
				title: '您的网络环境故障，请确认设备可联网。',
				icon: 'none',
			});
		}
	},

	handleRoomNumberChange(e: WechatMiniprogram.TouchEvent): void {
		roomNumber = e.detail.value;
	},
});
