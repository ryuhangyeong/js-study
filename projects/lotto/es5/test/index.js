QUnit.module('로또 번호 추출기', {
	beforeEach: function () {
		this.lotto = new $.Lotto();
		this.lotto.loadNumberListTemplate();
		this.activeClassName = 'number__item--active';
		this.array1 = [1, 2, 3, 4, 5];
		this.array2 = [7, 9, 11, 13, 15, 17, 19];
	}
});

QUnit.test('loadNumberListTemplate', function (assert) {
	assert.ok($('.number__item').length === this.lotto.maxNumber, '1 ~ 45번까지 버튼이 존재한다.');
	$('.number__list').html('');
	assert.ok($('.number__item').length === 0, '비어있다.');
});

QUnit.test('getNumberItem', function (assert) {
	for ( i = 0; i < this.lotto.maxNumber; i++ ) assert.ok(this.lotto.getNumberItem(i).text(), i + 1);
});

QUnit.test('toggleNumberItemClassName', function (assert) {
	this.lotto.toggleNumberItemClassName(0);
	assert.ok(this.lotto.getNumberItem(0).hasClass(this.activeClassName), '버튼 활성화');

	this.lotto.toggleNumberItemClassName(0);
	assert.ok(!this.lotto.getNumberItem(0).hasClass(this.activeClassName), '버튼 비활성화');
});

QUnit.test('click event - number__item', function (assert) {
	this.lotto.addClickEvent();

	this.lotto.getNumberItem(0).trigger('click');
	assert.ok(this.lotto.getNumberItem(0).hasClass(this.activeClassName), '버튼 활성화');

	this.lotto.getNumberItem(0).trigger('click');
	assert.ok(!this.lotto.getNumberItem(0).hasClass(this.activeClassName), '버튼 비활성화');
});

QUnit.test('click event - btn--result', function (assert) {
	for ( i = 5; i < this.lotto.maxNumber; i++ ) this.lotto.getNumberItem(i).trigger('click');
	$('.btn--result').trigger('click');
	assert.ok($('.result__list').html() === '', '제외하지 않은 숫자가 6개 미만이므로 실행 불가능');

	this.lotto.getNumberItem(5).trigger('click');
	$('.btn--result').trigger('click');
	assert.ok($('.result__list li .numbers').html() === this.array1.concat(6).join(', '), '제외하지 않은 숫자가 6개 이상이므로 실행 가능');
});

QUnit.test('getExceptNumbers', function (assert) {
	for ( i = 0; i < 5; i++ ) this.lotto.getNumberItem(i).trigger('click');
	assert.deepEqual(this.lotto.getExceptNumbers(), this.array1, '제외 번호 확인');

	for ( i = 6; i < 20; i += 2) this.lotto.getNumberItem(i).trigger('click');
	assert.deepEqual(this.lotto.getExceptNumbers(), this.array1.concat(this.array2), '제외 번호 확인');
});

QUnit.test('getLottoNumbers', function (assert) {
	for ( i = 0; i < 5; i++ ) this.lotto.getNumberItem(i).trigger('click');
	for ( i = 0; i < 5; i++ ) assert.ok(this.lotto.getLottoNumbers(this.lotto.getExceptNumbers()).indexOf(i + 1) === -1, '제외한 숫자가 로또 번호에 존재하지 않는다.');
});

QUnit.test('loadResultListTemplate', function (assert) {
	for ( i = 0; i < 5; i++ ) this.lotto.getNumberItem(i).trigger('click');

	var lottoNumbers = this.lotto.getLottoNumbers(this.lotto.getExceptNumbers());

	this.lotto.loadResultListTemplate(lottoNumbers);

	assert.ok($('.result__list li').eq(0).find('.numbers').text() === lottoNumbers.join(', '), '로또 당첨 번호 출력');
});

QUnit.test('isNotExistNumber', function (assert) {
	var exceptNumbers = [1],
		numbers = [2];

	assert.ok(this.lotto.isNotExistNumber(exceptNumbers, numbers, 3), '존재하지 않은 숫자');
	assert.ok(!this.lotto.isNotExistNumber(exceptNumbers, numbers, 1), '존재하는 숫자');
});

QUnit.test('isActionable', function (assert) {
	for ( i = 5; i < this.lotto.maxNumber; i++ ) this.lotto.getNumberItem(i).trigger('click');
	assert.ok(!this.lotto.isActionable(), '제외하지 않은 숫자가 6개 미만이므로 실행 불가능');

	this.lotto.getNumberItem(5).trigger('click');
	assert.ok(this.lotto.isActionable(), '제외하지 않은 숫자가 6개 이상이므로 실행 가능');
});