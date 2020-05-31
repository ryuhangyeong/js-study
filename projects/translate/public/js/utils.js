function getQueryString(query) {
	return '?' + encodeURI(Object.keys(query).map(function(el) {
		return el + '=' + query[el];
	}).join('&'));
}