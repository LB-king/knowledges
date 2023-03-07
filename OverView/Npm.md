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
npm list vue -g # 查看某个模块的版本号
npm install <package> # 不加后缀-save,--S,-S 在package文件的dependencies节点写入依赖
npm install <package> # -save-dev,-D,--D在package文件的devDependencies节点写入依赖
#dependencies:运行时的依赖，发布后，即生产环境下还需要用的模块
#devDependencies:开发时的依赖，里面的模块是开发时用的，发布时用不到它，例：gulp，压缩css，js的模块。
rm test.txt # 删除文件
rm -r test # 删除文件夹
mkdir filename # 创建文件夹
touch test.txt # 创建文件
vi test.txt # 编辑文件

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

  `~X.Y.Z`: `~` 更新Z

  `X.Y.Z`: 固定版本号

  `"debug": ">=2.6.9"`

  同理：`>`,``>=``,``<=``,`<`

版本号：语义版本号分为X,Y,Z三位，分别代表主版本号，次版本号，补丁版本号

- 如果只是修复bug，需要修改Z位
- 如果是新增了功能，但是向下兼容，需要更新Y位
- 如果有大变动，向下不兼容，需要更新X位

### 4.静态资源管理库

在线地址：https://cdn.baomitu.com

### 5.npx

npx想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了测试工具Mocha。

一般来说，调用Mocha，只能在项目脚本和package.json的`scripts`字段里，如果想在命令行下调用。必须像下面这样：

```shell
node-modules/.bin/mocha --vesion
```

npx就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面调用就行：

```shell
npx mocha --version
```

npx将包下载到一个临时目录，使用后再删除。所以以后再执行上面的命令，会重新下载某个包。

--no-install参数和--ignore-existing

- 如果想让npx强制使用本地模块，不下载远程模块，可以使用**--no-install**。如果本地不存在该模块，就会报错。

  ```shell
  npx http-server
  npx --no-install http-server
  ```

- 如果想让npx强制使用远程模块，可以使用**--ignore-existing**

  ```shell
  npx --ignore-existing http-server
  ```

### 6.nrm

npm registry manager

npm的镜像源管理工具

```shell
nrm ls
	*npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```

带*号的是当前使用的源

- 切换

  ```shell
  nrm use taobao
  ```

- 增加

  ```she
  nrm add registry http://registry.npm.frp.trmap.cn/
  ```

- 删除

  ```shell
  nrm del <registry>
  ```

- 测试速度

  ```shell
  nrm test npm
  ```

### 7.babel

```shell
npm install babel-cli babel-core babel-preset-es2015 babel-plugin-transform-runtime babel-preset-stage-2 --save-dev
```

新建`.babelrc`配置文件,新建src，lib文件夹

```jso
{
	"presets": ["es2015","stage-2"], //设置转码规则
	"plugins": ["transform-runtime"] //设置插件
}
```

配置`package.json`

```shell
"scripts": {
	"build": "babel src -w -d lib"
}
# 将src文件夹中的js文件编译到es5存到lib文件夹。包括其中的文件里的js文件。src文件要存在，lib文件夹无要求。 否则就会报错
# -w就是-watch的意思。监听文件，实时编译输出
# -d就是dir
```

**---------------------------------------------------------------------------------------------------------------------**

### B.yarn

safe,stable,reproducible projects

Yarn是由`Facebook`,`Google`,`Exponent`和`Tilde`联合推出了一个新的JS包管理器，正如官方文档中写的，Yarn是为了弥补npm的一些缺陷而出现的。NPM5以下：

- npm install 的时候慢
- 同一个项目，多人开发时，由于安装的版本不一致出现bug

官网：www.yarnpkg.com

安装：https://classic.yarnpkg.com/zh-Hans/docs/install#windows-stable

```shell
npm install yarn -g
yarn --version
```



| NPM                      | YARN                 | 说明               |
| :----------------------- | :------------------- | :----------------- |
| npm init                 | yarn init            | 初始化某个项目     |
| npm install/link         | yarn install/link    | 默认的安装依赖操作 |
| npm install vue --save   | yarn add vue         | 安装某个依赖       |
| npm uninstall vue --save | yarn remove vue      | 移除某个依赖项     |
| npm update vue --save    | yarn upgrade vue     | 更新某个依赖项     |
| npm install cnpm -g      | yarn global add cnpm | 安装全局依赖       |

cli配置：https://yarnpkg.com/cli/add

基本命令：

```shell
yarn config get <name>
yarn config get npmAuthToken --no-redacted
yarn config set initScope myScope
yarn config unset initScope
#源分支
yarn config set registry https://registry.npm.taobao.org -g
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g

yarn init 
yarn install # 安装package.json里所有包，并将包及它的所有依赖项保存进yarn.lock
yarn install --flat # 安装一个包的单一版本
yarn install --force # 强制重新下载所有包
yarn install --production # 只安装dependencies里的包
yarn install --no-lockfile # 不读取或生成yarn.lock
yarn install --pure-lockfile # 不生成yarn.lock
yarn add [package] # 在当前的项目中添加一个依赖包，会自动更新到package.json和yarn.lock文件中
yarn add [package]@[version] # 安装指定版本的包，这里指的是主要版本，如果需要精确到小版本，使用-E参数
yarn add --dev/-D # 加到devDependencies
yarn add --peer/-P # 加到peerDependencies
yarn add --option/-O # 加到optionalDependencies
yarn add --exact/-E # 安装包的精确版本。例如yarn add foo@1.2.3会接收1.9.1，但是yarn add foo@1.2.3 --exact 只会接收1.2.3版
yarn run 用来执行在package.json中scripts属性下定义的脚本
yarn info <packageName> # 显示某个包的信息
yarn cache list
yarn cache dir # 返回 全局缓存位置
yarn cache clean # 清除缓存
```

| Definition      | Description                                                  |
| :-------------- | :----------------------------------------------------------- |
| `--json`        | Format the output as an NDJSON stream<br />将输出格式化为NDJSON流 |
| `--no-redacted` | Don't redact(编辑) secrets (such as tokens) from the output  |

Yarn的优点：

- 速度快
- 安装版本统一
- 更简洁的输出
- 多注册来源处理
- 更好的语义化