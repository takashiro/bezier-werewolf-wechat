
const app = getApp();
const serverUrl = app.globalData.serverUrl;

let roomNumber = null;

Page({
    data: {},

    onLoad: function() {},

	createRoom: function() {
		wx.redirectTo({
			url: '../room-creator/index',
		});
	},

	enterRoom: function() {
		if (!roomNumber) {
			return wx.showToast({
				title: '请输入房间号。',
				icon: 'none',
			});
		}

		wx.showLoading({
			title: '加载中...',
			icon: 'none',
		});
		wx.request({
			method: 'GET',
			url: serverUrl + 'room',
			data: {id: roomNumber},
			success: function (res) {
				wx.hideLoading();
				if (res.statusCode === 404) {
					return wx.showToast({
						title: '房间不存在。',
						icon: 'none',
					});
				} else if (res.statusCode !== 200) {
					return wx.showToast({
						title: '服务器错误，请稍后重试。',
						icon: 'none',
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
			fail: function (res) {
				wx.hideLoading();
				wx.showToast({
					title: '您的网络环境故障，请确认设备可联网。',
					icon: 'none',
				})
			},
		})
	},

	handleRoomNumberChange: function(e) {
		roomNumber = e.detail.value;
	},
})
