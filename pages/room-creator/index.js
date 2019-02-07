
import Role from '../RoleItem';
import parseSelector from './parseSelector';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

const defaultConfig = [
	Role.Werewolf, Role.Werewolf,
	Role.Minion,
	Role.Villager, Role.Villager,
	Role.Seer, Role.Troublemaker, Role.Robber, Role.Drunk,
	Role.Tanner,
];

const roleConfig = [...defaultConfig];

Page({
	data: {
		selectors: parseSelector(defaultConfig),
	},

	onLoad: function (options) {
	},

	handleRoleChange: function (e) {
		const role = Role.fromNum(e.detail.role);
		const selected = e.detail.value > 0;
		if (selected) {
			roleConfig.push(role);
		} else {
			const pos = roleConfig.indexOf(role);
			if (pos >= 0) {
				roleConfig.splice(pos, 1);
			}
		}
	},

	createRoom: function (e) {
		const roles = roleConfig.map(role => role.toNum());

		wx.showLoading({
			title: '创建中……',
			icon: 'none',
		});
		wx.request({
			method: 'POST',
			url: serverUrl + 'room',
			data: {roles},
			success: function(res) {
				wx.hideLoading();

				if (res.statusCode === 500) {
					return wx.showToast({
						title: '服务器房间数已满，请稍后重试。',
						icon: 'none',
					});
				} else if (res.statusCode !== 200) {
					return wx.showToast({
						title: '非常抱歉，服务器临时故障。',
						icon: 'fail',
					});
				}

				const room = res.data;
				wx.setStorage({
					key: 'room',
					data: room,
					success: function() {
						wx.redirectTo({
							url: '../room/index?id=' + room.id,
						});
					},
					fail: function() {
						wx.showToast({
							title: '您的存储空间不足，请删除小程序后重试。',
							icon: 'none',
						});
					},
				});
			},
			fail: function(res) {
				wx.hideLoading();
				wx.showToast({
					title: '您的网络环境故障，请确认设备可联网。',
					icon: 'none',
				});
			},
		});
	},
})
