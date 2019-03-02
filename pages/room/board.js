import Role from '../RoleItem';
import Skill from '../../game/Skill';
import SkillList from '../../game/skills/index';
import Session from './Session';

const app = getApp();
const serverUrl = app.globalData.serverUrl;

class LynchSkill extends Skill {

	selectCard() {}

	selectPlayer(all, target, selected) {
		if (selected) {
			for (const player of all) {
				player.selected = false;
			}
			target.selected = true;
		} else {
			target.selected = false;
		}
		return true;
	}

}

const lynchSkill = new LynchSkill;

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

function getSkill() {
	if (this.data.state === 'skill') {
		const skill = SkillList[this.data.role.value];
		return skill;
	} else if (this.data.state === 'lynch') {
		return lynchSkill;
	}
}

function selectPlayer(e) {
	const skill = getSkill.call(this);
	if (!skill) {
		return;
	}

	const seat = e.detail.key;
	const selected = !!e.detail.value;

	const players = this.data.players;
	const player = players[seat - 1];
	if (skill.selectPlayer(players, player, selected)) {
		this.setData({ players });
	}
}

function selectCenterCard(e) {
	const skill = getSkill.call(this);
	if (!skill) {
		return;
	}

	const pos = e.detail.key;
	const selected = !!e.detail.value;

	const centerCards = this.data.centerCards;
	const card = centerCards[pos];
	if (skill.selectCard(centerCards, card, selected)) {
		this.setData({ centerCards });
	}
}

function getInput() {
	const players = this.data.players.filter(player => player.selected);
	const cards = this.data.centerCards.filter(card => card.selected);
	return {cards, players};
}

function encodeSkillTarget(players, cards) {
	const data = {};

	if (players.length > 1) {
		data.players = players.map(player => player.seat);
	} else if (players.length == 1) {
		data.player = players[0].seat;
	}

	if (cards.length > 1) {
		data.cards = cards.map(card => card.pos);
	} else if (cards.length == 1) {
		data.card = cards[0].pos;
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

function resetBoard() {
	const players = this.data.players;
	for (const player of players) {
		player.selected = false;
	}

	const centerCards = this.data.centerCards;
	for (const card of centerCards) {
		card.selected = false;
	}

	this.setData({ centerCards, players });
}

function invokeSkill() {
	const skill = SkillList[this.data.role.value];
	if (!skill) {
		return;
	}

	const {players, cards} = getInput.call(this);
	if (!skill.validate(players, cards)) {
		const message = skill.getMessage();
		return wx.showToast({
			title: message || '技能目标非法',
			icon: 'none',
		});
	}

	const skillTarget = encodeSkillTarget(players, cards);
	resetBoard.call(this);

	wx.showLoading({
		title: '加载中...',
	});

	wx.request({
		method: 'POST',
		url: serverUrl + 'skill?' + this.getAuth(),
		data: skillTarget,
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

			skill.invoke(players, cards);
			const actionLog = skill.getLogs();

			const vision = res.data;

			const session = new Session(this.data.roomKey);
			session.actionLog = actionLog;
			session.vision = vision;
			session.save();

			this.setData({ actionLog });
			showVision.call(this, vision);

			if (skill.isUsed()) {
				goToLynch.call(this);
			}
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
	const {players} = getInput.call(this);
	if (players.length < 1) {
		return wx.showToast({
			title: '请选择1名玩家',
			icon: 'none',
		});
	} else if (players.length > 1) {
		return wx.showToast({
			title: '只能投票给1名玩家',
			icon: 'none',
		});
	}

	const lynchTarget = players[0].seat;
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
			resetBoard.call(this);
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
			if (vision.players && vision.cards) {
				showVision.call(this, vision);

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
			} else if (vision.progress && vision.limit) {
				this.setData({
					voteProgress: vision.progress,
					voteLimit: vision.limit,
				});
			}
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
		voteProgress: 0,
		voteLimit: 0,
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
