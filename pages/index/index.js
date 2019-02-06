//index.js
//获取应用实例
const app = getApp()

Page({
    data: {},

    onLoad: function() {},

	createRoom: function() {
		wx.redirectTo({
			url: '../room-creator/index',
		});
	},
})
