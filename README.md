## 启动项目

### dev

npm install

npm run dev

### build

npm run build

---

## 技术栈

### vite

[构建 Vite + Vue 项目](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

### 开发工具 vscode

- [VS Code](https://code.visualstudio.com/) 开发编译器

- vscode 安装[Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)插件，支持 vue3 开发

### vue

> 当前项目使用 vue3.0,使用组合 API

- [vue3.0](https://cn.vuejs.org/guide/introduction.html)

- [script setup 实现讨论](https://github.com/vuejs/rfcs/pull/227)

> 自定义监听网络插件：`src/plugins`

> 自定义按钮权限指令：`src/directives`

### vuex

> 当前项目使用组合 API

[https://vuex.vuejs.org/zh/guide/composition-api.html#%E8%AE%BF%E9%97%AE-state-%E5%92%8C-getter](https://vuex.vuejs.org/zh/guide/composition-api.html#%E8%AE%BF%E9%97%AE-state-%E5%92%8C-getter)

### vue-router

> 当前项目使用组合 API

[https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api](https://router.vuejs.org/zh/guide/advanced/composition-api.html#vue-router-%E5%92%8C-%E7%BB%84%E5%90%88%E5%BC%8F-api)

### element-plus

> 配置按需加载，element-plus 文档写的都很清楚

> main.js 引入 element-plus 插件

> 配置 element-plus 和 dayjs 为中文

> 安装@element-plus/icons-vue 图标库

[https://element-plus.gitee.io/zh-CN/guide/installation.html](https://element-plus.gitee.io/zh-CN/guide/installation.html)

### vite 需要 less 插件，以及不会自动添加浏览器

> vite 能够对 css 进行预处理，但是 less 和浏览器前缀，需要安装 less 和 postcss-preset-env 插件

- [less 处理 + postcss 浏览器前缀](https://juejin.cn/post/7060351422885265415)

> main.js 需要支持引入.less 文件，就需要进行配置

- [css 在 vite 配置，javascriptEnabled 支持 js 引入.less](https://www.jianshu.com/p/4a76d68e16ec)

- [vue3：vite 配置全局 less 变量](https://www.cnblogs.com/-roc/p/16212801.html)

---

## 打包遇到问题

### 打包 build 时，vendor 文件太大

> fix: Some chunks are larger than 500 kBs after minification.

- [https://rollupjs.org/configuration-options/#output-manualchunks](https://rollupjs.org/configuration-options/#output-manualchunks)

- [https://www.cnblogs.com/jyk/archive/2022/03/20/16029074.html](https://www.cnblogs.com/jyk/archive/2022/03/20/16029074.html)

- [https://blog.csdn.net/weixin_41277748/article/details/116431789](https://blog.csdn.net/weixin_41277748/article/details/116431789)

- 也可以借助网站性能优化 gzip 进行传输文件[https://blog.csdn.net/qq_41499782/article/details/118650279?spm=1001.2014.3001.5501](https://blog.csdn.net/qq_41499782/article/details/118650279?spm=1001.2014.3001.5501)

---

## 开发插件推荐

- @kangc/v-md-editor 富文本编译器推荐

- npm i @naturefw/press-edit 项目文档在线编译器推荐

---

## 编码规范

### 代码格式规范

[eslint + prettier](https://vueschool.io/articles/vuejs-tutorials/eslint-and-prettier-with-vite-and-vue-js-3/?from_wecom=1)

> stylelint【非必要】

- stylelint demo：[vue3-eslint-stylelint-demo (Volar + ESLint + stylelint + husky)](https://github.com/sethidden/vue3-eslint-stylelint-demo)

- stylelint：[stylelint less vue3 vite](https://www.swvq.com/article/detail/471)

### 代码提交规范

- [husky + lint-staged + commitlint](https://juejin.cn/post/7115327455707168798?from_wecom=1#heading-3)

- 可以再添加 commitizen 完全控制整个 commitlint 流程，但是这里没有使用[commitizen](https://www.npmjs.com/package/commitizen)

- [commitizen + cz-conventional-changelog](https://blog.51cto.com/u_15127669/4553289)

> [参考流程](https://www.jianshu.com/p/722ff8888657?from_wecom=1)

### 提交时 husky 的 commit 指令未执行

- [husky 执行 pre-commit 文件](https://stackoverflow.com/questions/8598639/why-is-my-git-pre-commit-hook-not-executable-by-default?from_wecom=1)

```
  $ chmod ug+x .husky/_

  $ chmod ug+x .git/hooks/_
```

## github 提交项目使用 Github Token

[Github Token](https://juejin.cn/post/7104215580705554463#heading-1)
