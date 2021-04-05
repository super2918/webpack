# babel

#### 크로스 브라우징 
ECMAScirpt2015 모든 브라우저에서 동작하도록 호한성을 지켜준다.

#### 트렌스파일과 컴파일  

트랜스파일 추상화 수준 다른 컴파일와 달리 트랜스파일은 추상화 숮누을 유지한 상태로 코드를 반환

#### 바벨의 기본동작 

바벨은 ECMAScript2015 이상의 코드를 적당한 하위 버전으로 바꾸는 것이 주된 역할이다 인터넷 익스프로러나 구버전 브라우저에서 최신 자바스크립트 코드를 
사용할 수 있다.

**바벨 빌드**
1. 파싱(Parsing) : 코드를 읽고 추상 구문 트리(AST)로 변환하는 단계 / 빌드 작업을 처리하기에 적합한 자료구조, 컴파일러 이론에서 사용되는 개념
2. 변환(Transforming) : 추상 구문 트리를 변경하는 것 
3. 출력(Printing) : 변경된 결과물을 출력하는 것 

#### 플러그인
기본적으로 바벨은 코드를 받아서 코드를 반환한다. 바벨은 파싱과 출력만 담당하고 변환 작업은 플러그인이 처리한다.


#### 프리셋 
바벨의 목적에 따라 프리셋 제공 / 목적에 맞게 여러가지 플러그인을 세트로 모아 놓은 것이다.

* preset-env

* preset-flow
* preset-react
* preset-typestricpt

#### 타켓 브라우저 

target 옵션에 브라우저  env프리셋은 브라우저 버전에 맞는 최적화된 코드를 출력한다. 

#### 폴리필 
useBuilInts 폴리필을 사용할지 설정하는 옵션. "useage", "entry", false 세 가지 값을 사용하는데 기본값이 false여서 폴리필이 동작하지 않았던 것 이다.
폴리필 사용을 설정하였다면 > core.js도 설치를 해야 한다.

실무 환경에서는 babel-loader통해서 작업을 하는 형태 webpack에서 설정
babel-loader로 웹팩을 함께 사용하면 훨씬 단순하고, 자동화된 환경을 만들 수 있다.  바벨은 변환할 수 있는 코드만 변환을 한다. 변환하지 못하는 코드 경우는
폴리필이라는 코드 조각을 불러와 결과물에 로딩하여 사용한다.

