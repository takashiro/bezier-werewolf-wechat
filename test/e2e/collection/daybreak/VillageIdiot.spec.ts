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

let tanner: ServerPlayer;
let hunter: ServerPlayer;
let prince: ServerPlayer;

it('returns to lobby', async () => {
	await lobby.prepare();
}, 60000);

it('enters the room', async () => {
	room = await lobby.createRoom([
		Role.Villager,
		Role.Villager,
		Role.Villager,
		Role.VillageIdiot,
		Role.Tanner,
		Role.Hunter,
		Role.Prince,
	]);

	tanner = room.createPlayer(2);
	hunter = room.createPlayer(3);
	prince = room.createPlayer(4);
});

it('takes Seat 1', async () => {
	await room.takeSeat(1);
});

it('opens a game board', async () => {
	board = await room.getBoard();
});

it('is a village idiot', async () => {
	await board.start();
	await board.ready();
	await board.waitForPlayer(1, '白痴');
});

it('cannot select distant targets', async () => {
	const target = await board.getPlayer(3);
	await target.tap();
	expect(await target.isSelected()).toBe(false);
});

it('can select nearby targets (left)', async () => {
	const left = await board.getPlayer(4);
	await left.tap();
	expect(await left.isSelected()).toBe(true);
});

it('can select nearby targets (right)', async () => {
	const right = await board.getPlayer(2);
	await right.tap();
	expect(await right.isSelected()).toBe(true);
});

it('can select himself', async () => {
	const self = await board.getPlayer(1);
	await self.tap();
	expect(await self.isSelected()).toBe(true);
});

it('simulate other players', async () => {
	await tanner.takeSeat();
	await hunter.takeSeat();
	await prince.takeSeat();

	await tanner.invokeSkill();
	await hunter.invokeSkill();
	await prince.invokeSkill();
});

it('shifts all roles to right', async () => {
	await board.tapPlayer(2);
	await board.submit();
});

it('waits for day button', async () => {
	await board.waitForButton('进入白天');
	await board.submit();
});

it('votes', async () => {
	await prince.vote(2);
	await hunter.vote(3);
	await tanner.vote(4);

	await board.waitForButton('投票');
	await board.tapPlayer(1);
	await board.submit();
});

it('views vote results', async () => {
	await board.waitForButton('投票结果');
	await board.submit();
});

it('verifies player roles', async () => {
	await board.waitForVoteResult();
	const players = await board.getPlayers();
	expect(await players[0].text()).toBe('白痴');
	expect(await players[1].text()).toBe('王子');
	expect(await players[2].text()).toBe('皮匠');
	expect(await players[3].text()).toBe('猎人');
});

it('exits the room', async () => {
	await room.exit();
});
