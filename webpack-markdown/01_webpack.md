## webpack

### 프로젝트 초기화

1. Node.js를 설치한 후 진행한다.

2. Webpack 기본구성 진행
  - `webpack` 과 `webpack-cli` 전역 설치  
  - `npm init`으로 `packge.json` 생성  
  

  ```
  $ mkdir webpck
  $ cd webpack
  $ npm init -y 

  ```

### packge.json

```json

// package.json

{
  "name": "webpack",
  "version": "1.0.0",
  "description": "1. 프론트엔드 개발에 Node.js가 필요한 이유  - 최신 스펙 개발  - 빌드 자동화   - 개발 환경을 커스터마이징   - 개발툴을 자동화된 도구를 사용할 수 없는 환경에서 작업할 경우",
  "main": "index.js",
  "scripts": { 
    // echo자동화할 수 있는 shell script 명령어를 입력한다.
    "test": "echo \"Error: no test specified\" && exit 1"
    "build": "echo \"여기에 스크립트를 추가합니다\"" // 추가적인 스크립트를 적어서 넣는다.
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/super2918/webpack.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/super2918/webpack/issues"
  },
  "homepage": "https://github.com/super2918/webpack#readme"
}

```

### 명령어를 실행시

```
npm install        install all the dependencies in your project
npm install <foo>  add the <foo> dependency to your project
npm test           run this project's tests
npm run <foo>      run the script named <foo>
npm <command> -h   quick help on <command>
npm -l             display usage info for all commands
npm help <term>    search for help on <term>
npm help npm       more involved overview

```
### 기본적인 commands 목록
```
All commands:

  access, adduser, audit, bin, bugs, cache, ci, completion,
  config, dedupe, deprecate, dist-tag, docs, doctor, edit,
  exec, explain, explore, find-dupes, fund, get, help, hook,
  init, install, install-ci-test, install-test, link, ll,
  login, logout, ls, org, outdated, owner, pack, ping, prefix,
  profile, prune, publish, rebuild, repo, restart, root,
  run-script, search, set, set-script, shrinkwrap, star,
  stars, start, stop, team, test, token, uninstall, unpublish,
  unstar, update, version, view, whoami
```