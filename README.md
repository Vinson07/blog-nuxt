# 个人博客前台

## 在线地址
- 前台：https://sakura520.co
- 后台：https://admin.sakura520.co

## 前台项目
> 欢迎大家提交pr，一起改进项目
- Github 地址：https://github.com/Vinson07/blog-nuxt
- Gitee 地址：https://gitee.com/vinson007/blog-nuxt

## 后台项目
> 特别鸣谢项目：
- Github 地址：https://github.com/ttkican/Blog
- Gitee 地址：https://gitee.com/wu_shengdong/blog

## 项目架构
- nuxt3：https://nuxt.com/
- ts 
- pinia：https://pinia.web3doc.top/
- vueuse：https://vueuse.org/
- tailwind：https://tailwindcss.com/docs/installation
- NaiveUI：https://www.naiveui.com/
- device(判断使用设备)：https://nuxt.com/modules/device
- nuxt-icon（图标）：https://nuxt.com/modules/icon

## 使用建议
- 因为项目使用eslint, 所以建议使用编辑器 vscode 下载插件 ESLint Prettier
- 因为项目使用husky，t提交git会自动格式化代码，如果eslint不通过是提交不上去的
- 保存自动格式化，不喜欢的可以在.vscode目录下setting.json修改

## git commit message

- feat - 新功能 feature
- fix - 修复 bug
- docs - 文档注释
- style - 代码格式(不影响代码运行的变动)
- refactor - 重构、优化(既不增加新功能，也不是修复bug)
- perf - 性能优化
- test - 增加测试
- chore - 构建过程或辅助工具的变动
- revert - 回退
- build - 打包


## 启动项目
```shell
#首先全局安装pnpm
npm install pnpm -g

#安装依赖
pnpm install

# 本地运行
pnpm dev

# 打包分析
pnpm analyze

# 打包
pnpm build

```
