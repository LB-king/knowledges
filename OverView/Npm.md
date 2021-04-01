## npm

全称（Node Package Manager 即node包管理工具）

- 安装

```shell
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 // 出现此情况的解决办法
npm config set proxy null
npm ls // 查看包安装目录列表
```

版本号：语义版本号分为X,Y,Z三位，分别代表主版本号，次版本号，补丁版本号

- 如果只是修复bug，需要修改Z位
- 如果是新增了功能，但是向下兼容，需要更新Y位
- 如果有大变动，向下不兼容，需要更新X位

常用命令：

```shell
# npm help <command> 可以查看某条命令的详细帮助
# npm update <package> 可以把当前目录下`node_modules`子目录里对应的模块更新至最新版本
# npm update <package> -g 全局更新
# npm cache clear 可以清空npm本地缓存
npm publish # 发布？(未曾使用)
```

设置缓存的目录：

```shell
npm config get cache # 获取缓存目录
npm config set cache "d:/cache" # 设置
npm config get prefix # 包安装目录
npm config set prefix "d:/cache"
```

快速删除node_modules文件夹

```shell
rimraf node_modules
```



**---------------------------------------------------------------------------------------------------------------------**

## yarn

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