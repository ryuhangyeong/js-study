$(function () {
	init();

	element().$input().keyup(function () { countingView(this.value); });

	/*
	 * @description 화면 결과 출력
	 * @params {string}
	 * @return {void}
	 */
	function countingView(str) {
		var len = str.length;
		element().$include().text(len);
		// $except.text(str.replace(/ /gi, '').length); // 방법1
		element().$except().text(len - countTheNumberOfBlanks(str)); // 방법2
	}

	/*
	 * @description 공백 갯수
	 * @params {string}
	 * @return {number}
	 */
	function countTheNumberOfBlanks(str) {
		return str.split('').filter(function (e) { return e == ' '; }).length;
	}

	/*
	 * @description 초기 설정
	 * @return {void}
	 */
	function init() {
		element().$input().focus();
	}

	/*
	 * @description Getter Dom
	 * @return {$}
	 */
	function element() {
		return {
			$input: function () {
				return $('#input');
			},
			$include: function () {
				return $('#include');
			},
			$except: function () {
				return $('#except');
			}
		}
	}

	$.countingView = countingView;
	$.countTheNumberOfBlanks = countTheNumberOfBlanks;
	$.element = element;
	$.init = init;
});