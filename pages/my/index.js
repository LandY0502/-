// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    src:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shareshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   wx.setNavigationBarTitle({
     title: '我的',
   })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /* 获取用户信息 */
  getUserInfo:function(e){
    let that=this;
    // 获取授权
    wx.getSetting({
      withSubscriptions:true,
      // 调用成功
      success(res){
        if(res.authSetting['scope.userInfo']){
          // 如果授权成功则获取用户头像和昵称
          wx.getUserInfo({
            withCredentials:true,
            success(res){
              // 将获取的用户信息赋值
              that.setData({
                name:res.userInfo.nickName,
                src:res.userInfo.avatarUrl
              })
            },
            fail(res){
              console.log('获取失败')
            }
          })
        }
      }
    })  
    // 点击按钮的时候将自己隐藏
    var shareshow=that.data.shareshow
    that.setData({
      shareshow:!shareshow
    })
  },




  // 电影票
  history:function(){
    wx.navigateTo({
      url: '/pages/my/my_function/history/index',
    })
  },

  bymove:function(){
    wx.navigateTo({
      url: '/pages/my/my_function/order/index',
    })
  },

  // 关于我们
  about:function(){
    wx.navigateTo({
      url: '/pages/my/my_function/about_us/index',
    })
  }
})