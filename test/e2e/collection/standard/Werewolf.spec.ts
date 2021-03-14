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
		Role.Werewolf,
		Role.Hunter,
		Role.Werewolf,
	]);
});

it('takes Seat 1', async () => {
	await room.takeSeat(1);
});

it('opens a game board', async () => {
	board = await room.getBoard();
});

it('is a werewolf', async () => {
	const [player] = await board.getPlayers();
	expect(await player.text()).toBe('狼人');
});

it('meets other werewolves', async () => {
	await board.submit();
	await board.waitForButton('投票');

	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('狼人');
	expect(await players[1].text()).toBe('未知');
	expect(await players[2].text()).toBe('狼人');
});

it('simulates other players', async () => {
	const hunter = room.createPlayer(2);
	await hunter.takeSeat();
	await hunter.invokeSkill();

	const wolf = room.createPlayer(3);
	await wolf.takeSeat();
	await wolf.invokeSkill();

	await hunter.vote(3);
	await wolf.vote(2);
}, 60000);

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
