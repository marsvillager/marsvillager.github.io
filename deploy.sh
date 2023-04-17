work_dir=./docs/.vitepress/dist

# 忽略错误
set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd $work_dir

git checkout master
git init
git add -A
git commit -m 'deploy'

# 如果部署到 https://<USERNAME>.github.io
git push -f https://github.com/marsvillager/marsvillager.github.io.git master

cd -
