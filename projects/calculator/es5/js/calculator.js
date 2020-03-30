$(function () {
	function Calculator() {}

	Calculator.prototype.init = function () {
		this.setElement();
		this.setInputFocus();
		this.addSubmitEvent();
	}

	Calculator.prototype.setElement = function () {
		this.$inputNum1 = $('input[name=num1]');
		this.$inputNum2 = $('input[name=num2]');
		this.$arithmetic = $('select[id=arithmetic]');
		this.$result = $('h2[id=result]');
		this.$form = $('form');
	}

	Calculator.prototype.setInputFocus = function () {
		this.$inputNum1.focus();
	}

	Calculator.prototype.addSubmitEvent = function () {
		$('body')
			.on('submit', 'form', (function (e) { 
				e.preventDefault();

				var num1 = this.$inputNum1.val(),
					num2 = this.$inputNum2.val(),
					arithmetic = this.$arithmetic.val();

				this.$result.html(this.executeNumber(num1, arithmetic, num2));
				this.setInputFocus();
			}).bind(this));
	}

	Calculator.prototype.executeNumber = function (num1, arithmetic, num2) {
		var result;

		if ( !this.isNumberType(num1, num2) ) return false; 

		switch(arithmetic) {
			case '+':
				result = parseInt(num1) + parseInt(num2);
				break;
			case '-':
				result = num1 - num2;
				break;
			case '*':
				result = num1 * num2;
				break;
			case '/':
				result = num1 / num2;
				break;
			default:
				result = false;
		}

		return result;
	}

	Calculator.prototype.isNumberType = function (num1, num2) {
		var num1 = parseInt(num1),
			num2 = parseInt(num2);

		if ( isNaN(num1) || isNaN(num2) ) {
			return false;
		}

		return true;
	}

	$.Calculator = Calculator;
});