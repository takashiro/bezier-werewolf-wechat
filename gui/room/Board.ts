import { lobby } from '../../base/Lobby';
import Board from '../../game/Board';
import Card from '../../game/Card';
import Player from '../../game/Player';

let board: Board;

Component({
	/**
	 * Component properties
	 */
	properties: {
		role: {
			type: Number,
			value: 0,
		},
	},

	/**
	 * Component initial data
	 */
	data: {
		cards: [] as Card[],
		players: [] as Player[],
	},

	lifetimes: {
		async created() {
			const room = lobby.getCurrentRoom();
			if (!room) {
				return;
			}

			const { role } = this.data;
			const config = await room.readConfig();
			board = new Board({
				role,
				cardNum: 3,
				playerNum: config.roles.length - 3,
			});
			this.setData({
				cards: board.getCards(),
				players: board.getPlayers(),
			});
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

		// Nonesense? It's just updated anyway.
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
	},
});
