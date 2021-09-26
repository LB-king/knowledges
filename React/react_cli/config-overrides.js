//配置具体的修改规则

const { override, fixBabelImports, addLessLoader } = require('customize-cra')
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true, //允许js修改less
    modifyVars: { '@primary-color': '#cd0026' }
  })
)
