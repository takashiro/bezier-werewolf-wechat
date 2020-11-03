export default class Client {
	protected rootUrl = 'https://onuw.takashiro.cn/api';

	get(options: WechatMiniprogram.RequestOption): void {
		options.url = `${this.rootUrl}/${options.url}`;
		options.method = 'GET';
		wx.request(options);
	}

	post(options: WechatMiniprogram.RequestOption): void {
		options.url = `${this.rootUrl}/${options.url}`;
		options.method = 'POST';
		wx.request(options);
	}
}

export const client = new Client();
