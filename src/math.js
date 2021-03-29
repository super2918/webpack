// 일반적으로 함수를 선언할때
// function sum(a, b) {
//   return a + b;
// }

// IIFE 모듈
/*
var math = math || {}; // 전역 네임스페이스 선언 math가 있으면 math를 선언하고 아니면 빈 객체를 반환해라 

;(function() {
  function sum(a, b) {
    return a + b;
  }

  math.sum = sum; // 외부에서 사용해야하기 떄문에 전역 변수 math라는  sum을 할당을 한다.

})();
*/

// ES2015
export function sum(a, b) {
  return a + b;
}