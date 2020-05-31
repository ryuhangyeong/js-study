const expect = require('chai').expect;
const { getLanguages, getQueryString } = require('../utils');

describe('#Utils', () => {
    it('getLanguages', () => {
        expect(getLanguages()).to.eql(['ko', 'ja', 'zh-cn', 'zh-tw', 'hi', 'en', 'es', 'fr', 'de', 'pt', 'vi', 'id', 'fa', 'ar', 'mm', 'th', 'ru', 'it']);
    });

    it('getQueryString', () => {
		expect(getQueryString({ text: 'hello', source: 'ko', target: 'en' }) === '?text=hello&source=ko&target=en');
	});
});