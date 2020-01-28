QUnit.module('Count', {
	beforeEach: function () {
		this.str = '1234567';
		this.$except = $('#except');
	}
});

QUnit.test('countingView', function (assert) {
	var str;

	str = '';
	countingViewUnitTest.call(assert, str, '입력(공백)값이 없는 경우', false);

	str = '1234567';
	countingViewUnitTest.call(assert, str, '입력값에 공백이 없는 경우', false);

	str = '  1234567  ';
	countingViewUnitTest.call(assert, str, '입력값 양쪽에 공백이 있는 경우', true);

	str = '1 2 3 4 5 6 7';		
	countingViewUnitTest.call(assert, str, '입력값 사이에 공백이 있는 경우', true);

	str = '  123 4 5 6 7    ';
	countingViewUnitTest.call(assert, str, '입력값 양쪽과 사이에 공백이 있는 경우', true);
});

/*
 * @description 테스트 단위
 * @params {string}
 * @params {string}
 * @params {boolean}
 * @return {void}
 */
function countingViewUnitTest(str, message, if_blanks) {
	var self = this,
		env = self.test.testEnvironment;

	$.countingView(str);
	self.ok(env.$except.text() == (if_blanks ? env.str.length : str.length), message);
}