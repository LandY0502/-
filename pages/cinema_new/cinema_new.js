Page({
  /**
   * 页面的初始数据
   */
  data: {
    Date: '10月30日',
    currentIndex: 0,
    flag: 0,
    row: ['1', '2', '3', '4', '5'],
    seat: ['1', '2', '3', '4', '5']
  },

  switchNav: function (e) {
    console.log(e.currentTarget.dataset.name);
    this.setData({
      flag: e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.request({
      url: 'http://127.0.0.1:3000/api/move',
      method: 'GET',
      header: {
        'content-type': '/application/json'
      },
      success(res) {
        console.log(res.data)
        that.setData({
          cinema_name: options.name,
          lists: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '场次',
    })
  },

  handleChange: function (e) {
    let that = this
    console.log(that.data.lists[e.detail.current].move_image)
    console.log(e.detail.current)
    that.setData({
      move_image: that.data.lists[e.detail.current].move_image,
      move_name: that.data.lists[e.detail.current].move_name,
      currentIndex: e.detail.current
    })
  },
  // 购买电影票
  buyTick() {
    let that = this
    // 调用一下方法
    that.pick()
    // 发起请求
    wx.request({
      url: 'http://127.0.0.1:3000/api/order/add',
      // 请求方式
      method: 'GET',
      data:{
        order_name:that.data.move_name,
        order_seat:that.data.Seat,
        order_time:that.data.Date,
        order_cinema:that.data.cinema_name,
        order_image:that.data.move_image,
      }
    })
    // console.log(that.data.move_image)
    // console.log(that.data.move_name)
    // console.log(that.data.Seat)
    // console.log(that.data.Date) 
    // console.log(that.data.cinema_name)
  },

  pick() {
    let that = this
    // 定义排的长度
    let row_len = that.data.row.length
    // 定义座位的长度
    let seat_len = that.data.seat.length
    // 排数组的下标
    let row_index
    // 座位数组的下标
    let seat_index
    // 第几排
    let row_item
    // 座位号
    let seat_itme
    if (row_len > 0 && seat_len > 0) {
      // 排数组的下标
      row_index = Math.floor(Math.random() * row_len)
      // 座位数组的下标
      seat_index = Math.floor(Math.random() * seat_len)
      // 第几排
      row_item = that.data.row[row_index]
      // 座位号
      seat_itme = that.data.seat[seat_index]
      // 删除排数组的下标值
      that.data.row.splice(row_index, 1)
      // 删除座位数组的下标值
      that.data.seat.splice(seat_index, 1)

      that.setData({
        Seat: row_item + '排' + seat_itme + '座'
      })
      wx.showModal({
        title: '购票提示：',
        content: '购买成功，您的座位号为' + row_item + '排' + seat_itme + '座',
        showCancel: false,
        confirmColor: '#ff4d64'
      })
    } else {
      wx.showModal({
        title: '购票提示',
        content: '不好意思，本场次票以售罄',
        showCancel: false,
        confirmColor: '#ff4d64'
      })
    }
    row_len--
    seat_len--
  }
})