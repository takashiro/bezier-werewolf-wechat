import { Role } from '@bezier/werewolf-core';

import GameBoard from '../../GameBoard';
import { lobby } from '../../Lobby';
import Room from '../../Room';
import ServerPlayer from '../../ServerPlayer';

let room: Room;
let board: GameBoard;
let troublemaker: ServerPlayer;
let hunter: ServerPlayer;
let prince: ServerPlayer;

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
		Role.Doppelganger,
		Role.Hunter,
		Role.Prince,
	]);
});

it('takes Seat 2', async () => {
	await room.takeSeat(2);
});

it('opens a game board', async () => {
	board = await room.getBoard();
	troublemaker = room.createPlayer(1);
	hunter = room.createPlayer(3);
	prince = room.createPlayer(4);
});

it('is a Doppelganger', async () => {
	await board.start();
	await board.ready();
	await board.waitForPlayer(2, '二重身');
});

it('chooses Player 1', async () => {
	await board.waitForButton('复制');
	await board.tapPlayer(1);
	await board.submit();
});

it('sees a Troublemaker', async () => {
	await board.waitForPlayer(1, '捣蛋鬼');
});

it('simulates other players', async () => {
	await hunter.takeSeat();
	await hunter.invokeSkill();

	await prince.takeSeat();
	await prince.invokeSkill();

	await troublemaker.takeSeat();
	await troublemaker.invokeSkill(0, { players: [2, 3] });
}, 60000);

it('exchanges Player 3 and Player 4', async () => {
	await board.waitForButton('交换身份');
	await board.tapPlayer(3);
	await board.tapPlayer(4);
	await board.submit();
});

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

	await troublemaker.vote(1);
	await hunter.vote(1);
	await prince.vote(1);
});

it('views vote results', async () => {
	await board.waitForButton('投票结果');
	await board.submit();
	await board.waitForVoteResult();
});

it('verifies skill effects', async () => {
	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('捣蛋鬼');
	expect(await players[1].text()).toBe('猎人');
	expect(await players[2].text()).toBe('王子');
	expect(await players[3].text()).toBe('捣蛋鬼');
});

it('exits the room', async () => {
	await room.exit();
});
