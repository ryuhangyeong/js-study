const Schema = require('validate');
const { getLanguages } = require('./utils');

module.exports = {
	translateSchema: () => {
		return new Schema({
			text: {
				type: String,
				required: true
			},
			source: {
				type: String,
				required: true,
				length: 2,
				enum: getLanguages()
			},
			target: {
				type: String,
				required: true,
				length: 2,
				enum: getLanguages()
			}
		});
	}
}