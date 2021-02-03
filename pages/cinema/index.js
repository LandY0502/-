// pages/cinema/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 通过request请求获取数据库中影院信息
    var that = this
    wx.request({
      url: 'http://127.0.0.1:3000/api/cinema',
      method: 'GET',
  
      header: {
        'content-type': '/application/json'
      },
      success(res) {
        // console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '影院列表',
    })
  },


// 跳转到搜索页面
search: function () {
  wx.navigateTo({
    url: '../serch/index'
  })
},


  /* 跳转影院 */
  goSession(e){
    console.log(e.currentTarget.dataset.name)
    wx.navigateTo({
      url: '../cinema_new/cinema_new?name='+e.currentTarget.dataset.name
    })
  }
  
})