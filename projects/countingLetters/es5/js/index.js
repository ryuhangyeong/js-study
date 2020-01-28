$(function () {
	$('#input')
		.keyup(function () { countingView(this.value); });

	/*
	 * @description 화면 결과 출력
	 * @params {string}
	 * @return {void}
	 */
	function countingView(str) {
		var len = str.length;
		$('#include').text(len);
		// $except.text(str.replace(/ /gi, '').length); // 방법1
		$('#except').text(len - countTheNumberOfBlanks(str)); // 방법2
	}

	/*
	 * @description 공백 갯수
	 * @params {string}
	 * @return {number}
	 */
	function countTheNumberOfBlanks(str) {
		return str.split('').filter(function (e) { return e == ' '; }).length;
	}

	$.countingView = countingView;
	$.countTheNumberOfBlanks = countTheNumberOfBlanks;
});