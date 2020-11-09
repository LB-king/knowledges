## H5







## JavaScrit







## Css









## Vue







## NodeJs







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

