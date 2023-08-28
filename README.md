# `ApiPlayer-Frontend`

## 1. 项目简介

该项目是：字节跳动第六届青训营前端大项目2 - HTTP 接口管理平台的后端项目，选取的技术栈为：

`Vue3.0`+`Vite`+`Pinia`+`TypeScript`+`Element Plus`。

目前该项目已经配置好`ESLint`和`Prettier`，只用把代码拉下来然后`npm install`，之后再在`VSCode`里面配置好`ESLint`和`Prettier`的插件就可以了。

该仓库用于统筹管理前端开发的工作进程。

## 2. 项目说明

具体可见该项目的目录结构，以下作一些大概的说明：

- public：存放公共资源，目前只有一个网站图标`favicon.ico`
- src：代码根目录，存放源代码资源。
  - components：组件目录，**根据不同的页面划分不同的组件目录，和views目录下面的页面一一对应。**
  - little：小组件目录，是给components中的组件调用的小组件存放的目录。
  - router：路由目录，采用`vue-router`，配置文件为`index.ts`。
  - static：静态资源目录，分为`svg`和`img`。`svg`里面存放的都是`svg`文件；`img`里面可以存放`.png`、`.jpg`等格式的图片文件。**命名必须采用驼峰命名法**。
  - utils：工具目录，封装了所有的工具函数。`hooks`存放自定义的`hooks`；`common`存放一般定义的函数；`types`存放定义的数据类型。
  - views：页面目录，存放了所有的页面入口。命名规则为：新建一个页面目录，用该页面的名称来命名（驼峰命名法），之后再在下方新建`index.vue`文件作为该页面的入口。
- index.html：单页面应用的入口

## 3. 项目规范

1. 给组件命名的时候，除了`index.vue`，其他一律都用驼峰命名法。比如：`MyComponents.vue`这种形式。
2. 比如我在views里面新建了两个页面：home和login，那么在components里面需要新建`ModelHome`和`ModelLogin`目录，然后再在里面新建需要的组件。
3. little目录里面的组件不需要按照views的页面来划分，直接一个目录即可。里面组件的命名也是采用驼峰命名法。
4. 具体的代码风格我已经在`ESLint`和`Prettier`上面配置完成，直接拉下来`npm install`就可以了。

```
ApiPlayer-Frontend
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierrc.cjs
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ api
│  │  ├─ apis.ts
│  │  ├─ axios.ts
│  │  ├─ projects.ts
│  │  ├─ teams.ts
│  │  └─ users.ts
│  ├─ App.vue
│  ├─ auto-imports.d.ts
│  ├─ components
│  │  ├─ CommonAside.vue
│  │  ├─ CommonHeader.vue
│  │  ├─ login
│  │  │  └─ LoginWindow.vue
│  │  ├─ main
│  │  │  └─ MainWindow.vue
│  │  ├─ personalCenter
│  │  │  └─ MainWindow.vue
│  │  ├─ project
│  │  │  ├─ ModelDetails
│  │  │  │  ├─ components
│  │  │  │  │  ├─ ChooseApi.vue
│  │  │  │  │  ├─ Default.vue
│  │  │  │  │  ├─ EnvHeader.vue
│  │  │  │  │  ├─ JsonSchemaEditor.vue
│  │  │  │  │  ├─ ParamsAndHeader.vue
│  │  │  │  │  ├─ ResponseCard.vue
│  │  │  │  │  ├─ SideBar.vue
│  │  │  │  │  └─ TestRequestTable.vue
│  │  │  │  ├─ doc
│  │  │  │  │  └─ index.vue
│  │  │  │  ├─ edit
│  │  │  │  │  └─ index.vue
│  │  │  │  └─ test
│  │  │  │     └─ index.vue
│  │  │  ├─ ModelSettings
│  │  │  │  ├─ SettingMain.vue
│  │  │  │  └─ SideNav.vue
│  │  │  ├─ ProjectDetails.vue
│  │  │  └─ ProjectSettings.vue
│  │  ├─ recentVisit
│  │  │  └─ VisitWindow.vue
│  │  └─ team
│  │     ├─ MemberPermission.vue
│  │     ├─ ProjectList.vue
│  │     ├─ TeamSetting.vue
│  │     └─ TeamWindow.vue
│  ├─ components.d.ts
│  ├─ little
│  │  └─ dialog.vue
│  ├─ main.ts
│  ├─ router
│  │  └─ index.ts
│  ├─ static
│  │  ├─ gif
│  │  │  └─ 404.gif
│  │  ├─ img
│  │  │  └─ emptyLogo.png
│  │  ├─ projectIcons
│  │  │  └─ 12.jpg
│  │  └─ svg
│  │     ├─ Clock.svg
│  │     ├─ Delete.svg
│  │     ├─ FIle.svg
│  │     ├─ HeaderExit.svg
│  │     ├─ HeaderLogo.svg
│  │     ├─ HeaderMessage.svg
│  │     ├─ HeaderPersonalCenter.svg
│  │     ├─ Import.svg
│  │     ├─ LoginLogo.svg
│  │     ├─ Modify.svg
│  │     ├─ ProjectDetailsEnvHeaderDialogEnv.svg
│  │     ├─ ProjectDetailsEnvHeaderDialogParams.svg
│  │     ├─ ProjectDetailsEnvHeaderEdit.svg
│  │     ├─ ProjectDetailsEnvHeaderOpenList.svg
│  │     ├─ ProjectDetailsEnvHeaderReload.svg
│  │     ├─ ProjectDetailsSideBarDelete.svg
│  │     ├─ ProjectDetailsSideBarDictClosed.svg
│  │     ├─ ProjectDetailsSideBarDictOpened.svg
│  │     ├─ ProjectDetailsSideBarNewApi.svg
│  │     └─ ProjectDetailsSideBarNewDict.svg
│  ├─ store
│  │  ├─ apis.ts
│  │  ├─ index.ts
│  │  ├─ permissons.ts
│  │  └─ store-name.ts
│  ├─ type
│  │  ├─ JsonSchemaEditor
│  │  │  └─ declaration.d.ts
│  │  └─ zhCn
│  │     └─ declaration.d.ts
│  ├─ utils
│  │  ├─ convertSchemaToTree.ts
│  │  ├─ projectPermission.ts
│  │  ├─ TeamPermisssion.ts
│  │  ├─ types.ts
│  │  └─ validate.ts
│  ├─ views
│  │  ├─ 404
│  │  │  └─ index.vue
│  │  ├─ login
│  │  │  └─ index.vue
│  │  ├─ main
│  │  │  └─ index.vue
│  │  ├─ personalCenter
│  │  │  └─ index.vue
│  │  ├─ project
│  │  │  └─ index.vue
│  │  ├─ recentVisit
│  │  │  └─ index.vue
│  │  └─ team
│  │     └─ index.vue
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ yarn.lock

```
