import { lobby } from '../../base/Lobby';

import Board from '../../game/Board';
import Card from '../../game/Card';
import Player from '../../game/Player';

let board: Board;

const errorMap = new Map<number, string>();
errorMap.set(409, '你已经投过票');
errorMap.set(425, '请等待其他玩家完成夜间行动');

Component({
	/**
	 * Component properties
	 */
	properties: {
	},

	/**
	 * Component initial data
	 */
	data: {
		skillLabel: '',
		cards: [] as Card[],
		players: [] as Player[],
	},

	lifetimes: {
		async attached() {
			const room = lobby.getCurrentRoom();
			if (!room) {
				return;
			}

			board = new Board(room);
			await board.prepare();
			this.refreshAll();
		},
	},

	/**
	 * Component methods
	 */
	methods: {
		togglePlayer(e: WechatMiniprogram.CustomEvent): void {
			const { seat } = e.detail;
			if (board.togglePlayer(seat)) {
				this.refreshPlayers();
			}
		},

		// Nonesense? It just updates everything anyway.
		refreshPlayers(): void {
			this.setData({
				players: board.getPlayers(),
			});
		},

		toggleCard(e: WechatMiniprogram.CustomEvent): void {
			const { pos } = e.detail;
			if (board.toggleCard(pos)) {
				this.refreshCards();
			}
		},

		refreshCards(): void {
			this.setData({
				cards: board.getCards(),
			});
		},

		refreshAll(): void {
			const skill = board.getSkill();
			this.setData({
				skillLabel: skill ? skill.getButtonLabel() : '',
				cards: board.getCards(),
				players: board.getPlayers(),
			});
		},

		async invokeSkill(): Promise<void> {
			const skill = board.getSkill();
			if (!skill) {
				return;
			}

			if (!skill.validate()) {
				const message = skill.getMessage();
				wx.showToast({
					title: message || '技能目标不合法',
					icon: 'none',
				});
				return;
			}

			try {
				await skill.invoke();
			} catch (error) {
				const title = errorMap.get(error.statusCode) || error.message;
				wx.showToast({
					title,
					icon: 'none',
				});
				if (error.statusCode === 409) {
					board.resetSelection();
					skill.skip();
				} else {
					return;
				}
			}

			this.refreshAll();
		},
	},
});
