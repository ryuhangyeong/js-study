# 글자수 세기

## 아쉬운 점 및 삽질, 해결

- **Webpack**에서 `qunit`를 사용하고 싶었지만 `bundle` 된 결과가 실행되지 않는 문제가 발생

  - **Webpack**에서 `qunit.css`를 불러오면 실행에 문제없으나 `qunit.js` 의 경우 번들 결과가 실행이 안됨

  - 문제 원인은 `qunit.js`가 ES5로 작성되어있어서 그런 것으로 예상

  - **[문제 해결]** `script-loader`를 설치하여 해결

    ```javascript
    import 'script-loader!qunit/qunit/qunit.js';
    ```

## 해야할 일

- [x] `webpack config` 파일 분리하기

- [x] **bundle** 결과를 살펴보니 `tests.js`와 `index.js`에서 `jquery`와 `sizzle`가 중복되어 들어가있는 것을 확인할 수 있었다. 이것을 분리해보는 것이 목표!

  ```javascript
  optimization: {
      splitChunks: {
          name: 'vendors',
              chunks: 'all'
      }
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		filename: 'index.html',
  		template: './src/html/index.html',
  		chunks: ['vendors', 'index']
  	}),
  	new HtmlWebpackPlugin({
  		filename: 'tests.html',
  		template: './src/html/tests.html',
  		chunks: ['vendors', 'index', 'tests']
  	})
  	// ...
  ]
  ```

  생각보다 쉽게 해결하였다.

## ES5

- [미리보기](https://ryuhangyeong.github.io/js-study/projects/countingLetters/es5/)
- [테스트 코드](https://ryuhangyeong.github.io/js-study/projects/countingLetters/es5/tests/)
