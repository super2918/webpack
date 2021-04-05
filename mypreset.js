// 목적에 맞는 플러그인을 하나의 프리셋으로 만듬
module.exports = function mypreset() {
  return {
    plugins: [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-block-scoping",
      // "@babel/plugin-transform-strict-mode",
    ]
  }
}