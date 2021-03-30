// class로 정의  
class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap( 'My Plugin', status => {
      console.log('My Plugin: done')
    })

    compiler.plugin("emit", (compilation, callback) => {
      const source = compilation.assets["main.js"].source() // 소스에 접근을 가능한 
      // console.log(source)

    compilation.assets["main.js"].source = () => {
      const banner = [
        '/**',
        ' * BannerPlugin 처리한 결과이다.',
        ' * Build Date : 2020.03.30',
        ' */'
      ].join('\n');

      return banner + '\n\n' + source
    }
      callback()
    })
  }
}

module.exports = MyPlugin;