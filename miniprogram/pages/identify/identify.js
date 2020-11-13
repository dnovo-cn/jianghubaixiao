// miniprogram/pages/identify/identify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    time: 500,
    currentTime: '',
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 关键字实时搜索
   */
  onInput: function (e) {
    this.setData({
      keyWord: e.detail.value,
      currentTime: (new Date()).valueOf()
    })
    let _this = this;
    if(this.data.keyWord){
      let timer = setTimeout(function () {
        if((new Date()).valueOf() - _this.data.currentTime > _this.data.time){
          let _data = {
            cateId: 1,
            keyWord: _this.data.keyWord
          }
          console.log(_data)
          wx.cloud.callFunction({
            // 云函数名称
            name: 'search',
            // 传给云函数的参数
            data: _data,
            success(res) {
              console.log(res.result)
              _this.setData({
                resultList: res.result.data.resultData.data
              })
            },
            fail: console.error
          })
        }else{
          clearTimeout(timer);
          _this.setData({
            resultList: []
          })
        }
      }, _this.data.time)
    }
  },

  /**
   * 关键字完成搜索
   */
  onSearch: function (e) {
    this.setData({
      keyWord: e.detail.value
    })
    console.log(this.data.keyWord);
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

  }
})