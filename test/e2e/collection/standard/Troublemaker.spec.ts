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
		Role.Troublemaker,
		Role.Hunter,
		Role.Prince,
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

it('is a troublemaker', async () => {
	await board.waitForPlayer(1, '捣蛋鬼');
});

it('exchanges 2 players', async () => {
	const players = await board.getPlayers();
	expect(players.length).toBe(3);
	await players[1].tap();
	await players[2].tap();
	await board.submit();
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

it('enters day phase', async () => {
	await board.waitForButton('进入白天');
	await board.submit();
});

it('waits for vote button', async () => {
	await board.waitForButton('投票');
});

it('votes for player 2', async () => {
	await board.tapPlayer(2);
	await board.submit();
});

it('views vote results', async () => {
	await board.waitForButton('投票结果');
	await board.submit();
	await board.waitForVoteResult();
});

it('verifies skill effects', async () => {
	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('捣蛋鬼');
	expect(await players[1].text()).toBe('王子');
	expect(await players[2].text()).toBe('猎人');
});

it('exits the room', async () => {
	await room.exit();
});
