$(function () {
	init();

	$('body')
		.on('click', 'button[type=reset]', function () { reset(); });
	
	$('body')
		.on('submit', 'form', function (e) { 
			element().$template().empty();
			e.preventDefault();
			var temp = template(element().$input().val());
			element().$template().html(temp);
		});

	/*
	 * @params {number}
	 * @return {string}
	 */
	function template(dan) {
		if ( dan < 2 || dan > 9 ) return;

		var str = '', i;

		for ( i = 1; i < 10; i++ ) {
			str += '<li class="list-group-item">';
			str += 		'<span class="danTxt">' + dan + '</span> * ';
			str += 		'<span class="idxTxt">' + i + '</span>' + ' = ';
			str += 		'<span class="resultTxt">' + (dan * i) + '</span>';
			str += '</li>';
		}

		return str;
	}

	/*
	 * @return {void}
	 */
	function init() {
		element().$input().focus();
	}

	/*
	 * @return {void}
	 */
	function reset() {
		element().$input().focus();
		element().$template().empty();
	}

	/*
	 * @return {$}
	 */
	function element() {
		return {
			$template: function () {
				return $('#template');
			},
			$input: function () {
				return $('input[name=dan]');
			}
		}
	}

	$.template = template;
	$.reset = reset;
});