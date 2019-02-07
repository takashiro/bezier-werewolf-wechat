
import Role from '../RoleItem';
import Session from './Session';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

const input = {
	seat: 0,
};

function fetchRole() {
	const session = new Session(this.data.roomKey);
	session.restore();

	if (session.role || session.seat) {
		return;
	}

	wx.request({
		method: 'GET',
		url: serverUrl + 'role',
		data: {
			id: this.data.roomId,
			seat: input.seat,
			seatKey: session.seatKey
		},
		success: res => {
			if (res.statusCode === 404) {
				return wx.showToast({
					title: '房间已失效，请重新创建房间。',
					icon: 'none',
				});
			} else if (res.statusCode === 409) {
				return wx.showToast({
					title: '座位已被占用，请使用其他座位。',
					icon: 'none',
					complete: () => this.setData({ state: 'init' })
				});
			} else if (res.statusCode === 403) {
				return wx.showToast({
					title: '请刷新网页缓存，然后重试。',
					icon: 'none',
				});
			} else if (res.statusCode != 200) {
				return wx.showToast({
					title: '查看身份失败。',
					icon: 'none',
				});
			}

			session.role = res.data.role;
			session.seat = res.data.seat;
			session.save();

			this.showRole(session);
		},
		fail: () => {
			session.save();
			wx.showToast({
				title: '本地网络故障，请确认设备可联网。',
				icon: 'none'
			});
			this.setData({ state: 'init' });
		}
	});
}

Component({

	properties: {
		roomId: {
			type: Number,
			value: 0,
		},
		roomKey: {
			type: String,
			value: '',
		},
	},

	data: {
		state: 'prepare', // "prepare", "init", "loading", "loaded"
		role: 0,
		seat: 0,
	},

	ready: function () {
		const session = new Session(this.data.roomKey);
		session.restore();

		if (session.role && session.seat) {
			this.showRole(session);
		} else {
			this.setData({ state: 'init' });
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		updateSeat: function (e) {
			input.seat = parseInt(e.detail.value, 10);
		},

		showRole: function (my) {
			const role = Role.fromNum(my.role);
			this.setData({
				state: 'loaded',
				seat: my.seat,
				role: role,
			});
		},

		fetchRole: function () {
			let roomId = this.data.roomId;
			if (roomId <= 0 || isNaN(roomId)) {
				return wx.showToast({
					title: '房间号错误。',
					icon: 'none'
				});
			}

			let seat = input.seat;
			if (seat <= 0 || isNaN(seat)) {
				return wx.showToast({
					title: '请输入座位号。',
					icon: 'none'
				});
			}

			this.setData({ state: 'loading' });
			fetchRole.call(this);
		},
	}
})
