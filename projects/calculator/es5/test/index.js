QUnit.module('Calculator', {
	beforeEach: function () {
		this.calculator = new $.Calculator();
		this.calculator.setElement();
		this.num1 = 1;
		this.num2 = 2;
	}
});

QUnit.test('setInputFocus', function (assert) {
	assert.ok(!this.calculator.$inputNum1.is(':focus'), 'setInputFocus 함수 실행 전');
	this.calculator.setInputFocus();
	assert.ok(this.calculator.$inputNum1.is(':focus'), 'setInputFocus 함수 실행 후');
});

QUnit.test('addSubmitEvent - form', function (assert) {
	this.calculator.addSubmitEvent();

	addSubmitEventFormUnitTest.call(this.calculator, assert, '+');
	addSubmitEventFormUnitTest.call(this.calculator, assert, '-');
	addSubmitEventFormUnitTest.call(this.calculator, assert, '*');
	addSubmitEventFormUnitTest.call(this.calculator, assert, '/');
});

QUnit.test('isNumberType', function (assert) {
	assert.ok(this.calculator.isNumberType(this.num1, this.num2) === true, '정상');
	assert.ok(this.calculator.isNumberType(this.num1, '') === false, '비 정상');
	assert.ok(this.calculator.isNumberType('', this.num2) === false, '비 정상');
});

QUnit.test('executeNumber', function (assert) {
	assert.ok(this.calculator.executeNumber(this.num1, '+', this.num2) == 3, '정상 연산');
	assert.ok(this.calculator.executeNumber(this.num1, '-', this.num2) == -1, '정상 연산');
	assert.ok(this.calculator.executeNumber(this.num1, '*', this.num2) == 2, '정상 연산');
	assert.ok(this.calculator.executeNumber(this.num1, '/', this.num2) == 0.5, '정상 연산');
	assert.ok(this.calculator.executeNumber(this.num1, '', this.num2) == false, '비 정상 연산');
	assert.ok(this.calculator.executeNumber(this.num1, -1, this.num2) == false, '비 정상 연산');
});

function addSubmitEventFormUnitTest(assert, arithmetic) {
	var calculator = this,
		testEnvironment = assert.test.testEnvironment,
		num1 = testEnvironment.num1,
		num2 = testEnvironment.num2;

	calculator.$inputNum1.val(num1);
	calculator.$arithmetic.val(arithmetic);
	calculator.$inputNum2.val(num2);
	calculator.$form.trigger('submit');
	assert.ok(calculator.$result.html() == calculator.executeNumber(num1, arithmetic, num2), '정상 연산');
}