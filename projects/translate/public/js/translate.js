$(function () {
	function Translate() {}

	Translate.prototype.init = function () {
		this.setProperty();
		this.setElement();
		this.addClickEvent();
		this.addChangeEvent();
		this.loadSelectTemplate();
	}

	Translate.prototype.setProperty = function () {
		this.languages = [
			{ name: '한국어', code: 'ko'}, 
			{ name: '일본어', code: 'ja'}, 
			{ name: '중국어 간체', code: 'zh-cn'}, 
			{ name: '중국어 번체', code: 'zh-tw'}, 
			{ name: '힌디어', code: 'hi'}, 
			{ name: '영어', code: 'en'}, 
			{ name: '스페인어', code: 'es'}, 
			{ name: '프랑스어', code: 'fr'}, 
			{ name: '독일어', code: 'de'}, 
			{ name: '포르투갈어', code: 'pt'}, 
			{ name: '베트남어', code: 'vi'}, 
			{ name: '인도네시아어', code: 'id'}, 
			{ name: '페르시아어', code: 'fa'}, 
			{ name: '아랍어', code: 'ar'}, 
			{ name: '미얀마어', code: 'mm'}, 
			{ name: '태국어', code: 'th'}, 
			{ name: '러시아어', code: 'ru'}, 
			{ name: '이탈리아어', code: 'it'}
		];
		this.source = 'ko';
		this.target = 'ko';
	}

	Translate.prototype.setElement = function () {
		this.$comment1 = $('#comment1');
		this.$comment2 = $('#comment2');
		this.$sourceSelect = $('select[name=source]');
		this.$targetSelect = $('select[name=target]');
	}

	Translate.prototype.addClickEvent = function () {
		$('body')
			.on('click', '#toggle__btn', (function () { this.toggleState(); }).bind(this))
			.on('click', '#translate__btn', (function (e) {
				e.preventDefault();

				if ( this.source === this.target ) return;

				$.ajax({
					url: '/translate' + getQueryString({
						text: this.$comment1.val(),
						source: this.source,
						target: this.target
					}),
					success: (function (data) { this.$comment2.val(data.message.result.translatedText); }).bind(this),
					error: function (data) { alert(JSON.parse(data.responseText).error); }
				});
			}).bind(this));
	}

	Translate.prototype.addChangeEvent = function () {
		$('body').on('change', 'select', (function (e) { this[e.target.name] = e.target.value; }).bind(this));
	}

	Translate.prototype.toggleState = function () {
		var tempLanguage = this.source,
			tempValue = this.$comment1.val();

		this.source = this.target;
		this.$sourceSelect.val(this.source).trigger('change');
		var value1 = this.$comment2.val();
		this.$comment2.val(tempValue);

		this.target = tempLanguage;
		this.$targetSelect.val(this.target).trigger('change');
		this.$comment1.val(value1);
	}

	Translate.prototype.loadSelectTemplate = function () {
		this.languages.forEach((function(language) {
			var select = $('<option>', { text: language.name, value: language.code });
			this.$sourceSelect.append(select);
			this.$targetSelect.append(select.clone());
		}).bind(this));
	}

	$.Translate = Translate;
});