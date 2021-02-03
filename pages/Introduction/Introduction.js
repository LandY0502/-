// pages/Introduction/Introduction.js
// 获取应用实例

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 获取上个页面点击的id的值然后在加载的时候获取传过来的值，再通过访问服务器接口网址
    给他加上从上个页面获取过来的相应的id的值来显示上个页面点了什么内容那就在这个页面显示这个内容的详细信息 */
    let move_id=options.id
    console.log(move_id)
    let that=this
    wx.request({
      url: 'http://127.0.0.1:3000/api/move/'+move_id,
      method:'GET',
      header:{
        'content-type':'/application/json'
      } ,
      success(res){
        that.setData({
          id:move_id,
          lists:res.data
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '简介',
    })
  },

  
  
  /* 添加喜欢 */
  buyMove(){
    let that=this
    console.log(that.data.lists[0].move_name)
    // 发起请求
    wx.request({
      // 请求的哇告知
      url: 'http://127.0.0.1:3000/api/like/add',
      // 请求方式
      method:'GET',
      /* 请求时传递的数据。通过请求这个url所携带的data数据，然后从服务端获取这组数据
           通过sql语句来执行添加了该电影的喜欢*/
      data:{
        like_name:that.data.lists[0].move_name,
        like_title:that.data.lists[0].move_title,
        like_actor:that.data.lists[0].move_actor,
        like_score:that.data.lists[0].move_score,
        like_image:that.data.lists[0].move_image
      },
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res){
        console.log(res.data)
      }
    })
    wx.showModal({
      title: '提示：',
      content: '成功添加到您的喜欢',
      showCancel: false,
      confirmColor: '#ff4d64'
    })
  }
})