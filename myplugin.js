// s
module.exports = function myplugin() {
  return  {
    // visitor : {
    //   Identifier (path) {
    //     const name = path.node.name;
    //     // 바벨이 만든 AST 노드르 출력한다.
    //     console.log("Identifier() name:" , name)

    //     // 변환작업: 코드 문자열을 역순으로 변홚한다.
    //     path.node.name = name
    //     .split('')
    //     .reverse()
    //     .join('')
    //   }
    // }

    visitor: {
      // 익스 되도록 const => var로 변경하는 플러그인
      //https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) {
        console.log("variableDecalaration() kind:", path.node.kind) // const 

        if(path.node.kind === "const") {
          path.node.kind = "var"
        }
      }
    }
  }
}