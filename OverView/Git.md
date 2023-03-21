#### 1.配置git

```shell
git config --global user.name 'your name'
git config --global user.email 'your email'
git config user.name #查看用户
git config user.email #查看邮箱
```

#### 2.生成SSH KEY

```shell
ssh-keygen -t rsa -C "xxx@git.com" # 生成密匙
cd ~/.ssh # 进入到.ssh目录
cat id_rsa.pub # 查看ssh key
# 在git设置中添加 ssh key
```

#### 3.切换协议（http-ssh）

```shell
git remote -v # 查看信息
git remote set-url origin git@xxx.git
# 或者
git remote rm origin
git remote add origin git@xxx.git
```

#### 4.关联远程仓库

1. clone的方式

   ```shell
   git clone git@github.com:xxx/demo.git
   ```

   这种方式可以直接使用`git fetch` ,` git pull`

2. 本地文件夹关联远程仓库

   - 远程仓库有文件的

     ```shell
     git init # 初始化
     git remote add origin 仓库地址 # 设置remote地址
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

#### 5.撤销操作

- 没有`git add`的情况，回到最近一次commit的情况

  ```shell
  git checkout readme.txt
  ```

- 已经`git add`(未commit)的情况，回到最近一次add的情况

  ```shell
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

- 已经`commit`的情况

  ```shell
  git reset --soft HEAD^
  git reset HEAD readme.txt
  git checkout readme.txt
  ```

#### 6.修改已经push的commit信息

```shell
git log # 查看需要修改的提交
git log --oneline # 日志一行显示
git rebase -i HEAD~1  #修改最近一次
git commit --amend
git rebase --continue
git push -f origin dev
```

#### 6-1.修改历史commit信息

```shell
git rebase -i HEAD~n  #历史记录修改
#把需要修改的那一次提交前面的 pick 改为 edit
git commit --amend # wq-保存  q-不修改保存  加！表示强制保存
git rebase --continue
git push -f origin branch-name #同步到远程分支

```



#### 7.撤回已经commit的问题

```shell
git reset --soft HEAD^ # 成功撤销了commit操作，写的代码仍然保留
HEAD^ 的意思是上一个版本，也可以写成HEAD~1
--mixed 不删除工作空间改动代码，并且撤销git add .操作
--soft 不删除工作空间改动代码，撤销commit，不撤销git add
--hard 删除工作空间改动代码，撤销commit，撤销git add,完成这个操作后，就恢复到了上一次的commit状态
```

#### 8.合并分支

```shell
git branch
git checkout -b fenzhi # 创建一个分支
git checkout dev
git merge fenzhi
git push origin dev # 将fenzhi合并到dev
git checkout -b dev1 origin dev1 #创建dev分支与远程dev分支关联，内容也会切换
```

#### 9.gitk乱码问题

```shell
git config --global gui.encoding utf-8
```

#### 10.删除分支

```shell
git push origin --delete ding
git remote prune origin # 删除不存在的远程分支
git branch -D ding # 删除本地分支
```

#### 11.本地&远程分支

```shell
git remote set-head origin my-test # 设置origin/HEAD
git remote show origin # 查看remote分支
git checkout -b test # 创建、切换分支
git checkout -b test origin/test # 创建test分支并与远程test分支同步
git branch -vv
git branch -u origin/branch-name # 本地分支追踪远程分支
git branch --track remotes/origin/ding # 切换远程分支
```

#### 12.gitbash快捷键

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

#### 13.当前HEAD

```powershell
cat .git/HEAD
```

#### 14.忽略已经提交过的文件

这里就是忽略js这个文件夹

```shell
git rm -r --cached OverView/code/js/
git add .
git commit -m"xxx"
git push origin master
```

#### 15.git clone慢

> 使用插件加速，下载下来之后，再更换项目的远程地址

插件：github加速

#### 15_1.https变为ssh

下载仓库之后，由于是https下载的，改成ssh会更加方便一点

```shell
git remote -v
#结果如下
origin  https://github.91chi.fun/https://github.com/xx/notes.git (fetch)
origin  https://github.91chi.fun/https://github.com/xx/notes.git (push)
#https -> ssh
git remote rm origin
git remote add origin git@github.com:xxx/demo.git
git push origin master
```

#### 16.解决冲突

```shell
git merge --abort
//再拷贝代码，拉代码，合并，提交
```

#### 17.乱码问题

- `git status`中文文件名字显示乱码 `\346\260\264\345\215\260.html`

	```shell
	git config --global core.quotepath false
	```

- 
