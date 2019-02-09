
import Role from '../RoleItem';
import SkillValidator from './skill-validator';
import Session from './Session';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

const input = {
	players: new Set,
	centerCards: new Set,
};

function CenterCard(pos) {
	this.pos = pos;
	this.role = Role.Unknown;
}

function Player(seat) {
	this.seat = seat;
	this.role = Role.Unknown;
}

function selectPlayer(e) {
	const seat = e.detail.key;
	const selected = !!e.detail.value;
	if (selected) {
		input.players.add(seat);
	} else {
		input.players.delete(seat);
	}
}

function selectCenterCard(e) {
	const index = e.detail.key;
	const selected = !!e.detail.value;
	if (selected) {
		input.centerCards.add(index);
	} else {
		input.centerCards.delete(index);
	}
}

function encodeSkillTarget(input) {
	const data = {};

	if (input.players) {
		if (input.players.size > 1) {
			data.players = Array.from(input.players);
		} else if (input.players.size === 1) {
			const players = Array.from(input.players);
			data.player = players[0];
		}
	}

	if (input.centerCards) {
		if (input.centerCards.size > 1) {
			data.cards = Array.from(input.centerCards);
		} else if (input.centerCards.size === 1) {
			const cards = Array.from(input.centerCards);
			data.card = cards[0];
		}
	}

	return data;
}

function showVision(vision) {
	if (vision.players && vision.players instanceof Array) {
		const players = this.data.players;
		for (const source of vision.players) {
			const player = players[source.seat - 1];
			if (player) {
				player.role = Role.fromNum(source.role);
			}
		}
		this.setData({players});
	}

	if (vision.cards && vision.cards instanceof Array) {
		const centerCards = this.data.centerCards;
		for (const source of vision.cards) {
			const card = centerCards[source.pos];
			if (card) {
				card.role = Role.fromNum(source.role);
			}
		}
		this.setData({centerCards});
	}

	goToLynch.call(this);
}

function invokeSkill() {
	const validator = SkillValidator[this.data.role.value];
	if (!validator) {
		return;
	}

	const res = validator(input);
	if (!res) {
		return;
	} else if (typeof res === 'string') {
		return wx.showToast({
			title: res,
			icon: 'none',
		});
	}

	const session = new Session(this.data.roomKey);
	session.restore();
	if (session.vision) {
		showVision.call(this, session.vision);

	} else {
		wx.showLoading({
			title: '加载中...',
		});

		wx.request({
			method: 'POST',
			url: serverUrl + 'skill?' + this.getAuth(),
			data: encodeSkillTarget(res),
			success: res => {
				wx.hideLoading();

				if (res.statusCode === 404) {
					return wx.showToast({
						title: '房间已失效，请退出。',
						icon: 'none',
					});
				} else if (res.statusCode !== 200) {
					return wx.showToast({
						title: '技能发动失败。Error: ' + res.data,
						icon: 'none',
					});
				}

				wx.showToast('技能已生效');

				const vision = res.data;
				session.vision = vision;
				session.save();

				showVision.call(this, vision);
			},

			fail: function () {
				wx.hideLoading();
				wx.showToast({
					title: '网络请求失败，请确认设备可联网。',
					icon: 'none',
				});
			},
		});
	}
}

function wakeUp() {
	const session = new Session(this.data.roomKey);
	session.restore();
	session.vision = {};
	session.save();

	goToLynch.call(this);
}

function goToLynch() {
	this.setData({ state: 'countdown' });
	let countdown = this.data.countdown;
	if (countdown <= 0) {
		this.setData({ state: 'lynch' });
	} else {
		countdown--;
		this.setData({countdown});
		setTimeout(goToLynch.bind(this), 1000);
	}
}

function submitLynch() {
	if (input.players.size < 1) {
		return wx.showToast({
			title: '请选择1名玩家',
			icon: 'none',
		});
	} else if (input.players.size > 1) {
		return wx.showToast({
			title: '只能投票给1名玩家',
			icon: 'none',
		});
	}

	const players = Array.from(input.players);
	wx.showLoading({ title: '投票中……' });
	wx.request({
		method: 'POST',
		url: serverUrl + 'lynch?' + this.getAuth(),
		data: {target: players[0]},
		success: res => {
			wx.hideLoading();
			if (res.statusCode === 200 || res.statusCode === 409) {
				wx.showToast({title: '投票成功'});
				this.setData({state: 'end'});
				showLynch.call(this);
			} else if (res.statusCode === 404) {
				wx.showToast({title: '房间已失效', icon: 'none'});
			} else {
				wx.showToast({title: '投票失败。' + res.data});
			}
		},
		fail: () => {
			wx.hideLoading();
			wx.showToast({title: '网络连接失败，请确认设备可联网。'});
		}
	});
}

function showLynch() {
	wx.showLoading();
	wx.request({
		method: 'GET',
		url: serverUrl + 'lynch?id=' + this.data.roomId,
		success: res => {
			wx.hideLoading();
			const vision = res.data;
			// TODO: do not need to update vision for each time
			if (vision.players.some(player => player.role) || vision.cards.some(card => card.role)) {
				showVision.call(this);
			}
			const votes = vision.players.map(player => ({from: player.seat, to: player.target}));
			this.setData({votes});
		},
		fail: () => {
			wx.hideLoading();
			wx.showToast({title: '网络故障，请确认设备可联网。'});
		},
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
		playerNum: {
			type: Number,
			value: 0,
		},
		seat: {
			type: Number,
			value: 0,
		},
		seatKey: {
			type: Number,
			value: 0,
		},
		role: {
			type: Object,
			value: null,
		},
	},

	data: {
		state: "skill", // skill, countdown, lynch, end
		centerCards: [],
		players: [],
		votes: [],
		countdown: 10,
	},

	ready() {
		let centerCards = new Array(3);
		for (let i = 0; i < 3; i++) {
			centerCards[i] = new CenterCard(i);
		}
		let players = new Array(this.data.playerNum);
		for (let i = 0; i < players.length; i++) {
			players[i] = new Player(i + 1);
		}

		this.setData({centerCards, players});

		const session = new Session(this.data.roomKey);
		session.restore();
		if (session.vision) {
			showVision.call(this, session.vision);
		}
	},

	methods: {
		getAuth() {
			return 'id=' + this.data.roomId + '&seat=' + this.data.seat + '&seatKey=' + this.data.seatKey;
		},

		selectPlayer,
		selectCenterCard,
		invokeSkill,
		wakeUp,
		submitLynch,
	}
})
