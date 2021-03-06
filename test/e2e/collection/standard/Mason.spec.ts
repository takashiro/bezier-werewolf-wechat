import { Role } from '@bezier/werewolf-core';

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

it('returns to lobby', async () => {
	await lobby.prepare();
}, 60000);

it('enters the room', async () => {
	room = await lobby.createRoom([
		Role.Villager,
		Role.Werewolf,
		Role.Tanner,
		Role.Mason,
		Role.Werewolf,
		Role.Mason,
	]);
});

it('takes Seat 1', async () => {
	await room.takeSeat(1);
});

it('opens a game board', async () => {
	board = await room.getBoard();
	await board.start();
	await board.ready();
});

it('is Mason', async () => {
	await board.waitForPlayer(1, '守夜人');
});

it('meets the other Mason', async () => {
	await board.waitForButton('巡逻');
	await board.submit();
	await board.waitForButton('进入白天');

	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('守夜人');
	expect(await players[1].text()).toBe('未知');
	expect(await players[2].text()).toBe('守夜人');
});

it('simulates other players', async () => {
	const wolf = room.createPlayer(2);
	await wolf.takeSeat();
	await wolf.invokeSkill();

	const mason = room.createPlayer(3);
	await mason.takeSeat();
	await mason.invokeSkill();

	await wolf.vote(3);
	await mason.vote(2);
}, 60000);

it('enters day phase', async () => {
	await board.waitForButton('进入白天');
	await board.submit();
});

it('votes for player 2', async () => {
	await board.waitForButton('投票');
	await board.tapPlayer(2);
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
