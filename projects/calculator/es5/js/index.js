$(function () {
	focus('inputNum1');

	$('body')
		.on('submit', 'form', function (e) { 
			e.preventDefault();

			var num1 = element().$inputNum1().val(),
				num2 = element().$inputNum2().val(),
				arithmetic = element().$arithmetic().val();

			element().$result().html(execute(num1, arithmetic, num2));
			focus('inputNum1');
		});

	/*
	 * @memo
	 * @params {number}
	 * @params {string}
	 * @params {number}
	 * @return {number | boolean}
	 */
	function execute(num1, arithmetic, num2) {
		var result;

		if ( !checkNumberType(num1, num2) ) return false; 

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

	/*
	 * @params {string}
	 * @return {void}
	 */
	function focus(selector) {
		element()['$' + selector]().focus();
	}

	/*
	 * @memo '' 값은 isNaN 결과가 false이다. 정규식을 통한 확인과 isNaN을 통한 확인중에 어떤게 더 좋은 방법일까?
	 * @params {number}
	 * @params {number}
	 * @return {boolean}
	 */
	function checkNumberType(num1, num2) {
		var num1 = parseInt(num1),
			num2 = parseInt(num2);

		if ( isNaN(num1) || isNaN(num2) ) {
			return false;
		}

		return true;
	}

	/*
	 * @return {object}
	 */
	function element() {
		return {
			$inputNum1: function () {
				return $('input[name=num1]');
			},
			$inputNum2: function () {
				return $('input[name=num2]');
			},
			$arithmetic: function () {
				return $('select[id=arithmetic]');
			},
			$result: function () {
				return $('h2[id=result]');
			}
		}
	}

	$.focus = focus;
	$.execute = execute;
	$.checkNumberType = checkNumberType;
});