import Element from 'miniprogram-automator/out/Element';

export default class BoardObject {
	protected element: Element;

	constructor(element: Element) {
		this.element = element;
	}

	async tap(): Promise<void> {
		const icon = await this.getIcon();
		const role = await icon.$('.role');
		await role.tap();
	}

	async text(): Promise<string> {
		const icon = await this.getIcon();
		const text = await icon.$('text');
		return text.text();
	}

	async isSelected(): Promise<boolean> {
		const icon = await this.getIcon();
		const selected = await icon.$('.role.selected');
		return Boolean(selected);
	}

	getIcon(): Promise<Element> {
		return this.element.$('roleicon');
	}
}
