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
		Role.Witch,
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

it('is a witch', async () => {
	await board.waitForPlayer(1, '女巫');
});

it('chooses one center card', async () => {
	const cards = await board.getCards();
	expect(cards.length).toBe(3);
	const card = cards[1];
	await card.tap();
	await board.submit();
});

it('sees a werewolf', async () => {
	await board.waitForCard(1, '狼人');
});

it('chooses one player', async () => {
	const players = await board.getPlayers();
	expect(players.length).toBe(3);
	const target = players[2];
	await target.tap();
	await board.submit();
});

it('exchanges the player with the prince', async () => {
	await board.waitForPlayer(3, '狼人');
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
	expect(await players[0].text()).toBe('女巫');
	expect(await players[1].text()).toBe('猎人');
	expect(await players[2].text()).toBe('狼人');
});

it('exits the room', async () => {
	await room.exit();
});
