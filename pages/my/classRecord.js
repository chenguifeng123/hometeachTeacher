const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[],
  },

  getClassRecordByTeacher:function(){
    var op = this;
    var teacherId = wx.getStorageSync('globalTeacherId');
    if(teacherId != ''){
      app.getUrl('/local/getClassRecordByTeacher/' + teacherId, function (data) {
        if (app.hasData(data)) {
          op.setData({ recordList: data.reverse() });
        }
      });
    }
    

  },

  jumpMap:function(event){
    var address = event.currentTarget.dataset.address;
    var name = event.currentTarget.dataset.name; 
    if(!! address && address.length > 0){
      var tude = address.split(",");
      var latitude = 32.069726;
      var longitude = 118.78198;
      if(tude.length == 2){
        latitude = tude[0];
        longitude = tude[1];
      }
      
      wx.openLocation({
        latitude: Number(latitude),
        longitude: Number(longitude),
        name: name,
        address: ''
      }) 
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassRecordByTeacher();
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

  }
})