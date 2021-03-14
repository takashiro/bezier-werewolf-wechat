import { Role } from '@bezier/werewolf-core';
import waitUntil from '../../util/waitUntil';

import GameBoard from '../../GameBoard';
import { lobby } from '../../Lobby';
import Room from '../../Room';

let room: Room;
let board: GameBoard;

beforeAll(async () => {
	await lobby.connect();
}, 60000);

afterAll(async () => {
	await lobby.disconnect();
});

describe('Sees 2 Cards', () => {
	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Seer,
			Role.Hunter,
			Role.Prince,
		]);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('is a seer', async () => {
		const [player] = await board.getPlayers();
		expect(await player.text()).toBe('预言家');
	});

	it('chooses 2 center cards', async () => {
		const cards = await board.getCards();
		expect(cards.length).toBe(3);
		await cards[0].tap();
		await cards[2].tap();
		await board.submit();
	});

	it('sees a villager and a tanner', async () => {
		await waitUntil(async () => {
			const cards = await board.getCards();
			const card0 = await cards[0].text();
			const card2 = await cards[2].text();
			return card0 === '村民' && card2 === '皮匠';
		});
	});

	it('simulates other players', async () => {
		const hunter = room.createPlayer(2);
		await hunter.takeSeat();
		await hunter.invokeSkill();

		const prince = room.createPlayer(3);
		await prince.takeSeat();
		await prince.invokeSkill();

		await hunter.vote(3);
		await prince.vote(2);
	}, 60000);

	it('waits for vote button', async () => {
		await board.waitForButton('投票');
	});

	it('votes for player 2', async () => {
		const players = await board.getPlayers();
		const target = players[1];
		await target.tap();
		await board.submit();
	});

	it('views vote results', async () => {
		await board.waitForButton('投票结果');
		await board.submit();
		await board.waitForVoteResult();
	});

	it('exits the room', async () => {
		await room.exit();
	});
});

describe('Sees 1 Player', () => {
	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Seer,
			Role.Hunter,
			Role.Prince,
		]);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('is a seer', async () => {
		const [player] = await board.getPlayers();
		expect(await player.text()).toBe('预言家');
	});

	it('chooses player 2', async () => {
		const players = await board.getPlayers();
		expect(players.length).toBe(3);
		await players[1].tap();
		await board.submit();
	});

	it('sees a hunter', async () => {
		await waitUntil(async () => {
			const players = await board.getPlayers();
			const text = await players[1].text();
			return text === '猎人';
		});
	});

	it('simulates other players', async () => {
		const hunter = room.createPlayer(2);
		await hunter.takeSeat();
		await hunter.invokeSkill();

		const prince = room.createPlayer(3);
		await prince.takeSeat();
		await prince.invokeSkill();

		await hunter.vote(3);
		await prince.vote(2);
	}, 60000);

	it('waits for vote button', async () => {
		await board.waitForButton('投票');
	});

	it('votes for player 2', async () => {
		const players = await board.getPlayers();
		const target = players[1];
		await target.tap();
		await board.submit();
	});

	it('views vote results', async () => {
		await board.waitForButton('投票结果');
		await board.submit();
		await board.waitForVoteResult();
	});

	it('exits the room', async () => {
		await room.exit();
	});
});
