$(function () {
	function Lotto() {
		this.limitLength = 6;
		this.maxNumber = 45;
	}

	Lotto.prototype.init = function () {
		this.loadNumberListTemplate();
		this.addClickEvent();
	}

	Lotto.prototype.addClickEvent = function () {
		$('body')
			.on('click', '.number__item', (function (e) { this.toggleNumberItemClassName(parseInt($(e.target).text()) - 1); }).bind(this))
			.on('click', '.btn--result', (function () {
				if ( !this.isActionable() ) return;
				this.loadResultListTemplate(this.getLottoNumbers(this.getExceptNumbers()));
			}).bind(this))
	}

	Lotto.prototype.loadNumberListTemplate = function () {
		var i, $numberList = $('.number__list');

		$numberList.html('');

		for ( i = 1; i <= this.maxNumber; i++ ) {
			$numberList.append($('<button>', { 
				text: i, 
				class: 'number__item' 
			}));
		}
	}

	Lotto.prototype.getNumberItem = function (number) {
		return $('.number__item').eq(number);
	}

	Lotto.prototype.toggleNumberItemClassName = function (number) {
		this.getNumberItem(number).toggleClass('number__item--active');
	}

	Lotto.prototype.loadResultListTemplate = function (numbers) {
		$('.result__list').prepend($('<li>', { 
			html: '<span class="numbers">' + numbers.sort(function (a, b) { return a - b; }).join(', ') + '</span><span class="badge">' + ++$('.result__list li').length + '</span>',
			class: 'list-group-item'
		}));
	}

	Lotto.prototype.getExceptNumbers = function () {
		return $('.number__item--active').toArray().map(function (ele) { return parseInt($(ele).text()); });
	}

	Lotto.prototype.getLottoNumbers = function (exceptNumbers) {
		var result = [];

		while ( true ) {
			var random = Math.floor(Math.random() * this.maxNumber) + 1;
			if ( result.length == this.limitLength ) break;
			if ( this.isNotExistNumber(exceptNumbers, result, random) ) result.push(random);
		}

		return result;
	}

	Lotto.prototype.isNotExistNumber = function (exceptNumbers, numbers, n) {
		return exceptNumbers.indexOf(n) < 0 && numbers.indexOf(n) < 0;
	}

	Lotto.prototype.isActionable = function () {
		return $('.number__item').not('.number__item--active').length >= this.limitLength;
	}

	$.Lotto = Lotto;
});