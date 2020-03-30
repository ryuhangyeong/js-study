$(function () {
	function JsonTree(options) {
		this.structure = options.structure || [];
		this.toggle = options.toggle || false;
		this.wrap = options.wrap || '';
		this.str = '';
	}

	JsonTree.prototype.init = function () {
		this.getJsonTreeTemplate(this.structure);
		this.loadJsonTreeTemplate();
	}

	JsonTree.prototype.addClickEvent = function () {
		if ( this.toggle ) {
			$('body').on('click', this.wrap + ' li', (function (e) { 
				$(e.target).next('ul').toggle();
			}).bind(this))
		}
	}

	JsonTree.prototype.getJsonTreeTemplate = function (arr) {
		this.str += '<ul>';
		$.each(arr, (function (idx, el) {
			this.str += '<li data-open=' + !!(el.open) + '>' + el.name + '</li>';
			if ( el && !el.children ) return;
			return this.getJsonTreeTemplate(el.children);
		}).bind(this));
		this.str += '</ul>';
	}

	JsonTree.prototype.loadJsonTreeTemplate = function () {
		$(this.wrap).html(this.str);
		$(this.wrap + ' li').each(function (idx, el) {
			$(el).next('ul').css('display', $(this).data('open') ? 'block' : 'none');
		});
	}

	$.JsonTree = JsonTree;
});