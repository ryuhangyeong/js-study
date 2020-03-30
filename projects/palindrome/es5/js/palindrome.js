$(function () {
	function Palindrome() {}

	Palindrome.prototype.init = function () {
		this.setElement();
		this.setInputFocus();
		this.addSubmitEvent();
	}

	Palindrome.prototype.setElement = function () {
		this.$inputNum = $('input[name=num]');
		this.$result = $('h2[id=result]');
		this.$form = $('form');
	}

	Palindrome.prototype.setInputFocus = function () {
		this.$inputNum.focus();
	}

	Palindrome.prototype.addSubmitEvent = function () {
		$('body')
			.on('submit', 'form', (function (e) { 
				e.preventDefault();
				this.loadPalindromeTemplate(this.isPalindrome(this.$inputNum.val()));
			}).bind(this));
	}

	Palindrome.prototype.isPalindrome = function (str) {
		return str === str.split('').reverse().join('');
	}

	Palindrome.prototype.loadPalindromeTemplate = function (is) {
		this.$result.html(is ? '회문입니다!' : '회문이 아닙니다!');
	}

	$.Palindrome = Palindrome;
});