## H5 社区

H5 版本的社区前端项目

需要 npm > 3.0, 确保正确安装了 devagent

```
npm instal npm@latest -g
npm config set @dal:registry=http://npm-registry.corp.daling.com
npm install @dal/devagent@latest -g
```

### 本地调试

```
devagent server -p 9999
```
将 touch.daling.com/src 和 touch.daling.com/assets 路径代理到本地的 9999 端口

浏览器打开 http://touch.daling.com/src/level.html

### 打包方式

```
devagent package
```

生成的编译后代码存放在 dist 目录