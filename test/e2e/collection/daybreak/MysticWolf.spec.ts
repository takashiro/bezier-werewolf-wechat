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
		Role.Prince,
		Role.Werewolf,
		Role.Hunter,
		Role.MysticWolf,
	]);
});

it('takes Seat 4', async () => {
	await room.takeSeat(4);
});

it('opens a game board', async () => {
	board = await room.getBoard();
	await board.start();
	await board.ready();
});

it('is a mystic wolf', async () => {
	await board.waitForPlayer(4, '狼先知');
});

it('meets other werewolves', async () => {
	await board.waitForButton('碰面');
	await board.submit();
	await board.waitForPlayer(2, '狼人');
});

it('waits for forcasting button', async () => {
	await board.waitForButton('预知未来');
});

it('chooses player 1', async () => {
	const players = await board.getPlayers();
	expect(players.length).toBe(4);
	const [target] = players;
	await target.tap();
	await board.submit();
});

it('sees the prince', async () => {
	await board.waitForPlayer(1, '王子');
});

it('simulates other players', async () => {
	const prince = room.createPlayer(1);
	await prince.takeSeat();
	await prince.invokeSkill();

	const wolf = room.createPlayer(2);
	await wolf.takeSeat();
	await wolf.invokeSkill();

	const hunter = room.createPlayer(3);
	await hunter.takeSeat();
	await hunter.invokeSkill();

	await prince.vote(2);
	await wolf.vote(2);
	await hunter.vote(2);
}, 60000);

it('enters day phase', async () => {
	await board.waitForButton('进入白天');
	await board.submit();
});

it('waits for vote button', async () => {
	await board.waitForButton('投票');
});

it('votes for player 1', async () => {
	const target = await board.getPlayer(1);
	expect(await target.text()).toBe('王子');
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
