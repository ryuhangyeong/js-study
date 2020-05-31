module.exports = {
	getLanguages: () => ['ko', 'ja', 'zh-cn', 'zh-tw', 'hi', 'en', 'es', 'fr', 'de', 'pt', 'vi', 'id', 'fa', 'ar', 'mm', 'th', 'ru', 'it'],
	getErrorCode: () => ({
		N2MT01: {
			code: 'N2MT01',
			message: 'source parameter is needed (source 파라미터가 필요합니다.)'
		},
		N2MT02: {
			code: 'N2MT02',
			message: 'Unsupported source language (지원하지 않는 source 언어입니다.)'
		},
		N2MT03: {
			code: 'N2MT03',
			message: 'target parameter is needed (target 파라미터가 필요합니다.)'
		},
		N2MT04: {
			code: 'N2MT04',
			message: 'Unsupported target language (지원하지 않는 target 언어입니다.)'
		},
		N2MT05: {
			code: 'N2MT05',
			message: 'source and target must be different (source와 target이 동일합니다.)'
		},
		N2MT06: {
			code: 'N2MT06',
			message: 'There is no source-to-target translator (source->target 번역기가 없습니다.)'
		},
		N2MT07: {
			code: 'N2MT07',
			message: 'text parameter is needed (text 파라미터가 필요합니다.)'
		},
		N2MT08: {
			code: 'N2MT08',
			message: 'text parameter exceeds max length (text 파라미터가 최대 용량을 초과했습니다.)'
		},
		N2MT99: {
			code: 'N2MT99',
			message: 'Internal server errors'
		}
	}),
	getQueryString: query => '?' + encodeURI(Object.keys(query).map(el => el + '=' + query[el]).join('&'))
}