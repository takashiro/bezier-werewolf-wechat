import RoleConfig from '../../base/RoleConfig';
import { selectors } from '../../base/TeamSelector';
import { lobby } from '../../base/Lobby';

import RoleChangeEvent from './RoleChangeEvent';

const roleConfig = new RoleConfig();

Page({
	data: {
		selectors,
	},

	async onLoad(): Promise<void> {
		await roleConfig.read();
		this.refreshSettings();
	},

	refreshSettings(): void {
		for (const selector of selectors) {
			const items = roleConfig.getItems();
			selector.update(items);
		}
		this.setData({ selectors });
	},

	handleRoleChange(e: RoleChangeEvent): void {
		roleConfig.set(e.detail.role, e.detail.num);
		this.refreshSettings();
	},

	handleReturn(): void {
		wx.navigateBack();
	},

	goBack(): void {
		wx.redirectTo({
			url: '../index',
		});
	},

	async createRoom(): Promise<void> {
		await roleConfig.save();

		const roles = roleConfig.getRoles();

		if (roles.length > 50) {
			roleConfig.reset();
			await roleConfig.save();
			this.refreshSettings();
			wx.showToast({
				title: '最多仅能支持50人局，请重新选择。',
				icon: 'none',
			});
			return;
		}

		if (roles.length <= 0) {
			wx.showToast({
				title: '请选择角色。',
			});
			return;
		}

		wx.showLoading({
			title: '创建房间……',
		});

		let status = 100;
		try {
			status = await lobby.createRoom({
				cardNum: 3,
				roles,
			});
		} catch (error) {
			wx.hideLoading();
			wx.showToast({
				title: '网络状况不佳，请重试。',
				icon: 'none',
			});
			return;
		}
		wx.hideLoading();

		if (status === 500) {
			wx.showToast({
				title: '服务器房间数已满，请稍后重试。',
				icon: 'none',
			});
			return;
		}

		if (status !== 200) {
			wx.showToast({
				title: '非常抱歉，服务器临时故障。',
			});
			return;
		}

		wx.redirectTo({
			url: '../room/index',
		});
	},
});
