$(function () {
	function CountingLetter() {}

	CountingLetter.prototype.init = function () {
		this.setElement();
		this.setInputFocus();
		this.addKeyupEvent();
	}

	CountingLetter.prototype.setElement = function () {
		this.$input = $('#input');
		this.$include = $('#include');
		this.$except = $('#except');
	}

	CountingLetter.prototype.setInputFocus = function () {
		this.$input.focus();
	}

	CountingLetter.prototype.addKeyupEvent = function () {
		$('body')
			.on('keyup', '#input', (function (e) {
				this.loadCountingTemplate(e.target.value);
			}).bind(this))
	}

	CountingLetter.prototype.loadCountingTemplate = function (str) {
		var len = str.length;
		this.$include.text(len);
		this.$except.text(len - this.getCountingNumberOfBlanks(str));
	}

	CountingLetter.prototype.getCountingNumberOfBlanks = function (str) {
		return str.split('').filter(function (el) { return el === ' '; }).length;
	}

	$.CountingLetter = CountingLetter;
});