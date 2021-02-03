//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图位置
    indicatoractivecolor:'#FFFFFF',
    interval:2000,
    indicatordots:true,
    autoplay:true,
    swiper_Images:['/img/lunbo.png','/img/lunbo1.png','/img/lunbo2.png'],
    circular:true,
    // 主体内容位置
    // -------------------------
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    /* if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } */

/* 请求服务器网址获取数据内容 */
   let that=this
  wx.request({
    // 请求的url
    url: 'http://127.0.0.1:3000/api/move',
    // 请求的方式为GET，默认为GET可以不写
    method:'GET',
    // 默认写法
    header:{
      'content-type':'/application/json'
    } ,
    // 成功调回的数据
    success(res){
      console.log(res.data)
      // 将值赋值给lists
      that.setData({
        lists:res.data
      })
    }
  })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.glIobalData.userInfo = e.detail.usernfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  // 跳转到简介页面,并且将id传递过去方便获取数据库的数据
go(event){
  // 微信小程序跳转的api
  wx.navigateTo({
    url: '../Introduction/Introduction?id='+event.currentTarget.id,
  })
},
})
