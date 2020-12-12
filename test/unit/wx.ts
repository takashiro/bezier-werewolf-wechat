const wxMock = {
	request: jest.fn(),
	getStorage: jest.fn(),
	setStorage: jest.fn(),
};

Reflect.set(global, 'wx', wxMock);

export default wxMock;
