import automator from 'miniprogram-automator';
import MiniProgram from 'miniprogram-automator/out/MiniProgram';
import checkHttp from '../util/checkHttp';
import waitUntil from '../util/waitUntil';

let program: MiniProgram;

beforeAll(async () => {
	await waitUntil(() => checkHttp('http://127.0.0.1:8888', 426), 60 * 1000, 5000);
	program = await automator.connect({
		wsEndpoint: 'ws://127.0.0.1:8888',
	});
}, 60 * 1000);

afterAll(() => {
	if (program) {
		program.disconnect();
	}
});

it('opens home page', async () => {
	const page = await program.currentPage();
	expect(page.path).toBe('gui/index');
});

it('waits for rendering', async () => {
	const page = await program.currentPage();
	await page.waitFor('.creator');
	await page.waitFor('.entrance');
});

it('renders create button', async () => {
	const page = await program.currentPage();
	const creator = await page.$('.creator');
	const button = await creator.$('button');
	expect(await button.text()).toBe('创建房间');
});

it('renders entrance', async () => {
	const page = await program.currentPage();
	const entrance = await page.$('.entrance');
	const input = await entrance.$('input');
	expect(await input.property('placeholder')).toBe('房间号');
	expect(await input.value()).toBe('');
	const button = await entrance.$('button');
	expect(await button.text()).toBe('进入房间');
});
