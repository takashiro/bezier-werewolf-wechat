import { Role } from '@bezier/werewolf-core';
import waitUntil from '../../util/waitUntil';

import GameBoard from '../../GameBoard';
import { lobby } from '../../Lobby';
import Room from '../../Room';

let room: Room;
let board: GameBoard;

beforeAll(async () => {
	await lobby.start();
}, 60000);

afterAll(async () => {
	await lobby.quit();
});

it('enters the room', async () => {
	room = await lobby.createRoom([
		Role.Villager,
		Role.Prince,
		Role.Tanner,
		Role.Witch,
		Role.Hunter,
		Role.Cursed,
	]);
});

it('takes Seat 1', async () => {
	await room.takeSeat(1);
});

it('opens a game board', async () => {
	board = await room.getBoard();
});

it('is a witch', async () => {
	const [player] = await board.getPlayers();
	expect(await player.text()).toBe('女巫');
});

it('chooses one center card', async () => {
	const cards = await board.getCards();
	expect(cards.length).toBe(3);
	const card = cards[1];
	await card.tap();
	await board.submit();
});

it('sees a prince', async () => {
	await waitUntil(async () => {
		const cards = await board.getCards();
		const text = await cards[1].text();
		return text === '王子';
	});
});

it('chooses one player', async () => {
	const players = await board.getPlayers();
	expect(players.length).toBe(3);
	const target = players[2];
	await target.tap();
	await board.submit();
});

it('exchanges the player with the prince', async () => {
	await waitUntil(async () => {
		const players = await board.getPlayers();
		const text = await players[2].text();
		return text === '王子';
	});
});

it('exits the room', async () => {
	await room.exit();
});
