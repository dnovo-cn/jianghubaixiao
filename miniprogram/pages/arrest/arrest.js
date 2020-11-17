// miniprogram/pages/arrest/arrest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    time: 500,
    timer: 0,
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
    //  设定输入值，清空历史搜索记录
    this.setData({
      keyWord: e.detail.value,
    })
    //  当有输入值并且用户停止输入的时候，执行搜索函数
    if(this.data.keyWord){
      let _this = this;
      if(_this.data.timer == 0){ 
        _this.setData({
          timer: setTimeout(()=>{
            _this.searchIdentify();
          },500)
        })
      }else{
        clearTimeout(this.data.timer)
        _this.setData({
          timer: setTimeout(()=>{
            _this.searchIdentify();
          },500)
        })
      }
    }else{
      clearTimeout(this.data.timer)
      this.setData({
        resultList: []
      }) 
    }
  },

  searchIdentify: function (){
    let _data = {
      cateId: 1,
      keyWord: this.data.keyWord
    }
    let _this= this;
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