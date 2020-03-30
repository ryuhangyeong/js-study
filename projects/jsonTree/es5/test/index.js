QUnit.module('JSON Tree', {
	beforeEach: function () {
		this.structure = [
			{
				name: '첫 번째 메뉴',
				open: true,
				children: [
					{
						name: '첫 번째 서브 메뉴',
						open: true,
						children: [
							{ name: '서브 메뉴 속 첫번쨰 서브 메뉴' }
						]
					},
					{
						name: '서브 메뉴'
					}
				]
			},
			{
				name: '두 번째 메뉴',
				children: [
					{
						name: '두 번째 서브 메뉴1',
						open: false,
						children: [
							{ name: '서브메뉴 속 첫번째 서브 메뉴' },
							{ name: '서브메뉴 속 두번째 서브 메뉴' }
						]
					},
					{
						name: '두 번째 서브 메뉴2'
					}
				]
			},
			{
				name: '세 번째 메뉴'
			}
		],
		this.getJsonTreeTemplateResult = '<ul><li data-open=true>첫 번째 메뉴</li><ul><li data-open=true>첫 번째 서브 메뉴</li><ul><li data-open=false>서브 메뉴 속 첫번쨰 서브 메뉴</li></ul><li data-open=false>서브 메뉴</li></ul><li data-open=false>두 번째 메뉴</li><ul><li data-open=false>두 번째 서브 메뉴1</li><ul><li data-open=false>서브메뉴 속 첫번째 서브 메뉴</li><li data-open=false>서브메뉴 속 두번째 서브 메뉴</li></ul><li data-open=false>두 번째 서브 메뉴2</li></ul><li data-open=false>세 번째 메뉴</li></ul>';
		this.loadJsonTreeTemplateResult = '<ul><li data-open="true">첫 번째 메뉴</li><ul style="display: block;"><li data-open="true">첫 번째 서브 메뉴</li><ul style="display: block;"><li data-open="false">서브 메뉴 속 첫번쨰 서브 메뉴</li></ul><li data-open="false">서브 메뉴</li></ul><li data-open="false">두 번째 메뉴</li><ul style="display: none;"><li data-open="false">두 번째 서브 메뉴1</li><ul style="display: none;"><li data-open="false">서브메뉴 속 첫번째 서브 메뉴</li><li data-open="false">서브메뉴 속 두번째 서브 메뉴</li></ul><li data-open="false">두 번째 서브 메뉴2</li></ul><li data-open="false">세 번째 메뉴</li></ul>';
		this.wrap = '#result';
		this.jsonTree = new $.JsonTree({ structure: this.structure, wrap: this.wrap });
	}
});

QUnit.test('getJsonTreeTemplate', function (assert) {
	this.jsonTree.getJsonTreeTemplate(this.jsonTree.structure);
	assert.ok(this.jsonTree.str === this.getJsonTreeTemplateResult);
});

QUnit.test('loadJsonTreeTemplate', function (assert) {
	this.jsonTree.getJsonTreeTemplate(this.jsonTree.structure);
	this.jsonTree.loadJsonTreeTemplate();
	assert.ok($(this.wrap).html() === this.loadJsonTreeTemplateResult);
});

QUnit.test('addClickEvent - #result li', function (assert) {
	this.jsonTree.toggle = true;
	this.jsonTree.getJsonTreeTemplate(this.jsonTree.structure);
	this.jsonTree.loadJsonTreeTemplate();
	this.jsonTree.addClickEvent();

	assert.ok($(this.wrap + ' li').eq(0).next('ul').is(':visible'));
	$('#result li').eq(0).trigger('click');
	assert.ok(!$(this.wrap + ' li').eq(0).next('ul').is(':visible'));
});