## H5

### video/audio

```html
<audio src="等你下课.mp3" controls ></audio>
<video src="video.mp4" controls></video>
```

- `<video>`标签定义视频，其他电影片段或其他视频流:MP4、WebM、Ogg
  - `controls` 显示控件，比如播放按钮
  - `autoplay`
  - `loop`
- `<audio>`标签定义音频:MP3、Wav、Ogg
  - `controls`
  - `autoplay`
  - `loop`

### canvas画布

### geolocation定位

**---------------------------------------------------------------------------------------------------------------------**

## JavaScrit

### RegRex

- 正则实现千分位

  ```javascript
  let num = '123456'
  num.replace(/(?=(?!\b)(\d{3})+$)/g, ',')
  ```

  

**---------------------------------------------------------------------------------------------------------------------**

## Css

### 动画

- `keyframes`

  ```css
  @keyframes move{
    0% {
      margin-left: 0;
      transform: rotate(0);
    }
    50% {
      margin-left: 100px;
      transform: rotate(180deg)
    }
    100% {
      margin-left: 0;
      tansform: rotate(360deg)
    }
  }
  .animate-box {
    animation: move 5s infinite;
  }
  /*transition*/
  .box {
    width: 200px;
    transition: all .3s linear;
  }
  .box:hover {
    width: 220px;
  }
  ```

- .`transition `

  ```css
  .transition {
    width: 100px;
    transition: all .3s linear;
    cursor: pointer;
  }
  ```

- `transform`

  css3提供了元素变形效果。旋转，缩放，平移

  ```css
  .t {
    transform: rotate(7deg) translate(40px, 30px) skew(10deg, 1deg);
  }
  ```

### 响应式

- media

  ```css
  @media screen and (min-width: 1280px) {
    .box {
      width: 30%;
    }
  }
  ```

### less

- 公用属性

  ```less
  .mix-style {
  	height: 10px;
  }
  .main {
  	.mix-style;
  }
  ```

### CSS3新特性

- `border-color`

  ```css
  .m {
    border-color:  red green blue yellow; // 上 右 下 左
  }
  ```

- `border-image`(IE11-不支持此属性)

  ```css
  .m{
    border-image: url(./favicon.png) 30 30 round;
  }
  /*
  border-image-source	用在边框的图片的路径。	
  border-image-slice	图片边框向内偏移。	
  border-image-width	图片边框的宽度。	
  border-image-outset	边框图像区域超出边框的量。	
  border-image-repeat	图像边框是否应平铺(repeat)、铺满(round)或拉伸(stretched)
  */
  ```

- `border-radius` 圆角边框

- `box-shadow` 阴影效果

- `background-size` 背景图片尺寸

- `background-origin` 指定背景图片从哪里开始显示(背景图片可以置放于content-box,padding-box或border-box区域)

- `background-clip` 指定背景图片从什么位置开始裁剪

  ```css
  .m{
    background-clip: content-box;
  }
  ```

- `text-shadow` 文本阴影

  ```css
  .m {
    text-shadow: 3px 3px #00f;
    text-shadow: 2px 2px 2px #ccc, 3px 3px 3px #00f;
  }
  ```

  - 颜色和模糊半径是可选的，颜色未指定的时候，将使用文本颜色；模糊半径未指定时，值为0
  - 可以是逗号分隔的列表：`text-shadow: 2px 2px 2px #ccc, 3px 3px 3px #00f;`
  - 阴影可能会跑到容器之外，但是不会影响容器的大小

- `word-wrap:break-word` 自动换行

  单词太长的话就可能无法超出某个区域，允许对长单词进行拆分，并换行到下一行

**---------------------------------------------------------------------------------------------------------------------**

## Vue

**---------------------------------------------------------------------------------------------------------------------**

## NodeJs

**---------------------------------------------------------------------------------------------------------------------**

## Git

### 配置

```shell
git config --gloal user.name 'your name'
git config --global user.email 'your email'
git config user.name # 查看用户
git config user.email # 查看邮箱
```

### SSH KEY

```shell
ssh-keygen -t rsa -C 'xxx@git.com' # 生成密匙
cd ~/.ssh # 进入到.ssh目录
cat id_rsa.pub # 查看ssh key
# 在git中添加key
```

### 切换协议

```shell
git remote -v # 查看信息
git remote set-url origin git@xxx.git
# or
git remote rm origin
git remote add origin git@xxx.git
```

### 关联远程仓库

- clone的方式

  ```shell
  git clone git@github.com:xxx/demo.git
  ```

  这种方式可以直接使用`git fetch ,git pull`

- 本地文件夹关联远程仓库

  - 远程仓库有文件的

    ```shell
    git init # 初始化
    git remote add origin address # 设置remote地址
    git branch --set-upstream-to=origin/master master # 将当前分支设置为远程仓库的master分支
    git fetch
    git pull # 如果不设置master分支，则需要git pull origin master
    git add .
    git commit -m'message'
    git push origin master
    ```

  - 空白项目的关联

    ```shell
    git init # 初始化
    git remote add 地址 # 设置remote地址
    git add . # 将全部文件加入git版本管理
    git commit -m 'message'
    git push
    ```

### 撤销操作

- 没有`git add`，回到最近一次commit的情况

  ```shell
  git checkout readme.md
  ```

- 已经`git add(未commit)`,回到最近一次add的情况

  ```shell
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

- 已经`commit`

  ```shell
  git reset --soft HEAD^
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

### 修改已经push的commit信息

```shell
git log # 查看需要修改的提交
git log --oneline # 日志一行显示
git rebase -i HEAD~1
git commit --amend
git rebase --continue
git push -f origin dev
```

### 合并分支

```shell
git branch 
git checkout -b fenzhi # 创建一个新的分支
git checkout dev
git merge fenzhi
git push origin dev # 将分支合并到dev
git checkout -b dev1 origin dev1 # 创建dev1分支与远程dev1分支关联，内容也会切换
```

### gitk乱码问题

```shell
git config --global gui.encoding utf-8
```

### 删除分支

```shell
git push origin delete ding # 删除远程分支
git branch -D ding # 删除本地分支
git remote prune origin # 删除不存在的远程分支
```

### 本地、远程分支

```shell
git remote set-head origin my-test # 设置origin/HEAD
git remote show origin # 查看remote分支
git checkout -b test # 创建、切换分支
git checkout -b test origin/test # 创建test分支并与远程test分支同步
git branch -vv
git branch -u origin/branch-name # 本地分支追踪远程分支
git branch --track remotes/origin/ding # 切换远程分支
```

### gitbash快捷键

- `ctrl + L`  = 清屏
- `ctrl + R` = 查找历史记录，输入keyword多次`ctrl + R`可返回下一匹配项
- `ctrl + A` = 跳转至行首
- `ctrl + E` = 跳转至行尾
- `touch` = 新建文件
- `rm` = 删除文件
- `mkdir` = 新建文件夹
- `rmdir` = 删除文件夹
- `rm -r` = 删除文件夹(recusive)
- `mv` = 移动文件
- `pwd` = 展示工作目录
- `ls -ah` = 查看隐藏文件
- `git log -2 --pretty=oneline` 查看2条log数据

### 当前HEAD

```shell
car .git/HEAD
# 用HEAD表示当前版本，上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
git reset --hard HEAD^(返回到上个版本)
git reset --hard 66a2 (返回到指定版本)
git reflog ---(用来记录每一次的命令)
```

### 暂存区

```shell
git add # 把文件加进去，实际上就是把文件修改添加到暂存区
git commit # 提交修改，实际上就是把暂存区的内容提交到当前分支
git diff HEAD readme.txt # 查看文件修改的内容
git checkout 3c9cfd320fe7 src/test.vue # 某个文件恢复到指定的版本
```

### 删除文件

```shell
git add test.txt
git commit -m'add'
git push origin master
rm test.txt
git rm test.txt
git commit -m"del"
git push origin master
```

**---------------------------------------------------------------------------------------------------------------------**

## npm

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

**---------------------------------------------------------------------------------------------------------------------**

## 跨终端



**---------------------------------------------------------------------------------------------------------------------**

## 实用工具

- 截屏软件GIF：GifCam :https://gifcam.softonic.cn/download