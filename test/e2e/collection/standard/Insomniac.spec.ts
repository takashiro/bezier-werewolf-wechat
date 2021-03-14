import { Role } from '@bezier/werewolf-core';
import waitUntil from '../../util/waitUntil';

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

it('returns to lobby', async () => {
	await lobby.prepare();
}, 60000);

it('enters the room', async () => {
	room = await lobby.createRoom([
		Role.Villager,
		Role.Werewolf,
		Role.Tanner,
		Role.Insomniac,
		Role.Robber,
		Role.Prince,
	]);
});

it('takes Seat 1', async () => {
	await room.takeSeat(1);
});

it('opens a game board', async () => {
	board = await room.getBoard();
});

it('is an insomniac', async () => {
	const [player] = await board.getPlayers();
	expect(await player.text()).toBe('失眠者');
});

let robber: ServerPlayer;
let prince: ServerPlayer;
it('simulates other players', async () => {
	robber = room.createPlayer(2);
	prince = room.createPlayer(3);

	await robber.takeSeat();
	await prince.takeSeat();

	await robber.invokeSkill(0, {
		players: [1],
	});
	await prince.invokeSkill();
}, 60000);

it('sees his role again', async () => {
	await board.submit();
});

it('sees a robber', async () => {
	await waitUntil(async () => {
		const [player] = await board.getPlayers();
		const text = await player.text();
		return text === '盗贼';
	});
});

it('simulates votes of other players', async () => {
	await robber.vote(1);
	await prince.vote(2);
});

it('waits for vote button', async () => {
	await board.waitForButton('投票');
});

it('votes for player 3', async () => {
	const players = await board.getPlayers();
	const target = players[2];
	await target.tap();
	await board.submit();
});

it('views vote results', async () => {
	await board.waitForButton('投票结果');
	await board.submit();
	await board.waitForVoteResult();
});

it('verifies skill effects', async () => {
	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('盗贼');
	expect(await players[1].text()).toBe('失眠者');
	expect(await players[2].text()).toBe('王子');
});

it('exits the room', async () => {
	await room.exit();
});
