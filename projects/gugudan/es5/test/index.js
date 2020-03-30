QUnit.module('Gugudan', {
	beforeEach: function () {
		this.gugudan = new $.Gugudan(); 
		this.gugudan.setElement();
	}
});

QUnit.test('setInputFocus', function (assert) {
	assert.ok(!this.gugudan.$input.is(':focus'), 'focus 비 활성화');
	this.gugudan.setInputFocus();
	assert.ok(this.gugudan.$input.is(':focus'), 'focus 활성화');
});

QUnit.test('addClickEvent - button[type=reset]', function (assert) {
	var dan;
	this.gugudan.addClickEvent();

	dan = 3;
	this.gugudan.$input.val(dan);
	assert.ok(this.gugudan.$input.val() == dan && !this.gugudan.$input.is(':focus'), 'reset 정상 작동');
	this.gugudan.$reset.trigger('click');
	assert.ok(this.gugudan.$input.val() == '' && this.gugudan.$input.is(':focus'), 'reset 정상 작동');
});

QUnit.test('addSubmitEvent - form', function (assert) {
	var dan;
	this.gugudan.addSubmitEvent();

	dan = 1;
	this.gugudan.$input.val(dan);
	this.gugudan.$form.trigger('submit');
	assert.ok(this.gugudan.$template.html() === '', '[출력 불가능 단수인 경우] addSubmitEvent - form 작동하지 않는다');

	dan = 2;
	this.gugudan.$input.val(dan);
	this.gugudan.$form.trigger('submit');
	assert.ok(this.gugudan.$template.html() !== '', '[출력 가능 단수인 경우] addSubmitEvent - form 작동한다');

	dan = 3;
	this.gugudan.$input.val(dan);
	this.gugudan.$form.trigger('submit');
	assert.ok(this.gugudan.$template.html() !== '', '[출력 가능 단수인 경우] addSubmitEvent - form 작동한다');
});

QUnit.test('loadGugudanTemplate', function (assert) {
	var dan;

	dan = 1;
	this.gugudan.$template.html(this.gugudan.loadGugudanTemplate(dan));
	assert.ok(this.gugudan.$template.html() === '', '[출력 불가능 단수인 경우] loadGugudanTemplate 작동하지 않는다');

	dan = 2;
	this.gugudan.$template.html(this.gugudan.loadGugudanTemplate(dan));
	assert.ok(this.gugudan.$template.html() !== '', '[출력 가능 단수인 경우] loadGugudanTemplate 작동한다');

	dan = 3;
	this.gugudan.$template.html(this.gugudan.loadGugudanTemplate(dan));
	assert.ok(this.gugudan.$template.html() !== '', '[출력 가능 단수인 경우] loadGugudanTemplate 작동한다');
});
