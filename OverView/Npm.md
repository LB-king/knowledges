###A. npm

全称（Node Package Manager 即node包管理工具）

快速删除node_modules文件夹

```shell
rimraf node_modules
```

### 1.安装

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 // 出现此情况的解决办法
npm config set proxy null
npm ls // 查看包安装目录列表
```

- 查看镜像的配置结果

  ```shell
  npm config get registry # 默认是：https://registry.npmjs.org/ 因此可以设置成淘宝镜像
  npm config set registry https://registry.npm.taobao.org # 设置淘宝镜像
  npm config set registry https://registry.npmjs.org # 回退初始化设置
  npm config get disturl
  ```

- 设置缓存目录

  ```shell
  npm config get cache # 获取缓存目录
  npm config set cache "d:/cache" # 设置
  npm config get prefix # 包安装目录
  npm config set prefix "d:/cache"
  ```

### 2.常用命令：

```shell
npm help <command> # 可以查看某条命令的详细帮助
npm update <package> # 可以把当前目录下`node_modules`子目录里对应的模块更新至最新版本
npm update <package> -g # 全局更新
npm cache clear # 可以清空npm本地缓存
npm publish # 发布？(未曾使用)
npm install vue@2.6.2 # 下载指定版本的vue
npm list -g # 查看全局所有安装的模块
npm list vue # 查看某个模块的版本号
npm install <package> # 不加后缀-save,--S,-S 在package文件的dependencies节点写入依赖
npm install <package> # -save-dev,-D,--D在package文件的devDependencies节点写入依赖
#dependencies:运行时的依赖，发布后，即生产环境下还需要用的模块
#devDependencies:开发时的依赖，里面的模块是开发时用的，发布时用不到它，例：gulp，压缩css，js的模块。
```

### 3.配置文件

- 快速配置

  ```shell
  npm init -y | --yes
  ```

- 生成基本配置`package.json`

  ```json
  {
    "name": "npm",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "dependencies": {
      "vue": "^3.0.4"
    }
  }
  ```

  - `name`: 包的名字
  - `version`: 版本名
  - `description`: 描述
  - `main`: 字段指定了程序的主入口文件，require('moduleName')就会加载这个文件。这个字段的默认值是模块根目录下面的index.js。

  `^X.Y.Z`: `^`更新最新的版本,Y,Z都更新

  `~X.Y.Z: `^`更新Z

  `X.Y.Z`: 固定版本号

  `"debug: ">=2.6.9"`

  同理：`>`,``>=``,``<=``,`<`

版本号：语义版本号分为X,Y,Z三位，分别代表主版本号，次版本号，补丁版本号

- 如果只是修复bug，需要修改Z位
- 如果是新增了功能，但是向下兼容，需要更新Y位
- 如果有大变动，向下不兼容，需要更新X位

常用命令：



**---------------------------------------------------------------------------------------------------------------------**

### B.yarn

安装：https://classic.yarnpkg.com/zh-Hans/docs/install#windows-stable

| NPM                      | YARN                 | 说明               |
| :----------------------- | :------------------- | :----------------- |
| npm init                 | yarn init            | 初始化某个项目     |
| npm install/link         | yarn install/link    | 默认的安装依赖操作 |
| npm install vue --save   | yarn add vue         | 安装某个依赖       |
| npm uninstall vue --save | yarn remove vue      | 移除某个依赖项     |
| npm update vue --save    | yarn upgrade vue     | 更新某个依赖项     |
| npm install cnpm -g      | yarn global add cnpm | 安装全局依赖       |

安装项目的全部依赖项：yarn || yarn install