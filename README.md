# Build

- Create a new repository on GitHub: \<usrname>.github.io
- Framework: VitePress 

# Branches

- main
  - store all code

- master
  - only distribution (locate in `./docs/.vitepress/dist/`)


# Settings

![image-20230417164025208](https://github.com/marsvillager/pictures_for_markdown/raw/main/image-20230417164025208.png)

# Deploy Automaticly

- build md to html
- cd dist
- git add & commit
- git push to master

```sh
sh deploy.sh
```

# Reference

https://vitepress.dev/guide/getting-started

https://blog.csdn.net/weixin_46463785/article/details/128591987