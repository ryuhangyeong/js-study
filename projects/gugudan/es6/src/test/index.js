import 'qunit/qunit/qunit.css';
import 'script-loader!qunit/qunit/qunit.js';
import $ from 'jquery';
import '../js/index';
import { template } from '../js/module/index';

QUnit.module('구구단', {
	beforeEach() {
		this.$template = $('#template');
		this.$input = $('input[name=dan]');
		this.$form = $('form');
		this.max = 10;
	}
});

QUnit.test('reset', assert => {
	const { $template, $input } = assert.test.testEnvironment;
	const temp = template(2);
	$template.html(temp);

	assert.ok($template.html() == temp, '2단을 출력합니다.');
	$('button[type=reset]').trigger('click');
	assert.ok($template.html() == '' && $input.is(':focus'), 'reset 버튼이 정상 작동되었습니다.');
});

QUnit.test('validate', assert => {
	const { $input, $template } = assert.test.testEnvironment;

	// 출력 가능한 단수
	validateUnitTest(assert, [2, 3, 4, 5, 6, 7, 8, 9], dan => {
		assert.ok($template.html() == template(dan), '출력 가능 단수 정상 출력');
	});

	// 출력할 수 없는 단수
	validateUnitTest(assert, [1, 10], () => {
		assert.ok($template.html() == '', '출력할 수 없는 단수 출력하지 않음');
	});
});

QUnit.test('template', assert => {
	/*
	 * @params {object}
	 * @params {string}
	 * @return {void}
	 */
	templateUnitTest(assert, (state, message) => {
		assert.ok((state.i == state.dan) && (state.j == state.idx) && (state.result == state.resultTxt), message);
	});
});

/*
 * @description [template] 테스트 단위
 * @params {QUnit}
 * @params {callback}
 * @return {void}
 */
const templateUnitTest = (assert, callback) => {
	let i, j, temp, dan, idx, result, resultTxt, $li;

	const { max, $template } = assert.test.testEnvironment;

	for ( i = 2; i < max; i++ ) {
		$template.html(template(i));

		for ( j = 1; j < max; j++ ) {
			result = i * j;
			$li = $template.find('li:eq(' + (j - 1) + ')');
			dan = $li.find('.danTxt').text();
			idx = $li.find('.idxTxt').text();
			resultTxt = $li.find('.resultTxt').text();
			callback({
				i, j,
				dan,
				idx,
				result,
				resultTxt
			}, '정상적인 결과값');
		}
	}
};

/*
 * @description [validate] 테스트 단위
 * @params {QUnit}
 * @params {array}
 * @params {function}
 * @return {void}
 */
const validateUnitTest = (assert, arr, callback) => {
	const { $form, $input } = assert.test.testEnvironment;

	arr.forEach(dan => {
		$input.val(dan);
		$form.trigger('submit');
		callback(dan);
	});
};