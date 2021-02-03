// pages/serch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',//点击结果项之后替换到文本框的值
    adapterSource: [],//从服务器获取的数组
    bindSource: []//要显示在页面上的数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'http://127.0.0.1:3000/api/cinema',
      method: 'GET',
      header: {
        'content-type': '/application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          adapterSource: res.data
        })
      }
    })
  },


  /* 点击取消跳回页面 */
  hideInput() {
    wx.navigateBack({
      delta: 0,
    })
  },

  /* 搜索功能 */
  inputTyping: function (e) {
    let that=this
    var prefix = e.detail.value//用户实时输入值
    var newSource = []//匹配的数组
/*     判断如果输入框中的值不为空则将输入框中的值
      与onload生命函数中从服务器上获取到的值进行一一对应的票匹配 */
    if (prefix != "") {
      // 对页面加载时从数据库访问到的数据进行数组遍历 item是数组里拿出来的每一个每一组
      that.data.adapterSource.forEach(item=>{
        // 用indexOf判断输入框中是否和拿出来的数组中的值有包含关系 
        // indexOf：有包含会返回大于0的数值，没有则返回-1
        if(item.cinema_name.indexOf(prefix)>0){
          // 如果有包含则向创建的数组中添加这组的item
          newSource.push(item)
        }
      })
    }
    console.log(newSource)
    // 判断创建的这个数组中的数组长度是否为空
    if (newSource.length != 0) {
      /* 如果数组中有数据。那么一定是匹配到的值，所用用setData的方法来赋值给到时候
      需要在页面上显示的数组 如果没有那么页面上也不会有显示什么东西*/
      this.setData({
        bindSource: newSource
      })
    } else {
      this.setData({
        bindSource: []
      })
    }
  },
  /* 跳转影院 */
  goSession(e){
    wx.navigateTo({
      url: '../cinema_new/cinema_new?name='+e.currentTarget.dataset.name,
    })
  }
})