const path = require('path');
const webpack = require('webpack');
const childPross = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


process.env.NODE_ENV ==  process.env.NODE_ENV || 'development';

module.exports = {
  mode : 'development',
  entry : {
    main : './src/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve("./dist") // 절대 경로 계산해 주는 resolve를 사용해서 작업
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader// 프로덕션 환경
          : "style-loader",  // 개발환경
          "css-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          // publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 10000 // 5kb 미만 파일 data-url 처리
        }
      },
      {
        test: /\.js$/, 
        exclude: /node_modules/, // 사용하는 라이브러리가 많을수록 바벨 로더가 느리게 동작 > modules 폴더가 로더를 처리하지 않도록 제외
        loader: "babel-loader" // babel-loader 추가 
      }
    ]
  }, 
  plugins: [
    new webpack.BannerPlugin({
      banner: () => {
        const commit = childPross.execSync('git rev-parse --short HEAD');
        const user = childPross.execSync('git config user.name');
        const date = new Date().toLocaleString();

        return `commitVersion : ${commit}\n`+`Build Date: ${date}\n`+`Author: ${user}`
      }
    }), 
    // new webpack.DefinePlugin({
    //   VERSION: JSON.stringify("v.1.2.3"),
    //   PRODUCTION: JSON.stringify(false),
    //   MAX_COUNT: JSON.stringify(999),
    //   "api.domain": JSON.stringify("http://dev.api.domain.com")
    // }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      templateParameters: { // 템플릿 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '개발용' : ''
      },
      minify : process.env.NODE_ENV === 'production' ? { // 개발용이랑 배포용이랑 다른게 
        collapseWhitespace: true, // 빈칸 제거
        removeComments: true, // 주석제거
        hash: true // 정적 파일을 불러올때 쿼리 문자열에 웹팩 헤쉬값을 추가
      } : false
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
    ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
    : []),
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