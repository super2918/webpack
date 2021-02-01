# Webackpack 배경

전역스코프의 오류가 되는데 어플리케이션을 예측할 수 없고 런타임 오류들이 생기는데 이러한 문제를 해결하기 위한 방법들로는?

1. IIFE 즉시실행함수 방식의 모듈

- Self-Executing Anonymous Function으로 알려진 디자인 패턴이다.
- 전역 스코프의 불필요한 변수를 추가해서 오염으로부터 방지, IIFE 내부안으로 다른 변수의 접근을 막는다.

```javascript 

 (function () {
   statements
 }))();
 
```

2. 다양한 모듈 스펙

AMD, CommonJS 이다.  
CommonJS는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표이다. 
`exports` 키워드로 모듈을 만들고 `require()`함수로 불러 들이는 방식이다. 
대표적인 서버 사이드 플랫폼인 `Node.js`에서 이를 사용한다.

math.js
```javascript

 exports function sum(a, b) {
   return a + b;
 }

```

app.js
```javascript
const sum = require('./math.js');
sum(1, 2)
```

`AMD(Asynchronous Modules Definition)` 비동기로 로딩되는 환경에서 모듈을 사용하는 것을 목표 = 주로 브라우저 환경이다.
`UMD(Universal Module Definition)` 는 AMD기반으로 CommonJS 방식까지 지원하는 통합 형태
`2015에서 표준 모듈시스탬` 바벨과 웹팩을 이용해 모듈 시스탬을 사용하는 것이 일반작


### ES2015 

math.js
```javascript
// export 이용해 모듈로 만들어지고
 export function sum(a, b) {
   return a + b;
 }

```

app.js
```javascript
import * as math from './math.js';
import { sum } from './math.js';

math.sum(1, 2);
```

3. 브라우저의 모듈 지원

모든 브라우져에서 모듈 시스템을 지원하지는 않는다. 인터넷 익스를 포함한 몇몇 브라우저는 여전히 모듈을 사용하지 못한다.

index.html
```html

<script type="modules" src="src/app.js"></script>

```
<script> 태그를 로딩할 때 type="text/javascript" 대신 type="module"을 사용한다.
app.js를 사용가능 해진다.
