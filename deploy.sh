work_dir=./docs/.vitepress/dist

# 忽略错误
set -e

# 构建
npm install
npm run docs:build

# 两个分支, main 分支存储源代码（默认分支）, master 分支存储生成的网页、
# 先推送源代码到 main 分支
git add .
git commit -m 'add'
git push https://github.com/marsvillager/marsvillager.github.io.git main


# 进入待发布的目录
cd $work_dir

git checkout -b master origin/master
git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push https://github.com/marsvillager/marsvillager.github.io.git master

cd -
