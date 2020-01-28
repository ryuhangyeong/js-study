import 'qunit/qunit/qunit.css';
import 'script-loader!qunit/qunit/qunit.js';
import { countingView } from '../utils';

QUnit.module('Count', {
	beforeEach() {
		this.str = '1234567';
		this.$include = $('#include');
		this.$except = $('#except');
	}
});

QUnit.test('countingView', (assert) => {
	let done = assert.async();

	setTimeout(() => {
		let str = '';
		countingViewUnitTest(assert, str, '입력(공백)값이 없는 경우', false);

		str = '1234567';
		countingViewUnitTest(assert, str, '입력값에 공백이 없는 경우', false);

		str = '  1234567  ';
		countingViewUnitTest(assert, str, '입력값 양쪽에 공백이 있는 경우', true);

		str = '1 2 3 4 5 6 7';		
		countingViewUnitTest(assert, str, '입력값 사이에 공백이 있는 경우', true);

		str = '  123 4 5 6 7    ';
		countingViewUnitTest(assert, str, '입력값 양쪽과 사이에 공백이 있는 경우', true);

		done();
	}, 0);
});

/*
 * @description 테스트 단위
 * @params {Qunit object}
 * @params {string}
 * @params {string}
 * @params {boolean}
 * @return {void}
 */
const countingViewUnitTest = (assert, input, message, if_blanks) => {
	const { $except, str } = assert.test.testEnvironment;

	countingView(input);
	assert.ok($except.text() == (if_blanks ? str.length : input.length), message);
	
}