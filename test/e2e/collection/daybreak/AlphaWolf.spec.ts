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
		Role.Villager,
		Role.Villager,
		Role.AlphaWolf,
		Role.Werewolf,
		Role.Hunter,
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

it('is an alpha wolf', async () => {
	await board.waitForPlayer(1, '狼王');
});

it('shows 4 cards', async () => {
	const cards = await board.getCards();
	expect(cards.length).toBe(4);
});

it('meets other werewolves', async () => {
	await board.waitForButton('碰面');
	await board.submit();
	await board.waitForPlayer(2, '狼人');
});

it('waits for infection button', async () => {
	await board.waitForButton('感染');
});

it('infects the hunter', async () => {
	const players = await board.getPlayers();
	expect(players.length).toBe(3);
	const target = players[2];
	await target.tap();
	await board.submit();
});

it('simulates other players', async () => {
	const wolf = room.createPlayer(2);
	await wolf.takeSeat();
	await wolf.invokeSkill();

	const villager = room.createPlayer(3);
	await villager.takeSeat();
	await villager.invokeSkill();

	await wolf.vote(3);
	await villager.vote(2);
}, 60000);

it('enters day phase', async () => {
	await board.waitForButton('进入白天');
	await board.submit();
});

it('waits for vote button', async () => {
	await board.waitForButton('投票');
});

it('votes for player 3', async () => {
	const target = await board.getPlayer(3);
	expect(await target.text()).toBe('未知');
	await target.tap();
	await board.submit();
});

it('views vote results', async () => {
	await board.waitForButton('投票结果');
	await board.submit();
	await board.waitForVoteResult();
});

it('checks infected people', async () => {
	const target = await board.getPlayer(3);
	expect(await target.text()).toBe('狼人');
});

it('exits the room', async () => {
	await room.exit();
});
