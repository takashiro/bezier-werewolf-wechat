type Condition = () => boolean | Promise<boolean>;

export default function waitUntil(condition: Condition, timeout = 30 * 1000, frequency = 200): Promise<void> {
	return new Promise((resolve, reject) => {
		let timer: NodeJS.Timeout;
		const checker = setInterval(async () => {
			if (await condition()) {
				clearInterval(checker);
				if (timer) {
					clearTimeout(timer);
				}
				resolve();
			}
		}, frequency);
		timer = setTimeout(() => {
			clearInterval(checker);
			reject(new Error(`Time limit exceeded: ${timeout}ms`));
		}, timeout);
	});
}
