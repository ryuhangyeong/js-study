const request = require('request');
const expect = require('chai').expect;
const { getQueryString } = require('../utils');
const { defaultQuery, TRANSLATED_TEXT } = require('./utils');
const { ADDRESS } = process.env;

describe('#Request', () => {
	describe('translate', () => {
		beforeEach(() => { this.query = Object.assign({}, defaultQuery); });
    	afterEach(() => { this.query = Object.assign({}, defaultQuery); });

		it('정상 호출', done => {
	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).message.result.translatedText).to.equal(TRANSLATED_TEXT);
	        	expect(res.statusCode).to.equal(200);
	            done();
	        });
	    });

	    it('text가 비어있는 경우', done => {
	    	delete this.query.text;

	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).error).to.equal('text is required.');
	        	expect(res.statusCode).to.equal(400);
	            done();
	        });
	    });

	    it('source가 비어있는 경우', done => {
	    	delete this.query.source;

	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).error).to.equal('source is required.');
	        	expect(res.statusCode).to.equal(400);
	            done();
	        });
	    });

	    it('target가 비어있는 경우', done => {
	    	delete this.query.target;

	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).error).to.equal('target is required.');
	        	expect(res.statusCode).to.equal(400);
	            done();
	        });
	    });

	    it('유효하지 않은 긴 기준 값이 있는 경우', done => {
        	this.query.source = 'not';

	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).error).to.equal('source must have a length of 2.');
	        	expect(res.statusCode).to.equal(400);
	            done();
	        });
        });

        it('유효하지 않은 기준 값이 있는 경우', done => {
        	this.query.source = 'co';

	        request.get(ADDRESS + getQueryString(this.query), (err, res, data) => {
	        	expect(JSON.parse(data).error).to.equal('source must be either ko, ja, zh-cn, zh-tw, hi, en, es, fr, de, pt, vi, id, fa, ar, mm, th, ru or it.');
	        	expect(res.statusCode).to.equal(400);
	            done();
	        });
        });
	});
})