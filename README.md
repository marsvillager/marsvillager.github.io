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

  - ```sh
    npm install
    npm run docs:build
    ```

- branch main

  - ```sh
    git add .
    git commit -m 'add'
    git push
    ```

- cd to ./docs/.vitepress/dist and save the content to branch master

- git checkout branch to master

  - ```sh
    git checkout -b master origin/master
    ```

  - git add & commit

    ```
    git add .
    git commit -m 'add'
    git push
    ```


# Reference

- https://vitepress.dev/guide/getting-started

- https://blog.csdn.net/weixin_46463785/article/details/128591987