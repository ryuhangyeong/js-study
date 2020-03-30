$(function () {
	function Todo() {
		this.list = [];
		this.idx = 0;
	}

	Todo.prototype.init = function () {
		this.setElement();
		this.setInputFocus();
		this.addClickEvent();
		this.addSubmitEvent();
	}

	Todo.prototype.setElement = function () {
		this.$form = $('form');
		this.$result = $('#result');
		this.$input = $('input[name=todo]');
		this.$alert = $('.alert');
	}

	Todo.prototype.setInputFocus = function () {
		this.$input.focus();
	}

	Todo.prototype.addClickEvent = function () {
		$('body')
			.on('click', 'li button', (function (e) {
				var target = e.target;
				e.preventDefault();

				this.removeTodo($(target).closest('li').data('idx'));
				$(target).closest('li').remove();
				this.$alert[this.list.length ? 'hide' : 'show']();
			}).bind(this))
			.on('click', 'li span', (function (e) {
				var target = e.target;
				this.toggleCompleted($(target).closest('li').data('idx'));
				$(target).toggleClass('active');
			}).bind(this))
	}

	Todo.prototype.addSubmitEvent = function () {
		$('body')
			.on('submit', 'form', (function (e) { 
				e.preventDefault();
				var value = this.$input.val() + '';

				if(!value.trim()) return;

				this.addTodo(value);
				this.loadAddTodoTemplate();
				this.$input.val('');
				this.$alert.hide();
			}).bind(this));
	}

	Todo.prototype.addTodo = function (todo) {
		this.list.push({
			idx: this.idx++,
			todo: todo,
			completed: false
		});
	}

	Todo.prototype.removeTodo = function (idx) {
		var index = this.isExistTodo(idx);
		if ( index > -1 ) {
			this.list.splice(index, 1);
		}
	}

	Todo.prototype.toggleCompleted = function (idx) {
		var index = this.isExistTodo(idx);
		if ( index > -1 ) {
			this.list[index].completed = !this.list[index].completed;
		}
	}

	Todo.prototype.isExistTodo = function (idx) {
		return this.list.map(function (el) { return el.idx; }).indexOf(idx);
	}

	Todo.prototype.loadAddTodoTemplate = function () {
		var item = this.list[this.list.length - 1];

		this.$result.prepend($('<li>', {
			html: '<span>' + item.todo + '</span><button class="btn btn-danger pull-right">삭제</button>',
			class: 'list-group-item',
			'data-idx': item.idx
		}));
	}

	$.Todo = Todo;
});