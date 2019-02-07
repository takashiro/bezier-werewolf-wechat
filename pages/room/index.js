
import Role from '../RoleItem';
import Team from '../TeamItem';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

function prepareRoom(data) {
	const id = parseInt(data.id, 10);
	const key = data.key;
	const teams = [];
	let playerNum = 0;

	const teamMap = new Map;
	if (data.roles && data.roles instanceof Array) {
		playerNum = data.roles.length - 3;
		for (const roleEnum of data.roles) {
			const role = Role.fromNum(roleEnum);
			const team = Team.fromNum(role.team.value);
			let org = teamMap.get(team);
			if (!org) {
				org = {team, key: team.key, roles: []};
				teamMap.set(team, org);
				teams.push(org);
			}
			org.roles.push(role);
		}
	}
	for (const team of teams) {
		team.roles.sort();
	}

	return {
		id,
		key,
		playerNum,
		teams,
	};
}

Page({

	data: {
		id: 0,
		key: "",
		teams: [],
		playerNum: 0,
	},

	onLoad: function (options) {
		const successFn = res => {
			this.setData(prepareRoom(res.data));
		};

		const failFn = () => {
			this.setData({ id: -1 });
		};

		if (options.id) {
			wx.request({
				method: 'GET',
				url: serverUrl + 'room',
				data: { id: options.id },
				success: successFn,
				fail: failFn,
			});
		} else {
			wx.getStorage({
				key: 'room',
				success: successFn,
				fail: failFn,
			});
		}
	},

	onShareAppMessage: function () {
		return {
			title: '一夜终极狼人房间 ' + this.data.id,
			path: '/pages/room/index?id=' + this.data.id,
		};
	}

})
