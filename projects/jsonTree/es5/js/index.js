$(function () {
	var structure = [
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
	];

	var jsonTree = new $.JsonTree({
		structure: structure,
		toggle: true,
		wrap: '#result'
	});

	jsonTree.init();
	jsonTree.addClickEvent();
});