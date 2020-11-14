import TeamProfile from '../../base/TeamProfile';
import { lobby } from '../../base/Lobby';

const enum State {
	Loading,
	Expired,
	Loaded,
}

Page({
	data: {
		state: State.Loading,
		id: 0,
		key: '',
		teams: [] as TeamProfile[],
	},

	async onLoad(options) {
		if (options.id) {
			const id = parseInt(options.id, 10);
			await lobby.enterRoom(id);
		}

		const room = lobby.getCurrentRoom();
		const config = room?.getConfig();
		if (!config) {
			this.setData({ state: State.Expired });
			return;
		}

		const teams = TeamProfile.fromRoles(config.roles);
		this.setData({
			state: State.Loaded,
			id: config.id,
			key: config.salt,
			teams,
		});
	},

	goBack() {
		wx.redirectTo({
			url: '../index',
		});
	},

	onShareAppMessage() {
		return {
			title: `一夜终极狼人房间 ${this.data.id}`,
			path: `/page/room/index?id=${this.data.id}`,
		};
	},
});
