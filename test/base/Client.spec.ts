import wx from '../wx';
import { client } from '../../base/Client';

const rootUrl = 'https://onuw.takashiro.cn/api';
const { request } = wx;

afterEach(() => {
	request.mockClear();
});

it('sends a GET request', () => {
	client.get({
		url: 'room',
		data: {
			id: 1,
		},
	});
	expect(request).toBeCalledWith({
		method: 'GET',
		url: `${rootUrl}/room`,
		data: {
			id: 1,
		},
	});
});

it('sends a POST request', () => {
	client.post({
		url: 'room',
		data: {
			id: 1,
		},
	});
	expect(request).toBeCalledWith({
		method: 'POST',
		url: `${rootUrl}/room`,
		data: {
			id: 1,
		},
	});
});
