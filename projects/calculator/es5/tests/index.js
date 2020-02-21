QUnit.module('계산기', {
	beforeEach: function () {
		this.$form = $('form');
		this.$inputNum1 = $('input[name=num1]');
		this.$inputNum2 = $('input[name=num2]');
		this.$arithmetic = $('select[id=arithmetic]');
		this.$result = $('h2[id=result]');
		this.num1 = 1;
		this.num2 = 2;
	}
});

QUnit.test('focus', function (assert) {
	assert.ok(!this.$inputNum1.is(':focus'), 'focus 함수 실행 전');
	$.focus('inputNum1');
	assert.ok(this.$inputNum1.is(':focus'), 'focus 함수 실행 후');
});

QUnit.test('checkNumberType', function (assert) {
	assert.ok($.checkNumberType(this.num1, this.num2) == true, '정상');
	assert.ok($.checkNumberType(this.num1, '') == false, '비 정상');
	assert.ok($.checkNumberType('', this.num2) == false, '비 정상');
});

QUnit.test('submit', function (assert) {
	submitUnitTest.call(this, assert, '+');
	submitUnitTest.call(this, assert, '-');
	submitUnitTest.call(this, assert, '*');
	submitUnitTest.call(this, assert, '/');
});

QUnit.test('execute', function (assert) {
	assert.ok($.execute(this.num1, '+', this.num2) == 3, '정상 연산');
	assert.ok($.execute(this.num1, '-', this.num2) == -1, '정상 연산');
	assert.ok($.execute(this.num1, '*', this.num2) == 2, '정상 연산');
	assert.ok($.execute(this.num1, '/', this.num2) == 0.5, '정상 연산');
	assert.ok($.execute(this.num1, '', this.num2) == false, '비 정상 연산');
	assert.ok($.execute(this.num1, -1, this.num2) == false, '비 정상 연산');
});

/*
 * @params {Qunit}
 * @params {string}
 * @params {void}
 */
function submitUnitTest(assert, arithmetic) {
	this.$inputNum1.val(this.num1);
	this.$arithmetic.val(arithmetic);
	this.$inputNum2.val(this.num2);
	this.$form.trigger('submit');
	assert.ok(this.$result.html() == $.execute(this.num1, arithmetic, this.num2), '정상 연산');
	assert.ok(this.$inputNum1.is(':focus'), '정상 연산 후 focus');
}