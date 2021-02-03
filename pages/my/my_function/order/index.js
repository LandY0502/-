// pages/my/my_/movie_ticket/index.js
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
    let that=this
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    wx.request({
      // 请求的url
      url: 'http://127.0.0.1:3000/api/order',
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
  // 删除
  del(event){
    let that=this
    wx.request({
      // 请求的url
      url: 'http://127.0.0.1:3000/api/order/'+event.currentTarget.id,
      // 请求的方式为GET，默认为GET可以不写
      method:'GET',
      data:{
        order_id:event.currentTarget.id
      },
      // 默认写法
      header:{
        'content-type':'/application/json'
      } 
    })
    // 每次删除之后重新调用onLoad函数刷新页面
    that.onLoad()
  }
})