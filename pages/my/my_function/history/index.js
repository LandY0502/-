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
    //这里声明了that；将this存在that里面 
    let that=this
    wx.setNavigationBarTitle({
      title: '历史记录',
    })
    /* 请求服务器网址获取数据内容 */
   wx.request({
     // 请求的url
     url: 'http://127.0.0.1:3000/api/like',
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
  
  del(event){
    let that=this
    wx.request({
      // 请求的url
      url: 'http://127.0.0.1:3000/api/like/'+event.currentTarget.id,
      // 请求的方式为GET，默认为GET可以不写
      method:'GET',
      data:{
        like_id:event.currentTarget.id
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