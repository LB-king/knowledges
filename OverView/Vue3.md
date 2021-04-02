###1.初始化项目

```powershell
npm install vue/@next
npm install -g vue/@cli  # 升级脚手架工具
```

初始化一个项目：

```powershell
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev # 启动项目
```

关于配置项：

vite.config.js

```javascript
const path = require('path')
module.exports = {
  port: 8080 // 默认是3000，可自定义
  alias: {
		'/@/': path.resolve('src')
  }
}
```

### 2.vue-router