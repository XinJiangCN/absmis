# 常用文档
## URL名称信息
点击[这里](https://github.com/JasonJiangCN/absmis/blob/master/URLinfo.md)来查看URL的定义以及具体信息

# 关注本项目
右上角的Star和Watch可以都点一下，这样每次打开Github主页右下角就能快速进入项目了
# Merge Master分支到当前工作分支
有时候master分支有些很重要的改动需要同步，请先使用
```
git pull origin master
#向服务期端请求master分支最新的数据并合并到本地自己的分支上
```
这样就可以把master分支上最新的功能合并到自己的分支上

请不要对自己任以外的内容进行任何改动，以免造成冲突无法合并
#注意
请时刻关注自己在哪个分支上工作，不要随便改动其他文件！！
# 推送部分文件到远端仓库
```
git add A.vue B.vue
git commit -m "A B"
git push origin yourName
```
请尽量只推送自己写的文件
#版本回退
使用`git log`来查看最近的commit记录，找到你想回退到的版本
复制其commit记录代号的前几位，
使用
```
git reset --hard 3249xerwer
```
即可将工作树清空，将版本回退到提交过的稳定版本
# Pull Request
当某个功能完成，或修复某个bug之后可以进行一次commit并推送到自己的分支上

当某个部分运行的很好了，就可以开始进行Pull Request（请求把内容合并至主分支）
打开仓库主页，选择自己的分支，找到Pull Request功能，填上请求内容并提交

# 项目结构
所有代码应放在components文件夹对应的子目录下
对于可能存在的复用组件，请在当前目录下（如basicInfo）创建一个新的components文件夹
不要把自己的代码放在公用的文件夹下
# 开始使用

Clone现有整个项目

`git clone https://github.com/JasonJiangCN/absmis`

安装依赖

`npm install`

或者

`yarn install`

开一个自己的分支

`git checkout -b yourName`

在自己的分支上工作

提交

```
git add --all
git commit -m "commit info"
git push origin yourName
```



不要把有bug的代码推送到master分支上!

## Git

git[教程](http://www.runoob.com/git/git-workflow.html)

主要关注基本操作、分支管理、版本回退功能

# 插件

## Element UI

Vue的一个组件库，方便引用表单、布局等

阅读[官方文档](http://element.eleme.io/#/zh-CN/component/installation)

在主项目里我已经import了ElementUI，在部件内可以直接使用

## Vue-router

URL信息请见URLinfo.md

## Axios

使用方法

```javascript
this.$http.get(url)
	.then(function(response){
      
	})
	.catch(function(error){
      
	})
```


# 任务分配

//TODO 分配
