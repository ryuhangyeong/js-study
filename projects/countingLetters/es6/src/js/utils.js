/*
 * @description 화면 결과 출력
 * @params {string}
 * @return {void}
 */
export const countingView = str => {
	const len = str.length;
	$('#include').text(len);
	$('#except').text(len - countTheNumberOfBlanks(str));
}

/*
 * @description 공백 갯수
 * @params {string}
 * @return {number}
 */
export const countTheNumberOfBlanks = str => str.split('').filter(e => e == ' ').length;