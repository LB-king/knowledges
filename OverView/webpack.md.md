### webpack创建应用

5.0+版本

约定大于配置

- 树结构
- 模块
- chunk
- bundle
它是一个工具
webpack是一个模块打包器(构建工具)。主要目标是将JavaScript文件打包在一起，打包后的文件用于在浏览器中使用，但是它能够胜任转换、打包任何资源。

官网：https://webpack.docschina.org

```shell
npm init -y
```

```shell
npm install webpack webpack-cli webpack-dev-server -D
```

`webpack-dev-server:`

>  WDS打包好的main.js是托管到内存中;所以在项目根目录看不到.
>
> 但是我们可以认为在根目录中有一个main.js

loader和plugin来扩展webpack的功能

- 打包样式资源
- 打包HTML
- 打包图片
- 打包其他资源
- devServer配置与应用
- 配置可用的基本开发环境
- 生产环境优化
- 开发环境优化

问题: `webpack` 不是内部或外部命令，也不是可运行的程序或批处理文件
解决方法:

  - 全局安装`webpack`,`webpack-cli`

  - 当前项目的根目录配置一个`webpack.cmd`文件

    ```shell
    @IF EXIST "%~dp0\node.exe" (
     "%~dp0\node.exe"  "%~dp0\node_modules\webpack\bin\webpack.js" %*
    ) ELSE (
     @SETLOCAL
     @SET PATHEXT=%PATHEXT:;.JS;=;%
     node  "%~dp0\node_modules\webpack\bin\webpack.js" %*
    )
    ```

```shell
webpack --mode development # production 生产环境(代码就被压缩了，没注释)
# 样例中 
# production 1kb
# development 3kb
```

默认以`src`文件夹下的`index.js`为入口打包到 `dist`文件夹

打包完之后，运行`node dist/main.js`

### 5个核心概念 

1. `entry`
  
   - 入口，指示`webpack`以哪个文件作为入口起点开始打包，分析构建内部依赖图
   
   - 单个入口文件(简写)
   
     ```javascript
     module.exports = {
     	entry: './path/index.js'
     }
     ```
   
   - 多个入口,所有入口文件形成一个`chunk`，名称是默认的
   
     ```javascript
     module.exports = {
       entry: ['./path/a.js', './path/b.js']
     }
     ```
   
   - 多个入口第二种写法,这种写法就需要在`output`中`filename`定义为一个变量`[name].js`
   
     ```javascript
     module.exports = {
       entry: {
         a: './src/a.js',
         b: './src/b.js'
       }
     }
     ```
   
     
   
   - 写法(对象写法)
   
     ```javascript
     module.exports = {
       entry: {
         // 单个入口
         // main: './path/index.js'
         // 多个入口
         main: ['./path/a.js', './path/b.js']
       }
     }
     ```
   
2. `output`

   - 输出，指示`webpack`打包后的资源`bundles`输出到哪里，以及如何命名

     

3. `loader`

   - `loader`可以让`webpack`能够处理那些非`JavaScript`资源`css`、`img`等，将它们处理成`webpack`能够识别的资源，可以理解为一个翻译的过程(webpack自身只能理解js和json)

4. `plugins`

   - 插件，可用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

5. `mode`
   - 指`webpack`使用相应的模式配置
     - `development`:配置比较简单，能让代码本地调试运行
     - `production`:代码需要不断优化达到性能最好，能让代码优化上线运行的环境
   - 都会自动启用一些插件，生产模式启用的插件更多

```shell
webpack ./src/index.js -o ./build/build.js --mode development
# 将src文件夹下的index.js(入口文件)打包到build/main.js -o 表示output输出文件夹
```

### 配置文件

默认在项目根目录新增`webpack.config.js`;自定义js名称也可以。只不过在运行`webpack`的时候需要制定配置文件的名称`webpack --config webpack.test.js`











GCN 052 774 G1（以前叫G12），沸点是107摄氏度，冰点是零下35摄氏度









```javascript
module.exports = {
  mode: 'development', // 生产 production 开发 development
  entry: {
    main: './src/index.js' // 入口文件的对象写法
  },
  output: {
    filename: 'test.js', 
    path: path.resolve(__dirname, 'test')
  }
}
```



