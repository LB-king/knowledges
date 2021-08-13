// pages/direct.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: 'this is fraction',
    userName: '',
    address: '选择地址',
    list: [
      {id: '11', name: '穆勒'},
      {id: '22', name: '莱万'}
    ],
    listObj: {
      name: '张飞',
      age: 33,
      sex: '男'
    },
    imageList: [],
    inputValue: '默认值'
  },
  // 输入
  handleInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
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
  },
  getUserInfo(info) {
    console.log('获取用户信息：', info);
  },
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
  },
  //上传图片
  uploadImage() {
    let _this = this
    wx.chooseImage({
      count: 4,
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
})
