const path = require("path");
const MyPlugin = require("./myplugin");


module.exports = {
  mode : "development",
  entry : {
    main : "./src/app.js"
  },
  output: {
    filename: "[name].js", // 번들링된 파일 명
    path: path.resolve("./dist") // 절대 경로 계산해 주는 resolve를 사용해서 작업
  },
  module: {
    rules: [ 
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 10000 // 5kb 미만 파일 data-url 처리
        }
      }
    ]
  }, 
  plugins: [
    new MyPlugin()
  ]
}


/*
  터미널의 옵션 
  mode, entry, output 

  mode: "development" 문자열을 사용했다.
  entry: 어플리케이션 진입점인 src/app.js로 설정한다.
  output: 설정한 `[name]`은 entry에 추가한 main문자열로 들어오는 방식이다.
  ** `output.path`는 절대 경로를 사용하기 때문에 path모듚의 resolve()함수를 사용해서 계산한다.
  (path는 노드 코어 모듈 중 하나로 경로를 처리하는 기능을 한다.)

*/