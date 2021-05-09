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

describe('As a Thing', () => {
	let hunter: ServerPlayer;
	let prince: ServerPlayer;

	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Thing,
			Role.Hunter,
			Role.Prince,
		]);

		hunter = room.createPlayer(2);
		prince = room.createPlayer(3);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('is a thing', async () => {
		await board.start();
		await board.ready();
		await board.waitForPlayer(1, '东西');
	});

	it('can tap left siblings', async () => {
		const left = await board.getPlayer(3);
		await left.tap();
		expect(await left.isSelected()).toBe(true);
	});

	it('can tap right siblings', async () => {
		const right = await board.getPlayer(2);
		await right.tap();
		expect(await right.isSelected()).toBe(true);
	});

	it('cannot tap himself', async () => {
		const self = await board.getPlayer(1);
		await self.tap();
		expect(await self.isSelected()).toBe(false);
	});

	it('discloses himself to right siblings', async () => {
		await board.submit();
	});

	it('simulate other players', async () => {
		await hunter.takeSeat();
		await prince.takeSeat();

		await hunter.invokeSkill();
		await prince.invokeSkill();
	});

	it('waits for day button', async () => {
		await board.waitForButton('进入白天');
		await board.submit();
	});

	it('votes', async () => {
		await prince.vote(2);
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
		expect(await players[0].text()).toBe('东西');
		expect(await players[1].text()).toBe('猎人');
		expect(await players[2].text()).toBe('王子');
	});

	it('exits the room', async () => {
		await room.exit();
	});
});


describe('As a Hunter', () => {
	let thing: ServerPlayer;
	let prince: ServerPlayer;

	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Werewolf,
			Role.Tanner,
			Role.Hunter,
			Role.Thing,
			Role.Prince,
		]);

		thing = room.createPlayer(2);
		prince = room.createPlayer(3);
	});

	it('takes Seat 1', async () => {
		await room.takeSeat(1);
	});

	it('opens a game board', async () => {
		board = await room.getBoard();
	});

	it('simulate other players', async () => {
		await thing.takeSeat();
		await thing.invokeSkill(0, { players: [1] });

		await prince.takeSeat();
		await prince.invokeSkill();
	});

	it('is a hunter', async () => {
		await board.start();
		await board.ready();
		await board.waitForPlayer(1, '猎人');
	});

	it('does nothing at night', async () => {
		await board.waitForButton('睡觉');
		await board.submit();
	});

	it('wakes up', async () => {
		await board.waitForButton('进入白天');
		await board.submit();
	});

	it('sees a thing', async () => {
		await board.waitForPlayer(2, '东西');
	});

	it('votes', async () => {
		await prince.vote(2);
		await thing.vote(3);

		await board.waitForButton('投票');
		await board.tapPlayer(3);
		await board.submit();
	});

	it('exits the room', async () => {
		await room.exit();
	});
});
