#### 配置git

```shell
git config --global user.name 'your name'
git config --global user.email 'your email'
git config user.name #查看用户
git config user.email #查看邮箱
```

#### 生成SSH KEY

```shell
ssh-keygen -t rsa -C "xxx@git.com" #生成密匙
cd ~/.ssh #进入到.ssh目录
cat id_rsa.pub #查看ssh key
# 在git设置中添加 ssh key
```

#### 切换协议（http-ssh）

```shell
git remote set-url origin git@xxx.git
```

#### 关联远程仓库

1. clone的方式

   ```shell
   git clone git@github.com:xxx/demo.git
   ```

   这种方式可以直接使用`git fetch` ,` git pull`

2. 本地文件夹关联远程仓库

   - 远程仓库有文件的

     ```shell
     git init #初始化
     git remote add origin 仓库地址 #设置remote地址
     git branch --set-upstream-to=origin/master master #将当前分支设置为远程仓库的master分支
     git fetch
     git pull #如果不设置master分支，则需要git pull origin master
     git add .
     git commit -m'message'
     git push origin master
     ```

   - 空白项目的关联

     ```shell
     git init #初始化
     git remote add 地址 #设置remote地址
     git add . #将全部文件加入git版本管理
     git commit -m'message'
     git push
     ```

#### 撤销操作

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

#### 修改已经push的commit信息

```shell
git log #查看需要修改的提交
git rebase -i HEAD~1
git commit --amend
git rebase --continue
git push -f origin dev
```

