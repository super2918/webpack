# loader

웹팩은 모든 파일을 모듈로 바라본다. 자바스크립트로 만든 모듈 뿐 아니라, 스타일 시트, 이미, 폰트까지 전부 모듈을 본다.
import구문을 사용할 경우에 자바스크립트 코드 안으로 가져올 수 있다.

이 것이 가능한 이유는 웹팩의 로더이다. 로더는 타입스트립트 같은 다른 언어를 자바스크립트 문법으로 변환을 해주거나,
이미지를 data URL 형식의 문자열로 변환한다. 뿐만 아니라 CSS파일을 자바스크립트에서 직접 로딩할 수 있도록 해준다.

```javascript
// myloader.js

module.exports = function myloader(content) {
  return content;
};
```

함수로 만들 수 있는데 로더가 읽은 파일의 내용이 함수 인자 content로 전달 된다. 로더가 동작하는지 확인하는 용도로만 로그 찍고 곧장 content를 돌려준다.

```javascript
// webpack.config.js

modlue: {
  rules: [
    {
      test: \/.js$/,
      use: [
        path.resolve('/myloader.js')
      ]
    }
  ]
}

```

`module.rules` 배열에 모듈을 추가하는데 test와 use구성도니 객체를 전달한다. `test`에는 로딩에 적용할 파일을 지정한다. 파일명뿐만 아니라 파일 패턴을 정규식표현으로 지정할 수 있는데,
위 코드는 .js 확장자를 갖고 있는 모든 파일을 처리하겠다는 의미

`use`에는 이 패턴에 해당하는 파일에 적용할 로더를 설정하는 부분. 함수의 경로를 적는다.

## 자주 사용되는 loader

#### `css-loader`

- 웹펩은 모든 것을 모듈로 바라본다. 자바스크립트뿐만 아니라 스타일시트로 import를 구문을 불러와야 한다.
  css파일을 자바스트립트에서 불러와 사용하려면 css를 모듈로 변환하는 작업이 필욯다. css-loader은 css파일을 모듈처럼 불러와 사용하게 한다.

```javascript

  npm install --save-dev css-loader

```

```javscript

// webpack.config.js

 module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["css-loader"], // css-loader를 적용한다
      },
    ],
  },

```

웹팩은 엔트리 포인터부터 시작해서 모듈을 검색하면서 css 파일을 찾으면 css-loader로 처리한다. css가 javascript로 변환된다.

#### `style-loader`

- 모듈로 변경된 스타일 시트는 돔에 추가되어야만 브라우저가 해석이 가능한데, css-loader로 처리하면 자바스크립트 코드만 변경되었을 뿐
  돔에는 적용이 되지않았기 때문에 스타일이 적용되지 않는다.

`style-lader`는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가한다. css를 번들링하기 위하여 css-laoder와 style-loader를 함께 사용한다.

```javascript
  npm install --save-dev style-loader
```

```javascript
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // style-loader를 앞에 추가한다
      },
    ],
  },
```

배열로 설정하면 **뒤에서**부터**앞으로** 로더가 작동을 한다. 위 설정은 모든 .css 확장자로 끝나는 모든 모듈을 읽어 들여 css-laoder를 적용하고 그 다음 style-loader를 적용한다.

#### `file-loader`
- CSS 뿐만 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용하게끔 할 수 있다. 파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨주는 것이 file-loader가 하는 일이다. 
publicPath 옵션은 file-loader가 처리하는 파일을 모듈로 사용할 때 경로 앞에 추가되는 문자열이다. output에 설정한 'dist' 폴더에 이미지 파일을 옮길 것이므로 publicPath 값을 이것으로로 지정했다. 파일을 사용하는 측에서는 'bg.png'를 'dist/bg.png'로 변경하여 사용할 것이다.

또한 name 옵션을 사용했는데 이것은 로더가 파일을 아웃풋에 복사할때 사용하는 파일 이름이다. 기본적으로 설정된 해쉬값을 쿼리스트링으로 옮겨서 'bg.png?6453a9c65953c5c28aa2130dd437bbde' 형식으로 파일을 요청하도록 변경했다.

```javascript
  npm install --save-dev file-loader

```
```css
 .test {
   background: url(bg.png);
 }
```

```javascript
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 10000 // 5kb 미만 파일 data-url 처리
        }
      }
    ],
  },
```

#### `url-loader`
- 사용하는 이미지 갯수가 많다면 네트웍 리소스를 사용하는 부담이 있고 사이트 성능에 영향을 줄 수도 있다. 만약 한 페이지에서 작은 이미지를 여러 개 사용한다면 Data URI Scheme을 이용하는 방법이 더 나은 경우도 있다. 이미지를 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 형식이다. 아이콘처럼 용량이 작거나 사용 빈도가 높은 이미지는 파일을 그대로 사용하기 보다는 Data URI Scheeme을 적용하기 위해 url-loader를 사용하면 좋겠다.

```javascript
  npm install --save-dev url-loader
```

```javascript
  {
    test: /\.png$/,
    use: {
      loader: 'url-loader', // url 로더를 설정한다
      options: {
        publicPath: './dist/', // file-loader와 동일
        name: '[name].[ext]?[hash]', // file-loader와 동일
        limit: 5000 // 5kb 미만 파일만 data url로 처리
      }
    }
  }
```