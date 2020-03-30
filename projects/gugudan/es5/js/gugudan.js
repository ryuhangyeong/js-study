$(function () {
	function Gugudan() {}

	Gugudan.prototype.init = function () {
		this.setElement();
		this.setInputFocus();
		this.addClickEvent();
		this.addSubmitEvent();
	}

	Gugudan.prototype.setElement = function () {
		this.$template = $('#template');
		this.$input = $('input[name=dan]');
		this.$reset = $('button[type=reset]');
		this.$form = $('form');
	}

	Gugudan.prototype.setInputFocus = function () {
		this.$input.focus();
	}

	Gugudan.prototype.addClickEvent = function () {
		$('body')
			.on('click', 'button[type=reset]', (function () { 
				this.$template.empty();
				this.setInputFocus();
			}).bind(this));
	}

	Gugudan.prototype.addSubmitEvent = function () {
		$('body')
			.on('submit', 'form', (function (e) {
				e.preventDefault();
				this.$template.html(this.loadGugudanTemplate(this.$input.val()));
			}).bind(this));
	}

	Gugudan.prototype.loadGugudanTemplate = function (dan) {
		this.$template.html('');
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

	$.Gugudan = Gugudan;
});