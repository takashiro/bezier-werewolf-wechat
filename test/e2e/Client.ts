import bent from 'bent';

export default class Client {
	protected baseUrl: string;

	protected bentPost: bent.RequestFunction<unknown>;

	protected bentPostJson: bent.RequestFunction<unknown>;

	protected bentGet: bent.RequestFunction<unknown>;

	protected bentGetJson: bent.RequestFunction<unknown>;

	protected bentDelete: bent.RequestFunction<unknown>;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
		this.bentPost = bent('POST', this.baseUrl);
		this.bentPostJson = bent('json', 'POST', this.baseUrl);
		this.bentGet = bent('GET', this.baseUrl);
		this.bentGetJson = bent('json', 'GET', this.baseUrl);
		this.bentDelete = bent('DELETE', this.baseUrl);
	}

	async post(url: string, data?: unknown): Promise<void> {
		await this.bentPost(url, data);
	}

	async postJson(url: string, data?: unknown): Promise<unknown> {
		const json = await this.bentPostJson(url, data);
		return json;
	}

	async get(url: string): Promise<void> {
		await this.bentGet(url);
	}

	async getJson(url: string): Promise<unknown> {
		const json = await this.bentGetJson(url);
		return json;
	}

	async delete(url: string): Promise<void> {
		await this.bentDelete(url);
	}
}

export const client = new Client('https://onuw.takashiro.cn/api');
