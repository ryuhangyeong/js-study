QUnit.module('구구단', {
	beforeEach: function () {
		this.$template = $('#template');
		this.$input = $('input[name=dan]');
		this.$form = $('form');
		this.max = 10;
	}
});

QUnit.test('reset', function (assert) {
	var template = $.template(2);
	this.$template.html(template);
	assert.ok(this.$template.html() == template, '2단을 출력합니다.');
	$('button[type=reset]').trigger('click');
	assert.ok(this.$template.html() == '' && this.$input.is(':focus'), 'reset 버튼이 정상 작동되었습니다.');
});

QUnit.test('validate', function (assert) {
	var self = this;

	// 출력 가능한 단수
	validateUnitTest.call(this, [2, 3, 4, 5, 6, 7, 8, 9], function (dan) {
		assert.ok(self.$template.html() == $.template(dan), '출력 가능 단수 정상 출력');
	});

	// 출력할 수 없는 단수
	validateUnitTest.call(this, [1, 10], function () {
		assert.ok(self.$template.html() == '', '출력할 수 없는 단수 출력하지 않음');
	});
});

QUnit.test('template', function (assert) {
	/*
	 * @params {object}
	 * @params {string}
	 * @return {void}
	 */
	templateUnitTest.call(this, function (state, message) {
		assert.ok((state.i == state.dan) && (state.j == state.idx) && (state.result == state.resultTxt), message);
	});
});

/*
 * @description [template] 테스트 단위
 * @params {callback}
 * @return {void}
 */
function templateUnitTest(callback) {
	var i, j, temp, dan, idx, result, resultTxt;

	for ( i = 2; i < this.max; i++ ) {
		this.$template.html($.template(i));

		for ( j = 1; j < this.max; j++ ) {
			result = i * j;
			$li = this.$template.find('li:eq(' + (j - 1) + ')');
			dan = $li.find('.danTxt').text();
			idx = $li.find('.idxTxt').text();
			resultTxt = $li.find('.resultTxt').text();

			callback({
				i, j,
				dan,
				idx,
				result,
				resultTxt
			}, '정상적인 결과값');
		}
	}
}

/*
 * @description [validate] 테스트 단위
 * @params {array}
 * @params {function}
 * @return {void}
 */
function validateUnitTest(arr, callback) {
	arr.forEach(function (dan) {
		this.$input.val(dan);
		this.$form.trigger('submit');
		callback(dan);
	}, this);
}