const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classList: [],
  },

  getClassListByTeacher:function(){
    var op = this;
    var teacherId = wx.getStorageSync('globalTeacherId');
    if (teacherId != '') {
      app.getUrl('/local/getClassListByTeacher/' + teacherId, function (data) {
        if (app.hasData(data)) {
          op.setData({ classList: data });
        }
      });
    }
  },

  jumpOneClass: function (event){
    var classId = event.currentTarget.dataset.class;
    var oneClass = this.data.classList.find(function(element){
      return element.classId == classId;
    });
    if(!!oneClass){
      var allUrl = util.fillUrlParams('/pages/my/oneClass', {
        classId: classId,
        className: oneClass.className,
        kidsNumber: oneClass.kidsNumber,
        startBook: oneClass.startBook,
        teachingTime: oneClass.teachingTime1 + ' ' + oneClass.teachingTime2,
        address: oneClass.address,
        classNumber: oneClass.classNumber,
        remainClassNumber: oneClass.remainClassNumber,
        startTime: oneClass.startTime,
        transportAllowance: !!oneClass.transportAllowance ? oneClass.transportAllowance : '',
        lastName: oneClass.lastName,
      });
      wx.navigateTo({
        url: allUrl
      });
    }
    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassListByTeacher();
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