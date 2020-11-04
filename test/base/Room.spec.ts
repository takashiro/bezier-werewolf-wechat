import wx from '../wx';
import Room from '../../base/Room';

const {
	request,
	getStorage,
	setStorage,
} = wx;

describe('Fetch room configuration', () => {
	const room = new Room(8);

	it('rejects API failure', async () => {
		const error = { errMsg: 'API failure' };
		request.mockImplementation((options: WechatMiniprogram.RequestOption) => {
			options.fail?.call(null, error);
		});

		expect.assertions(1);
		try {
			await room.fetchConfig();
		} catch (e) {
			expect(e).toBe(error);
		}
	});

	it('resolves status code', async () => {
		request.mockImplementation((options: WechatMiniprogram.RequestOption) => {
			options.success?.call(null, {
				errMsg: '',
				statusCode: 404,
			});
		});
		expect(await room.fetchConfig()).toBe(404);
	});

	it('saves configuration', async () => {
		const config = { salt: '3456' };
		request.mockImplementation((options: WechatMiniprogram.RequestOption) => {
			options.success?.call(null, {
				statusCode: 200,
				data: config,
			});
		});
		expect(await room.fetchConfig()).toBe(200);
		expect(room.getConfig()).toBe(config);
	});
});

describe('Read room configuration', () => {
	const room = new Room(10);
	const config = {
		salt: 'tyui',
	};

	it('reads and saves configuration', async () => {
		getStorage.mockImplementation((options: WechatMiniprogram.GetStorageOption) => {
			expect(options.key).toBe('room-10');
			options.success({
				errMsg: '',
				data: config,
			});
		});
		await room.readConfig();
		expect(room.getConfig()).toBe(config);
	});

	it('returns existing configuration', async () => {
		const error = { errMsg: 'unknown' };
		getStorage.mockImplementation((options: WechatMiniprogram.GetStorageOption) => {
			options.fail(error);
		});
		expect(await room.readConfig()).toBe(config);
	});

	it('rejects API error', async () => {
		const error = { errMsg: 'unknown' };
		getStorage.mockImplementation((options: WechatMiniprogram.GetStorageOption) => {
			options.fail(error);
		});
		expect.assertions(1);
		room.setConfig(undefined);
		try {
			await room.readConfig();
		} catch (e) {
			expect(e).toBe(error);
		}
	});
});

describe('Write room configuration', () => {
	const room = new Room(12);
	const config = {
		id: 12,
		salt: 'ui87',
		playerNum: 1,
		roles: [1],
	};

	it('rejects an error if config is undefined', async () => {
		expect.assertions(1);
		try {
			await room.saveConfig();
		} catch (error) {
			expect(error.message).toBe('Configuration does not exist. Fetch it first.');
		}
	});

	it('rejects API error', async () => {
		const error = { errMsg: 'unknown' };
		setStorage.mockImplementation((options: WechatMiniprogram.GetStorageOption) => {
			options.fail(error);
		});
		expect.assertions(1);
		room.setConfig(config);
		try {
			await room.saveConfig();
		} catch (e) {
			expect(e).toBe(error);
		}
	});

	it('saves configuration', async () => {
		setStorage.mockClear();
		setStorage.mockImplementation((options: WechatMiniprogram.GetStorageOption) => {
			options.success(null);
		});
		await room.saveConfig();
		expect(setStorage).toBeCalledTimes(1);
	});
});
