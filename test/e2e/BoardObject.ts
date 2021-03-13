import Element from 'miniprogram-automator/out/Element';

export default class BoardObject {
	protected element: Element;

	constructor(element: Element) {
		this.element = element;
	}

	async tap(): Promise<void> {
		const icon = await this.element.$('roleicon');
		const role = await icon.$('.role');
		await role.tap();
	}

	async text(): Promise<string> {
		const icon = await this.element.$('roleicon');
		const text = await icon.$('text');
		return text.text();
	}
}
