QUnit.module('CountingLetter', {
	beforeEach: function () {
		this.countingLetter = new $.CountingLetter(); 
		this.countingLetter.setElement();
		this.str = '1234567';
	}
});

QUnit.test('setInputFocus', function (assert) {
	assert.ok(!this.countingLetter.$input.is(':focus'), 'focus 비 활성화');
	this.countingLetter.setInputFocus();
	assert.ok(this.countingLetter.$input.is(':focus'), 'focus 활성화');
});

QUnit.test('addKeyupEvent - #input', function (assert) {
	var str;
	this.countingLetter.addKeyupEvent();

	str = '';
	this.countingLetter.$input.val(str);
	this.countingLetter.$input.trigger('keyup');
	assert.ok(this.countingLetter.$include.text() == 0 && this.countingLetter.$except.text() == 0, '입력값이 없는 경우');

	str = this.str;
	this.countingLetter.$input.val(str);
	this.countingLetter.$input.trigger('keyup');
	assert.ok(this.countingLetter.$include.text() == 7 && this.countingLetter.$except.text() == 7, '입력값에 공백이 없는 경우');

	str = ' 1234567 ';
	this.countingLetter.$input.val(str);
	this.countingLetter.$input.trigger('keyup');
	assert.ok(this.countingLetter.$include.text() == 9 && this.countingLetter.$except.text() == 7, '입력값 양쪽에 공백이 있는 경우');

	str = '1 2 3 4 5 6 7';
	this.countingLetter.$input.val(str);
	this.countingLetter.$input.trigger('keyup');
	assert.ok(this.countingLetter.$include.text() == 13 && this.countingLetter.$except.text() == 7, '입력값 사이에 공백이 있는 경우');

	str = ' 1 2 3 4 5 6 7 ';
	this.countingLetter.$input.val(str);
	this.countingLetter.$input.trigger('keyup');
	assert.ok(this.countingLetter.$include.text() == 15 && this.countingLetter.$except.text() == 7, '입력값 양쪽과 사이에 공백이 있는 경우');
});

QUnit.test('getCountingNumberOfBlanks', function (assert) {
	var str;

	str = '';
	assert.ok(this.countingLetter.getCountingNumberOfBlanks(str) === 0, '입력값이 없는 경우');
	
	str = this.str;
	assert.ok(this.countingLetter.getCountingNumberOfBlanks(str) === 0, '입력값에 공백이 없는 경우');

	str = ' 1234567 ';
	assert.ok(this.countingLetter.getCountingNumberOfBlanks(str) === 2, '입력값 양쪽에 공백이 있는 경우');

	str = '1 2 3 4 5 6 7';
	assert.ok(this.countingLetter.getCountingNumberOfBlanks(str) === 6, '입력값 사이에 공백이 있는 경우');

	str = ' 1 2 3 4 5 6 7 ';
	assert.ok(this.countingLetter.getCountingNumberOfBlanks(str) === 8, '입력값 양쪽과 사이에 공백이 있는 경우');
});

QUnit.test('loadCountingTemplate', function (assert) {
	var str;

	str = '';
	this.countingLetter.loadCountingTemplate(str);
	assert.ok(this.countingLetter.$include.text() == 0 && this.countingLetter.$except.text() == 0, '입력값이 없는 경우');

	str = this.str;
	this.countingLetter.loadCountingTemplate(str);
	assert.ok(this.countingLetter.$include.text() == 7 && this.countingLetter.$except.text() == 7, '입력값에 공백이 없는 경우');

	str = ' 1234567 ';
	this.countingLetter.loadCountingTemplate(str);
	assert.ok(this.countingLetter.$include.text() == 9 && this.countingLetter.$except.text() == 7, '입력값 양쪽에 공백이 있는 경우');

	str = '1 2 3 4 5 6 7';
	this.countingLetter.loadCountingTemplate(str);
	assert.ok(this.countingLetter.$include.text() == 13 && this.countingLetter.$except.text() == 7, '입력값 사이에 공백이 있는 경우');

	str = ' 1 2 3 4 5 6 7 ';
	this.countingLetter.loadCountingTemplate(str);
	assert.ok(this.countingLetter.$include.text() == 15 && this.countingLetter.$except.text() == 7, '입력값 양쪽과 사이에 공백이 있는 경우');
});