### webpack创建应用

5.0+版本

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

问题: 'webpack' 不是内部或外部命令，也不是可运行的程序或批处理文件
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
```

默认以`src`文件夹下的`index.js`为入口打包到 `dist`文件夹

打包完之后，运行`node dist/main.js`