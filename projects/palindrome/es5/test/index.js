QUnit.module('Palindrome', {
	beforeEach: function () {
		this.palindrome = new $.Palindrome();
		this.palindrome.setElement();
		this.successMessage = '회문입니다!';
		this.failureMessage = '회문이 아닙니다!';
	}
});

QUnit.test('setInputFocus', function (assert) {
	assert.ok(!this.palindrome.$inputNum.is(':focus'), 'setInputFocus 함수 실행 전');
	this.palindrome.setInputFocus();
	assert.ok(this.palindrome.$inputNum.is(':focus'), 'setInputFocus 함수 실행 후');
});

QUnit.test('addSubmitEvent', function (assert) {
	this.palindrome.addSubmitEvent();

	var str = 'hello';
	this.palindrome.$inputNum.val(str);
	this.palindrome.$form.trigger('submit');
	assert.ok(this.palindrome.$result.html() === this.failureMessage, this.failureMessage);

	str = '12345';
	this.palindrome.$inputNum.val(str);
	this.palindrome.$form.trigger('submit');
	assert.ok(this.palindrome.$result.html() === this.failureMessage, this.failureMessage);

	str = 'eye';
	this.palindrome.$inputNum.val(str);
	this.palindrome.$form.trigger('submit');
	assert.ok(this.palindrome.$result.html() === this.successMessage, this.successMessage);

	str = 'noon';
	this.palindrome.$inputNum.val(str);
	this.palindrome.$form.trigger('submit');
	assert.ok(this.palindrome.$result.html() === this.successMessage, this.successMessage);

	str = 'dad';
	this.palindrome.$inputNum.val(str);
	this.palindrome.$form.trigger('submit');
	assert.ok(this.palindrome.$result.html() === this.successMessage, this.successMessage);
});

QUnit.test('isPalindrome', function (assert) {
	var str = 'hello';
	assert.ok(!this.palindrome.isPalindrome(str), this.failureMessage);

	str = '12345';
	assert.ok(!this.palindrome.isPalindrome(str), this.failureMessage);

	str = 'eye';
	assert.ok(this.palindrome.isPalindrome(str), this.successMessage);

	str = 'noon';
	assert.ok(this.palindrome.isPalindrome(str), this.successMessage);

	str = 'dad';
	assert.ok(this.palindrome.isPalindrome(str), this.successMessage);
});

QUnit.test('loadPalindromeTemplate', function (assert) {
	this.palindrome.loadPalindromeTemplate(true);
	assert.ok(this.palindrome.$result.html() === this.successMessage, this.successMessage);

	this.palindrome.loadPalindromeTemplate(false);
	assert.ok(this.palindrome.$result.html() === this.failureMessage, this.failureMessage);
});
