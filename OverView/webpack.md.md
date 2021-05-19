### webpack 创建应用

5.0+版本

约定大于配置

- 树结构
- 模块
- chunk
- bundle
  它是一个工具
  webpack 是一个模块打包器(构建工具)。主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但是它能够胜任转换、打包任何资源。

官网：https://webpack.docschina.org

```shell
npm init -y
npm install webpack webpack-cli webpack-dev-server -D
```

`webpack-dev-server:`

> WDS 打包好的 main.js 是托管到内存中;所以在项目根目录看不到.
>
> 但是我们可以认为在根目录中有一个 main.js

loader 和 plugin 来扩展 webpack 的功能

- 打包样式资源
- 打包 HTML
- 打包图片
- 打包其他资源
- devServer 配置与应用
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

### 5 个核心概念

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

   - 特殊写法(混合的写)

     ```javascript
     module.exports = {
       entry: {
         a: ['./src/a.js', './src/b.js'],
         b: './src/index.js'
       }
     }
     ```

2. `output`

   - 输出，指示`webpack`打包后的资源`bundles`输出到哪里，以及如何命名

     ```javascript
     module.exports = {
       output: {
         filename: 'js/[name].js', // 这种写法是变量的写法，默认是main.js,可在文件名前添加文件夹.
         path: path.resolve(__dirname, 'bundle')
       }
     }
     ```

3. `loader`

   - `loader`可以让`webpack`能够处理那些非`JavaScript`资源`css`、`img`等，将它们处理成`webpack`能够识别的资源，可以理解为一个翻译的过程(webpack 自身只能理解 js 和 json)

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

### 运行命令

```shell
webpack --progress # 显示打包的进程(百分比)
webpack ./src/index.js -o ./build/build.js --mode development
# 将src文件夹下的index.js(入口文件)打包到build/main.js -o 表示output输出文件夹
```

### 配置文件

默认在项目根目录新增`webpack.config.js`;自定义 js 名称也可以。只不过在运行`webpack`的时候需要制定配置文件的名称`webpack --config webpack.test.js`

```javascript
module.exports = {
  mode: 'development', // 生产 production 开发 development
  //entry: './src/index.js',
  //entry: ['./src/index.js', './src/a.js'],
  entry: {
    main: './src/index.js' // 入口文件的对象写法
  },
  output: {
    filename: 'test.js',
    // filename: '[name].js',采用变量的方式
    path: path.resolve(__dirname, 'test')
  }
}
```

### 打包html资源

使用插件对html文件进行处理(html-webpack-plugin)

- 使用步骤：1.下载 2.引入 3.使用

- 下载安装：npm install html-webpack-plugin -D

- 引入插件：

- 使用插件：

  ```javascript
  const HtmlWebpackPlugin = require('html-webpack-plugin) // 引入
  module.exports = {
    // 默认会创建一个空的HTML文件，自动引入打包输出的所有资源(JS/CSS)
    // 通过参数可以输出有结构的html资源                          
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // 模板文件
        filename: 'html/demo.html', // 打包后的文件名，可以在前面添加文件夹
        chunks: ['home', 'vendor'], //entry里面的vendor,这些公共的资源需要写在前面。这样在打包后的文件中就会先引入库，再引入自己定义的方法js以及每个模块的js
        minify: {
          collapseWhitespace: true, //是否去掉空格
          removeComments: true //移除注释
        }
      })
    ]
  }
  ```

  `html-webpack-plugin`插件生成的内存中的页面已经帮我们创建并正确引用了打包编译生成的资源(JS/CSS)

### 打包css资源

需要下载安装两个louder帮我们完成打包

```shell
npm install css-loader style-loader -D
```

1. `css-loader`的作用是处理`css`中的`@import`和`url`这样的外部资源
2. `style-loader`的作用是把样式插入到`dom`中，方法是在`header`中插入一个`style`标签，并把样式写入到这个标签的`innerHTML`里。

```javascript
module.exports = {
  module: {
    rules: [
      // {loader: 'css-loader'}
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //从右向左
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
}
```

### 打包less或sass

- 由于css只是单纯的属性描述，它并不具有变量、条件语句等，所以难组织和维护

- sass和less都属于css预处理器，定义了一种新的语言，其基本思想是用一种专门的编程语言，为css增加一些编程的特性，将css作为目标生成文件，然后开发者使用这种语言进行css编码工作

- less需要`less`和`less-loader`

  ```shell
  npm install less less-loader -D
  ```

- sass需要`node-sass`和`sass-loader`

  ```shell
  npm install node-sass sass-loader -D
  ```

### 提取css为单独文件

css内容是打包在js文件中的，可以使用`mini-css-extract-plugin`插件提取成单独的CSS文件。

```shell
npm install mini-css-extract-plugin -D
```

- 引入插件

  ```javascript
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  module.exports = {
    
    module: {
      rules: [
        {test:/\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader']},
        {test:/\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']}
      ]
    },
    plugins: [
    	new MiniCssExtractPlugin({
        filename: '[name].css' //只能打包成一个css文件，后面需要优化，打包成一个一个文件
      })
    ]
  }
  ```

- 在`plugins`中使用插件

- 在`css`的`rules`中，使用`MiniCssExtractPlugin`取代`style-loader`,提取js中的Css内容为单文件

### 处理css兼容性

需要用`postcss`处理，下载两个包`post-loader`和`postcss-preset-env`

```shell
npm install postcss-loader postcss-preset-env -D
```

webpack.config.js配置：

```javascript
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] }
    ]
  }
}
```

- `postcss`会找到`package.json`中的`browserslist`里面的配置，通过配置加载`css`的兼容性

- 修改`loader`的配置，新版需要写`postcss.config.js`

  ```javascript
  module.exports = {
    plugins: [
      require('postcss-preset-env')()
    ]
  }
  ```

### 压缩css文件

使用optimize-css-assets-webpack-plugin插件压缩css内容

```shell
npm install optimize-css-assets-webpack-plugin -D
```

- 引入插件

- 使用插件

  ```javascript
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  module.exports = {
    plugins: [
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
  ```

  注释和空格都默认去掉了。

### 打包img(del)

```shell
npm install url-loader file-loader -D
```

- 在css文件中使用

  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.(jpg|jpeg|png|gif)$/,
          use: {
            loader: 'url-loader',// url-loader基于file-loader,因此要先安装file-loader
            options: {
              publicPath: './images',
              outputPath: 'images/',
              limit: 1024 * 20, // 将20KB以下的图片打包时以base64的格式处理
              name:'[name].[hash:8].[ext]'
            }
          }
        }
      ]
    }
  }
  ```

  

- 在html文件使用

  ```html
  <img src="./a.jpg">
  ```

### 其他资源

`webpack5`打包其他资源已经可以不用到`file-loader`与`url-loader`,可以通过`assets module type`处理

https://blog.csdn.net/lin_fightin/article/details/115140736

- `asset/resource` 发送一个单独的文件并导出URL，代替`file-loader`

- `asset/inline` 导出一个资源的data URL, 替代 url-loader

  因为没有生成文件，所以没有`generator`属性。

- `asset/source` 导出资源的源代码。代替`raw-loader`

- `asset`在导出一个`data URL`和发送一个单独的文件之间做选择，之前通过`url-loader+limit`属性实现。

```javascript
module.exports = {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'imgs/[name].[hash:8][ext]' // assetModuleFilename直接把ext加了一个.
  },
  module: {
    rules: [
       {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset'
       }
    ]
  }
}
```

指定打包资源的目录：两种方法

1. 在`output`中配置`assetModuleFilename`，详见上述代码
2. 在每一个`type`值后面配置`generator`属性,如下

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'imgs/[name].[hash:8].[ext]'
        },
        // 使用limit的方法,在parser属性中配置
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      }
    ]
  }
}
```

