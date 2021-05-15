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

describe('Sees two villagers', () => {
	it('returns to lobby', async () => {
		await lobby.prepare();
	}, 60000);

	it('enters the room', async () => {
		room = await lobby.createRoom([
			Role.Villager,
			Role.Villager,
			Role.Villager,
			Role.ParanormalInvestigator,
			Role.Prince,
			Role.Hunter,
			Role.Werewolf,
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

	it('is a paranormal investigator', async () => {
		await board.waitForPlayer(1, '超自然研究员');
	});

	it('investigates a prince', async () => {
		await board.waitForButton('探索领域');
		await board.tapPlayer(2);
		await board.submit();
		await board.waitForPlayer(2, '王子');
	});

	it('investigates a hunter', async () => {
		await board.waitForButton('探索领域');
		await board.tapPlayer(3);
		await board.submit();
		await board.waitForPlayer(3, '猎人');
	});

	it('simulates other players', async () => {
		const prince = room.createPlayer(2);
		await prince.takeSeat();
		await prince.invokeSkill();

		const hunter = room.createPlayer(3);
		await hunter.takeSeat();
		await hunter.invokeSkill();

		const wolf = room.createPlayer(4);
		await wolf.takeSeat();
		await wolf.invokeSkill();

		await prince.vote(4);
		await hunter.vote(1);
		await wolf.vote(1);
	}, 60000);

	it('enters day phase', async () => {
		await board.waitForButton('进入白天');
		await board.submit();
	});

	it('waits for vote button', async () => {
		await board.waitForButton('投票');
	});

	it('votes for player 4', async () => {
		const target = await board.getPlayer(4);
		expect(await target.text()).toBe('未知');
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
});
