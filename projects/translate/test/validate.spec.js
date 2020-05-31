const expect = require('chai').expect;
const { translateSchema } = require('../validation');
const { defaultQuery, SUCCESS, FAILURE } = require('./utils');

describe('#Validation', () => {
    describe('translateSchema', () => {
    	beforeEach(() => { this.query = Object.assign({}, defaultQuery); });
    	afterEach(() => { this.query = Object.assign({}, defaultQuery); });

        it('입력 값이 비어있는 경우', () => {
        	delete this.query.text;
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(FAILURE);
        });

        it('기준 값이 비어있는 경우', () => {
        	delete this.query.source;
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(FAILURE); 
        });

        it('대상 값이 비어있는 경우', () => {
        	delete this.query.target;
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(FAILURE); 
        });

        it('유효하지 않은 기준 값이 있는 경우', () => {
        	this.query.source = 'not';
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(FAILURE); 
        });

        it('유효하지 않은 대상 값이 있는 경우', () => {
        	this.query.target = 'not';
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(FAILURE); 
        });

        it('모든 값이 정상 값', () => {
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(SUCCESS); 
        });

        it('모든 값이 정상 값이고 유효한 기준 값으로 변경한 경우', () => {
        	this.query.source = 'ja';
        	const valid = translateSchema().validate(this.query);
        	expect(valid.length).to.equal(SUCCESS); 
        });
    });
});