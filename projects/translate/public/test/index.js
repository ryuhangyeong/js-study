QUnit.module('Translate', {
	beforeEach: function () {
		this.translate = new $.Translate();
		this.translate.setProperty();
		this.translate.setElement();
		this.translate.loadSelectTemplate();
		this.defaultText = {
			target: '반가워',
			result: 'Good to see you.'
		};
	}
});

QUnit.test('loadSelectTemplate', function (assert) {
	var languagesLen = this.translate.languages.length,
		sourceSelectLen = this.translate.$sourceSelect.find('option').length,
		targetSelectLen = this.translate.$targetSelect.find('option').length;

	assert.ok(sourceSelectLen === languagesLen && targetSelectLen === languagesLen, 'select 화면 표시 완료');
});

QUnit.test('toggleState', function (assert) {
	this.translate.target = 'en';
	this.translate.toggleState();
	assert.ok(this.translate.$sourceSelect.val() === 'en' && this.translate.$targetSelect.val() === 'ko', '정상적인 상태값 변경');
});

QUnit.test('change event - select', function (assert) {
	this.translate.addChangeEvent();
	this.translate.$sourceSelect.val('en').trigger('change');
	assert.ok(this.translate.source === 'en' && this.translate.target === 'ko', '정상적인 상태값 변경');
});

QUnit.test('click event - #toggle__btn', function (assert) {
	this.translate.addChangeEvent();
	this.translate.addClickEvent();
	this.translate.$targetSelect.val('en').trigger('change');

	$('#toggle__btn').trigger('click');
	assert.ok(this.translate.source === 'en' && this.translate.target === 'ko', '정상적인 상태값 변경')
});

QUnit.test('click event - #translate__btn', function (assert) {
	var async = assert.async(1);

	this.translate.addChangeEvent();
	this.translate.addClickEvent();
	this.translate.$targetSelect.val('en').trigger('change');
	this.translate.$comment1.val('반가워');
	$('#translate__btn').trigger('click');

	/* 
		@todo 이 방법이외에 해결 방법은 무엇이 있을까?
	 */
	setTimeout((function() {
		assert.ok(this.translate.$comment2.val() === this.defaultText.result, '정상 호출');
		async();
	}).bind(this), 2000);
});

QUnit.test('translate api', function (assert) {
	var async = assert.async(1);

	this.translate.addChangeEvent();
	this.translate.addClickEvent();
	this.translate.$targetSelect.val('en').trigger('change');
	this.translate.$comment1.val(this.defaultText.target);

	$.ajax({
		url: '/translate' + getQueryString({
			text: this.translate.$comment1.val(),
			source: this.translate.source,
			target: this.translate.target
		}),
		success: (function (data) {
			assert.ok(data.message.result.translatedText === this.defaultText.result, '정상 호출');
			async();
		}).bind(this)
	});
});

QUnit.test('getQueryString', function (assert) {
	assert.ok(getQueryString({
		text: 'hello',
		source: 'ko',
		target: 'en'
	}) === '?text=hello&source=ko&target=en', '쿼리 스트링 생성');
});