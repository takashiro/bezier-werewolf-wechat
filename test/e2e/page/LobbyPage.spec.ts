import { lobby } from '../Lobby';

beforeAll(async () => {
	await lobby.connect();
}, 60000);

afterAll(async () => {
	await lobby.disconnect();
});

it('opens home page', async () => {
	await lobby.prepare();
}, 60000);

it('renders create button', async () => {
	const page = await lobby.getCurrentPage();
	const creator = await page.$('.creator');
	const button = await creator.$('button');
	expect(await button.text()).toBe('创建房间');
});

it('renders entrance', async () => {
	const page = await lobby.getCurrentPage();
	const entrance = await page.$('.entrance');
	const input = await entrance.$('input');
	expect(await input.property('placeholder')).toBe('房间号');
	expect(await input.value()).toBe('');
	const button = await entrance.$('button');
	expect(await button.text()).toBe('进入房间');
});
