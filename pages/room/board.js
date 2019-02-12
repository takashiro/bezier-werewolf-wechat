import Role from '../RoleItem';
import SkillList from './skill-list';
import Session from './Session';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

const input = {
	players: null,
	centerCards: null,
};

/**
 * Data Structures */
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
		this.setData({ players });
	}

	if (vision.cards && vision.cards instanceof Array) {
		const centerCards = this.data.centerCards;
		for (const source of vision.cards) {
			const card = centerCards[source.pos];
			if (card) {
				card.role = Role.fromNum(source.role);
			}
		}
		this.setData({ centerCards });
	}
}

function invokeSkill() {
	const skill = SkillList[this.data.role.value];
	if (!skill) {
		return;
	}

	skill.setInput(input);
	const res = skill.validate(input);
	if (!res) {
		const message = skill.getMessage();
		return wx.showToast({
			title: message || '技能目标非法',
			icon: 'none',
		});
	}

	const actionLog = skill.getActionLog();

	const session = new Session(this.data.roomKey);
	if (session.vision) {
		showVision.call(this, session.vision);
		goToLynch.call(this);

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
				if (!session.actionLog) {
					session.actionLog = actionLog;
				}
				session.vision = vision;
				session.save();

				this.setData({ actionLog });
				showVision.call(this, vision);
				goToLynch.call(this);
			},

			fail: function() {
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
	session.vision = {};
	session.save();

	goToLynch.call(this);
}

function goToLynch() {
	this.setData({
		state: 'countdown'
	});
	let countdown = this.data.countdown;
	if (countdown <= 0) {
		this.setData({ state: 'lynch' });
	} else {
		countdown--;
		this.setData({ countdown });
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
	const lynchTarget = players[0];
	wx.showLoading({
		title: '投票中……'
	});
	wx.request({
		method: 'POST',
		url: serverUrl + 'lynch?' + this.getAuth(),
		data: {
			target: lynchTarget,
		},
		success: res => {
			wx.hideLoading();
			if (res.statusCode === 200 || res.statusCode === 409) {
				wx.showToast({
					title: '投票成功'
				});

				const session = new Session(this.data.roomKey);
				session.lynchTarget = lynchTarget;
				session.save();

				this.setData({ state: 'end', lynchTarget });
				showLynch.call(this);

			} else if (res.statusCode === 404) {
				wx.showToast({
					title: '房间已失效',
					icon: 'none'
				});
			} else {
				wx.showToast({
					title: '投票失败。' + res.data
				});
			}
		},
		fail: () => {
			wx.hideLoading();
			wx.showToast({
				title: '网络连接失败，请确认设备可联网。',
				icon: 'none',
			});
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

			if (res.statusCode === 404) {
				return wx.showToast({
					title: '房间已失效。',
					icon: 'none'
				});
			}

			const vision = res.data;
			// TODO: do not need to update vision for each time
			if (vision.players.some(player => player.role) || vision.cards.some(card => card.role)) {
				showVision.call(this, vision);
			}

			const voteLog = new Map;
			for (const player of vision.players) {
				let vote = voteLog.get(player.target);
				if (!vote) {
					vote = [];
					voteLog.set(player.target, vote);
				}
				vote.push(player.seat);
			}

			let votes = [];
			for (const [target, sources] of voteLog) {
				const num = sources.length;
				votes.push({
					key: target + '-' + num,
					target,
					num,
					sources,
				});
			}

			this.setData({ votes });
		},
		fail: () => {
			wx.hideLoading();
			wx.showToast({
				title: '网络故障，请确认设备可联网。',
				icon: 'none',
			});
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
		actionLog: '',
		lynchTarget: 0,
		votes: [],
		countdown: 10,
	},

	ready() {
		input.centerCards = new Set;
		input.players = new Set;

		let centerCards = new Array(3);
		for (let i = 0; i < 3; i++) {
			centerCards[i] = new CenterCard(i);
		}
		let players = new Array(this.data.playerNum);
		for (let i = 0; i < players.length; i++) {
			players[i] = new Player(i + 1);
		}

		this.setData({
			centerCards,
			players
		});

		const session = new Session(this.data.roomKey);
		let state = 'skill';
		if (session.actionLog) {
			this.setData({ actionLog: session.actionLog });
			state = 'lynch';
		}
		if (session.vision) {
			showVision.call(this, session.vision);
			state = 'lynch';
		}
		if (session.lynchTarget) {
			this.setData({ lynchTarget: session.lynchTarget });
			if (state === 'lynch') {
				state = 'end';
			}
		}

		this.setData({ state });
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
		showLynch,
	}
})
