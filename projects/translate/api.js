require('dotenv').config();

const request = require('request');
const { API_URL, CLIENT_ID, CLIENT_SECRET } = process.env;

module.exports = {
	getTranlateResult: ({ text, source, target }) => {
		return new Promise((resolve, reject) => {
			request.post({
				url: API_URL,
				form: { text, source, target },
				headers: { 'X-Naver-Client-Id': CLIENT_ID, 'X-Naver-Client-Secret': CLIENT_SECRET }
			}, (err, res, data) => {
				if (!err && res.statusCode === 200) resolve(data);
				else reject(data);
			});
		});
	}
}