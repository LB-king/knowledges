// pages/direct.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    msg: 'this is fraction',
    userName: ''
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
  }
})
