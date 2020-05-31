const fs = require('fs');

module.exports = {
	readFile: (url) => {
		return new Promise((resolve, reject) => {
			fs.readFile(url, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		});
	}
}