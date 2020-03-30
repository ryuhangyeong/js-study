QUnit.module('Todo', {
	beforeEach: function () {
		this.todo = new $.Todo();
		this.todo.setElement();
		this.todo.addClickEvent();
		this.todo.addSubmitEvent();
	}
});

QUnit.test('setInputFocus', function (assert) {
	assert.ok(!this.todo.$input.is(':focus'), 'focus 비 활성화');
	this.todo.setInputFocus();
	assert.ok(this.todo.$input.is(':focus'), 'focus 활성화');
});

QUnit.test('addClickEvent - li button', function (assert) {
	this.todo.$input.val('html');
	this.todo.$form.trigger('submit');

	this.todo.$input.val('css');
	this.todo.$form.trigger('submit');
	assert.ok((this.todo.list.length === this.todo.idx) && (this.todo.$result.find('li').length === this.todo.list.length), '할일 삭제 전');

	this.todo.$result.find('li button').eq(0).trigger('click');
	assert.ok((this.todo.list.length === 1) && (this.todo.$result.find('li').length === this.todo.list.length), '할일 삭제 후');
});

QUnit.test('addClickEvent - li span', function (assert) {
	this.todo.$input.val('html');
	this.todo.$form.trigger('submit');

	this.todo.$input.val('css');
	this.todo.$form.trigger('submit');

	// template은 역순으로 추가된다
	assert.ok(!this.todo.list[1].completed && !this.todo.$result.find('li span').eq(0).hasClass('active'), '할일 완료 전');
	this.todo.$result.find('li span').eq(0).trigger('click');
	assert.ok(this.todo.list[1].completed && this.todo.$result.find('li span').eq(0).hasClass('active'), '할일 완료 후');
});

QUnit.test('addSubmitEvent - form', function (assert) {
	this.todo.$input.val('html');
	this.todo.$form.trigger('submit');
	assert.ok((this.todo.list.length === this.todo.idx) && !this.todo.$alert.is(':visible') && (this.todo.$result.find('li').length === this.todo.list.length), '할 일 추가');
});

QUnit.test('addTodo', function (assert) {
	this.todo.addTodo('html');
	assert.ok(this.todo.list.length === this.todo.idx, '할 일 추가');

	this.todo.addTodo('css');
	assert.ok(this.todo.list.length === this.todo.idx, '할 일 추가');

	this.todo.addTodo('js');
	assert.ok(this.todo.list.length === this.todo.idx, '할 일 추가');
});

QUnit.test('removeTodo', function (assert) {
	this.todo.addTodo('html');
	this.todo.addTodo('css');
	this.todo.addTodo('js');

	this.todo.removeTodo(1);
	assert.ok(this.todo.list.length === 2, '할 일 삭제');

	this.todo.removeTodo(0);
	assert.ok(this.todo.list.length === 1, '할 일 삭제');

	this.todo.removeTodo(0);
	assert.ok(this.todo.list.length === 1, '이미 삭제된 할 일 삭제');
});

QUnit.test('toggleCompleted', function (assert) {
	this.todo.addTodo('html');
	this.todo.addTodo('css');

	assert.ok(!this.todo.list[0].completed, '할 일 비 완료');
	this.todo.toggleCompleted(0);
	assert.ok(this.todo.list[0].completed, '할 일 비 완료');

	assert.ok(!this.todo.list[1].completed, '할 일 비 완료');
	this.todo.toggleCompleted(1);
	assert.ok(this.todo.list[1].completed, '할 일 비 완료');
});

QUnit.test('loadAddTodoTemplate', function (assert) {
	this.todo.addTodo('html');
	this.todo.loadAddTodoTemplate();
	assert.ok(this.todo.$result.find('li').length === this.todo.idx, '할 일 추가시 화면 추가 확인');

	this.todo.addTodo('css');
	this.todo.loadAddTodoTemplate();
	assert.ok(this.todo.$result.find('li').length === this.todo.idx, '할 일 추가시 화면 추가 확인');

	this.todo.addTodo('js');
	this.todo.loadAddTodoTemplate();
	assert.ok(this.todo.$result.find('li').length === this.todo.idx, '할 일 추가시 화면 추가 확인');
});

QUnit.test('isExistTodo', function (assert) {
	this.todo.addTodo('html');
	this.todo.addTodo('css');
	this.todo.addTodo('js');

	assert.ok(this.todo.isExistTodo(0) === 0, '존재하는 할 일');

	this.todo.removeTodo(0);
	assert.ok(this.todo.isExistTodo(0) === -1, '존재하지 않은 할 일');

	assert.ok(this.todo.isExistTodo(2) === 1, '존재하는 할 일');
});