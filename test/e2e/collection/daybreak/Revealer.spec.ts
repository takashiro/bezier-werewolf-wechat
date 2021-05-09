import { Role } from '@bezier/werewolf-core';

import GameBoard from '../../GameBoard';
import { lobby } from '../../Lobby';
import Room from '../../Room';
import ServerPlayer from '../../ServerPlayer';

let room: Room;
let board: GameBoard;

beforeAll(async () => {
	await lobby.connect();
}, 60000);

afterAll(async () => {
	await lobby.disconnect();
});

describe('As a Revealer', () => {
	let hunter: ServerPlayer;
	let werewolf: ServerPlayer;

	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Revealer,
			Role.Hunter,
			Role.Werewolf,
		]);

		hunter = room.createPlayer(2);
		werewolf = room.createPlayer(3);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('is a revealer', async () => {
		await board.start();
		await board.ready();
		await board.waitForPlayer(1, '启示者');
	});

	it('sees a werewolf', async () => {
		await board.tapPlayer(3);
		await board.submit();
		await board.waitForPlayer(3, '狼人');
	});

	it('simulate other players', async () => {
		await hunter.takeSeat();
		await werewolf.takeSeat();

		await hunter.invokeSkill();
		await werewolf.invokeSkill();
	});

	it('waits for day button', async () => {
		await board.waitForButton('进入白天');
		await board.submit();
	});

	it('votes', async () => {
		await werewolf.vote(2);
		await hunter.vote(3);

		await board.waitForButton('投票');
		await board.tapPlayer(3);
		await board.submit();
	});

	it('views vote results', async () => {
		await board.waitForButton('投票结果');
		await board.submit();
	});

	it('verifies player roles', async () => {
		await board.waitForVoteResult();
		const players = await board.getPlayers();
		expect(await players[0].text()).toBe('启示者');
		expect(await players[1].text()).toBe('猎人');
		expect(await players[2].text()).toBe('狼人');
	});

	it('exits the room', async () => {
		await room.exit();
	});
});

describe('As a Seer', () => {
	let revealer: ServerPlayer;
	let hunter: ServerPlayer;

	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Seer,
			Role.Revealer,
			Role.Hunter,
		]);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('is a seer', async () => {
		await board.start();
		await board.ready();
		await board.waitForPlayer(1, '预言家');
	});

	it('sees revealer', async () => {
		await board.tapPlayer(2);
		await board.submit();
		await board.waitForPlayer(2, '启示者');
	});

	it('waits for day button', async () => {
		await board.waitForButton('进入白天');
		await board.submit();
	});

	it('cannot enter day phase before revealer does', async () => {
		await board.waitForButton('进入白天');
	});

	it('simulates other players', async () => {
		revealer = room.createPlayer(2);
		await revealer.takeSeat();
		await revealer.invokeSkill(0, { players: [3] });

		hunter = room.createPlayer(3);
		await hunter.takeSeat();
		await hunter.invokeSkill();
	}, 60000);

	it('enters day phase', async () => {
		await board.submit();
	});

	it('sees a hunter', async () => {
		await board.waitForPlayer(3, '猎人');
	});

	it('votes', async () => {
		await board.waitForButton('投票');
		await revealer.vote(2);
		await hunter.vote(3);

		await board.tapPlayer(3);
		await board.submit();
	});

	it('views vote results', async () => {
		await board.waitForButton('投票结果');
		await board.submit();
	});

	it('verifies player roles', async () => {
		await board.waitForVoteResult();
		const players = await board.getPlayers();
		expect(await players[0].text()).toBe('预言家');
		expect(await players[1].text()).toBe('启示者');
		expect(await players[2].text()).toBe('猎人');
	});

	it('exits the room', async () => {
		await room.exit();
	});
});
