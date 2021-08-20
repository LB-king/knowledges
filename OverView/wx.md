### 微信小程序

微信公众平台：

https://mp.weixin.qq.com/wxamp/devprofile/get_profile?token=1081815271&lang=zh_CN

#### 1.后台环境

#### 2.小程序环境

##### 	2.1申请一个微信公众平台

https://mp.weixin.qq.com/wxamp/home/guide?token=1081815271&lang=zh_CN

##### 2.2保存自己的appid

​	(wx0718108b09a67731)

##### 2.3下载开发者工具

#### 3.开发小程序

##### 3.1全局配置

参考配置页面：[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#%E9%85%8D%E7%BD%AE%E9%A1%B9](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#配置项)

app.json:

```json
{
  "pages": [
    "pages/index/index",
    "pages/index/tab"
  ],
  "window": {
    "navigationBarBackgroundColor": "#bbb",
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "DIY标题",
    "navigationStyle": "default"
  },
  "tabBar": {
    "selectedColor": "#1afa29",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "index",
        "iconPath": "static/icons/home.png",
        "selectedIconPath": "static/icons/home-selected.png"
      },
      {
        "pagePath": "pages/index/tab",
        "text": "tab",
        "iconPath": "static/icons/user.png",
        "selectedIconPath": "static/icons/user-selected.png"
      },
      {
        "pagePath": "pages/index/tab",
        "text": "tab1",
        "iconPath": "static/icons/user.png",
        "selectedIconPath": "static/icons/user-selected.png"
      }
    ]
  },
  "sitemapLocation": "sitemap.json"
}
```

.json文件不能注释，否则会报错

##### 3.2组件

- text - 编写文本信息，类似span

- view - 页面布局，容器 div

- image - 图片

- navigator - 导航

  ps:flex布局。grid布局。

  ```css
  .m {
    display: grid;
    grid-template-columns: repeat(auto-fill, 24%);
    grid-template-columns: 50px 1fr 1fr; /*fr关键字 fraction 片段*/
    /*第一列的宽度是50px 第二列的宽度是第三列的一半*/
  }
  ```

##### 3.3rpx

整个页面的宽度是750rpx，不要使用px

| 设备         | rpx换算px (屏幕宽度/750) | px换算rpx (750/屏幕宽度) |
| :----------- | :----------------------- | :----------------------- |
| iPhone5      | 1rpx = 0.42px            | 1px = 2.34rpx            |
| iPhone6      | 1rpx = 0.5px             | 1px = 2rpx               |
| iPhone6 Plus | 1rpx = 0.552px           | 1px = 1.81rpx            |

##### 3.3.1dpi

dots per inch(每英寸所打印的点数)



首页，拍卖，消息，个人  写布局页面

wxss wxml

##### 4.1跳转

###### 4.1.1事件绑定

参数传递定义如下 `data-age="18"`

```html
<button size="mini" type="primary" bindtap="handleTap" data-id="110" data-name="张三">toDirect</button>
```

```javascript
// pages/index.js
Page({
 //点击跳转
  handleTap(e) {
    console.log(e);
    console.log(e.currentTarget.dataset); // 当前操作的对象，用于事件捕获
    wx.navigateTo({ //只能跳转到非tabBar的页面,fail can not navigateTo a tabbar pag
      url: "/pages/detail/detail?id=1122"
    })
  }
})
```

###### 4.1.2页面跳转

- 内置方法

  ```javascript
  wx.navigateTo({url:"xxx"})
  ```

- 标签跳转

  ```html
  <navigator url="/pages/direct/direct?id=999">跳转到新页面</navigator>
  ```

**注意：只能跳转到非`tabbar`页面。**

在跳转页面接收参数

`detail.js`:

```javascript
Page({
  onLoad(options) {
    console.log(options)
    // 在此接收参数
  }
})
```

##### 4.2数据绑定

```javascript
// pages/direct.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: 'this is fraction'
  },
  handleClick(data) {
    // 只在内存中修改，页面没有改变
    // this.data.msg = 'new msg'
    this.setData({
      msg: 'new msg'
    })
    console.log(this.data)
  }
})

```

##### 4.3获取用户信息

`getUserInfo`接口返回的数据不符合要求，已更换为以下接口。

###### 方式一

`getUserProfile`

desc字段必传:https://developers.weixin.qq.com/miniprogram/dev/api/open-api/user-info/wx.getUserProfile.html

wxml

```html
<button size="mini" bindtap="handleClick">btn</button>
```

js

```javascript
handleClick(data) {
  let _this = this
  // 只在内存中修改，页面没有改变
  // this.data.msg = 'new msg'
  this.setData({
    msg: 'new msg'
  })
  wx.getUserProfile({
    lang: 'en',
    desc: 'for dev',
    success(res) {
      console.log('success', res)
      _this.setData({
        userName: res.userInfo.nickName
      }) 
    },
    fail(err) {
      console.log('fail: ', err)
    }
  })
}
```

###### 方式二

`button：`

wxml

```html
<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取用户信息</button>
```

js

```javascript
getUserInfo(info) {
  console.log('获取用户信息：', info);
}
```

二者的区别：`getUserProfile`会有弹窗，提示是否允许获取个人信息

​					  `button`不会弹窗

使用`wx.openSetting()`打开设置页面，手动授权。

##### 4.4获取用户位置信息

```javascript
//获取地址
getLocation() {
  let _this = this
  wx.chooseLocation({
    success(res) {
      console.log(res)
      _this.setData({
        address: res.address
      })
    },
    fail(err) {
      console.log('err', err);
    },
    complete() {
      console.log('complete');
    }
  })
}
```

##### 4.5wx:for

循环对象和数组

js

```javascript
Page({
  data: {
    list: [
      {id: '11', name: '穆勒'},
      {id: '22', name: '莱万'}
    ],
    listObj: {
      name: '张飞',
      age: 33,
      sex: '男'
    }
  }
})
```

wxml

```html
<view wx:for="{{list}}" wx:key="index">{{item.name}}-{{index}}</view>
<view wx:for="{{listObj}}" wx:for-index="idx" wx:key="idx">{{item}}-{{idx}}</view>
```

加上`wx:key`避免警告,`wx:for-index="idx"`和` wx:for-item="i" `分别改变`index`和`item`的别名。

##### 4.6获取图片

```javascript
uploadImage() {
  let _this = this
  wx.chooseImage({
    count: 9, //最多9个
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      console.log(res);
      _this.setData(
        {imageList : res.tempFilePaths}
      )
    }
  })
}
```

##### 小结：

组件：

- view
- text
- navigator `<navigator url="/pages/direct/direct?id=999" data-id="12">toTAb</navigator>`
- button `<button open-type="getUserInfo" bindgetuserinfo="getUserInfo">获取用户信息</button>`
- image

事件：

- bindtap

api:

- wx.navigate

##### 4.7双向绑定

```html
<input value="{{inputValue}}" bindinput="handleInput"></input>
<view>输入了：{{inputValue}}</view>
```

```javascript
handleInput(e) {
  this.setData({
    inputValue: e.detail.value
  })
}
```

##### 4.8API

- navigateTo 路由跳转

- request 网络请求API，

  - 网络地址https
  - 后台设置域名

  本地测试：把详情打开，关掉https协议

##### 5.后台程序

##### 5.1 express启动后台服务

```shell
express itemName
npm install express-jwt jsonwebtoken -S
```

##### 5.2在线mock

https://www.fastmock.site/#/project/fb0033c9e52e7ca3b16f22255a580ffd

email: 731540792@qq.com

##### 6.1全局存储

获取全局存储

app.js

```javascript
App({
  globalData: {
    name: 'admin',
    pwd: '12'
  }
})
```

demo.js

```javascript
var app = getApp()
Page({
  // 每次打开页面都会调用
  onShow() {
    //此处可以获取全局app.js的数据
  }
})
```

wx.setStorage('user', info)

wx.setStorageSync('user', info)

wx.getStorage('user')

wx.getStorageSync('user')

```javascript
wx.setStorage({
  key:"key",
  data:"value"
})
```

wx.removeStorageSync('user')

wx.removeStorage()

##### 6.2页面调用栈

```javascript
var pages = getCurrentPages()
var prev = pages[pages.length - 2]
```

##### 6.3跳转到上一个页面

```javascript
wx.navigateBack()
```

##### 6.4页面的生命周期

- onLoad(一次)
- onShow(只要展示就会触发)
- onReady(一次)
- onHide(每次页面隐藏就会加载)
- onUnload(卸载页面触发)

##### 6.5页面传值

- 父页面->子页面

  父：

  ```
  /pages/xx?id=111
  ```

  子：

  ```javascript
  onLoad(options) {
    //参数就存在options里面
  }
  ```

- 子页面->父页面

  子：

  ```javascript
  var pages = getCurrentPages()
  var prev = pages[pages.length - 2]
  prev.changeData(item)
  ```

  父：

  ```javascript
  data() {
    name: '',
    id: ''
  },
  changeData(res) {
    this.setData({
      name: res.name,
      id: res.id
    })
  }
  ```

  ##### 6.6修改数组的属性值
  
  ```js
  var arr = [{id:1,name:'kg',value:'45'}]
  
  function change() {
    this.setDtata({
      ['arr[0].value']: 889
    })
  }
  ```
  
  ##### 6.7下拉刷新
  
  注意把最新的一条记录返回给后端，让后台去查询比对，如果数据库没有最新的数据，则无需重新加载，优化了性能。
  
  - 记录最大的id
  
  - 记录最小的id(或者其他的标志字段)
  
    全局配置:
  
    ```json
    {
      "window": {
        "enablePullDownRefresh": false
      }
    }
    ```
  
    局部配置:
  
    ```json
    {
      "usingComponents": {},
      "enablePullDownRefresh": true
    }
    ```
  
    停止下拉刷新
  
    ```js
    wx.stopPullDownRefresh()
    ```
  
    



