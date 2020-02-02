# 구구단

## 실수

테스트 코드를 작성하다가 이상한 점을 발견하였다. 분명히 값을 정상적으로 확인하고 있는 줄 알았는데 빈 값을 확인하고 있었다. 매번 잘 작동하는 것을 의심하고정신차리고 코딩을 해야겠다.

## 테스트 코드 작성에 대한 고찰

### 초기 버전

```javascript
QUnit.test('template', function (assert) {
	var i, j, temp, len = 10, dan, idx, result;

	for ( i = 2; i < len; i++ ) {
		this.$template.html($.template(i));

		for ( j = 0; j < len - 1; j++ ) {
			$li = $('li:eq(' + j + ')');
			dan = $li.find('.danTxt').text();
			idx = $li.find('.idxTxt').text();
			result = $li.find('.resultTxt').text();

			assert.ok(dan * idx == result, "정상적인 결과값");
		}
	}
});
```

2단부터 9단까지 화면에 출력하여 확인한다. 해당 테스트 코드는 `template` 함수에 대한 테스트 코드를 작성하는데 `template` 함수의 값에 의존해서 테스트 코드를 작성한다는 것이다. 테스트해야할 대상에 의존하다보니 정확한 테스트 방법이 아니라고 판단하게 되었다.

### 개선

```javascript
// Step2 [개선]
QUnit.test('template - 개선', function (assert) {
	var i, j, temp, dan, idx, result, resultTxt;

	for ( i = 2; i < this.max; i++ ) {
		this.$template.html($.template(i));

		for ( j = 1; j < this.max; j++ ) {
			result = i * j;
			$li = this.$template.find('li:eq(' + (j - 1) + ')');
			dan = $li.find('.danTxt').text();
			idx = $li.find('.idxTxt').text();
			resultTxt = $li.find('.resultTxt').text();

			assert.ok((i == dan) && (j == idx) && (result == resultTxt), "정상적인 결과값");
		}
	}
});
```

해당 테스트 코드는 더이상 `template` 함수에 의존하지 않고 `template`가 만든 dom의 값을 확인한다.

### 리팩토링

```javascript
// Step1
QUnit.test('template', function (assert) {
	/*
	 * @params {object}
	 * @params {string}
	 * @return {void}
	 */
	templateUnitTest.call(this, function (state, message) {
		assert.ok(state.dan * state.idx == state.result, message);
	});
});

// Step2 [개선]
QUnit.test('template - 개선', function (assert) {
	/*
	 * @params {object}
	 * @params {string}
	 * @return {void}
	 */
	templateUnitTest.call(this, function (state, message) {
		assert.ok((state.i == state.dan) && (state.j == state.idx) && (state.result == state.resultTxt), message);
	});
});

/*
 * @description 테스트 단위
 * @params {callback}
 * @return {void}
 */
function templateUnitTest(callback) {
	var i, j, temp, dan, idx, result, resultTxt;

	for ( i = 2; i < this.max; i++ ) {
		this.$template.html($.template(i));

		for ( j = 1; j < this.max; j++ ) {
			result = i * j;
			$li = this.$template.find('li:eq(' + (j - 1) + ')');
			dan = $li.find('.danTxt').text();
			idx = $li.find('.idxTxt').text();
			resultTxt = $li.find('.resultTxt').text();

			callback({
				i, j,
				dan,
				idx,
				result,
				resultTxt
			}, "정상적인 결과값");
		}
	}
}
```

## 문제점

1. 테스트 코드 작성시 **eslint-loader** 오류가 난다. 일단 현재는 테스트코드 작성시에는 **eslint-loader**가 작동하지 않게 하여 문제를 우회하였지만 근본적인 해결법을 찾아서 수정해본다.

## 해야할 일

- [x] ES6 - flow.js 도입
- [x] ES6 - eslint 도입
- [x] ES6 - prettier 도입

## ES5

- [미리보기](https://ryuhangyeong.github.io/js-study/projects/gugudan/es5/)
- [테스트 코드](https://ryuhangyeong.github.io/js-study/projects/gugudan/es5/tests/)
