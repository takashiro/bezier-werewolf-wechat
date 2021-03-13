import http from 'http';

export default function checkHttp(link: string, statusCode: number): Promise<boolean> {
	return new Promise((resolve) => {
		http.get(link, (res) => {
			resolve(res.statusCode === statusCode);
		});
	});
}
