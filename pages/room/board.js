
import Role from '../RoleItem';
import SkillValidator from './skill-validator';
import Session from './Session';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

const input = {
	players: new Set,
	centerCards: new Set,
};

function CenterCard(index) {
	this.index = index;
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
			const card = centerCards[source.index];
			if (card) {
				card.role = role.fromNum(source.role);
			}
		}
		this.setData({centerCards});
	}

	this.setData({state: 'lynch'});
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
			url: `${serverUrl}skill?id=${this.data.roomId}&seat=${this.data.seat}&seatKey=${this.data.seatKey}`,
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
		state: "skill", // skill, lynch, end
		centerCards: [],
		players: [],
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
	},

	methods: {
		selectPlayer,
		selectCenterCard,
		invokeSkill,
	}
})
