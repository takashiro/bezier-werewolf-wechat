type Condition = () => boolean | Promise<boolean>;

const defaultTimeout = process.env.CI ? 30000 : 5000;

export default function waitUntil(condition: Condition, timeout = defaultTimeout, frequency = 200): Promise<void> {
	return new Promise((resolve, reject) => {
		let timer: NodeJS.Timeout;
		const checker = setInterval(async () => {
			let success = false;
			try {
				success = await condition();
			} catch (error) {
				// Ignore
			}
			if (success) {
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
