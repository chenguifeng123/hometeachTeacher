const app = getApp();
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 界面配置项
    hometeach: app.hometeach,  // 请求的URL根路径

    hiddenmodalput: true,
    period: '',
    currentClassId: 0,
    currentIndex: 0,

    address : '',
    btnDisabled: [],
    teacherId : 0,
    classIndex : {},
    classList:[]     // 当前外教的班级
  },

  btnControl: function (index, control) {
    var btn = this.data.btnDisabled;
    btn[index] = control;
    this.setData({ btnDisabled: btn });
  },

  btnControlByClass: function(classId, control){
      var index = this.data.classIndex[classId];
      this.btnControl(index, control);
  },

  hasSignIn: function(classId, teacherId){
    var op = this;
    app.getUrl('/local/getTeachingSignInToday/' + classId + '-' + teacherId, function (data) {
      if (app.hasData(data) && data.length > 0) {
        op.btnControlByClass(classId, true);
      } else {
        op.btnControlByClass(classId, false);
      }
    });
  },

  location: function (classId, index){
    var op = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var address = latitude + ',' + longitude;
        op.setData({ address: address });
        op.sign(classId, index);
      }
    })
  },

  // 取消
  periodInputCancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  // 确认  
  periodInputConfirm: function (event) {
    if(!this.data.period || this.data.period.length < 1){
      wx.showModal({
        title: 'Alert',
        content: 'Lesson must be input',
        showCancel:false,
        confirmText: 'Confirm',
        success: function (res) {
        }
      })
      return;
    }
    this.setData({
      hiddenmodalput: true
    });
    this.location(this.data.currentClassId, this.data.currentIndex);
  },

  periodInput: function (event) {
    var period = event.detail.value;
    this.setData({
      period: period
    });
  },

  signClick: function (event) {
    var classId = event.currentTarget.dataset.class;
    var index = event.currentTarget.dataset.index;
    this.setData({
      currentClassId: classId,
      currentIndex: index,
      hiddenmodalput: false
    });
    //this.location(classId, index);
  },

  sign: function (classId, index){
    var teacherId = wx.getStorageSync('globalTeacherId');
    var address = this.data.address;
    var period = this.data.period;
    var op = this;
    app.post('/local/addTeaching/' + classId + '-' + teacherId + '-' + period + '-' + address, {},     function (data) {
      if (app.hasData(data)) {
        op.hasSignIn(classId, teacherId);
        if (data == -1) {
          wx.showToast({
            title: 'Sign in failture',
            duration: 200
          });
        } else {
          wx.showToast({
            title: 'Sign in success',
            duration: 200
          });
          var allUrl = util.fillUrlParams('/pages/sign/success', {
            classId: classId,
          });
          wx.navigateTo({
            url: allUrl
          });
        }
      }
    });
  },

  init : function(data){
    var control = [];
    var classIndex = {};
    for(var index = 0; index < data.length; index++){
      control.push(false);
      classIndex[data[index]['classId']] = index;
    }
    this.setData({
      classList: data,
      btnDisabled: control,
      classIndex: classIndex
    });
    for (var index = 0; index < data.length; index++) {
      this.hasSignIn(data[index]['classId'], data[index]['teacherId']);
    }
  },

  getSignClass: function (teacherId){
    var op = this;
    if (teacherId != '') {
      app.getUrl('/local/getSignClass/' + teacherId, function (data) {
        if (app.hasData(data)) {
          op.init(data);
        } else {
          op.init([]);
        }
      });
    }else{
      op.init([]);
    }
  },

  reload:function(){

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
    var teacherId = wx.getStorageSync('globalTeacherId');
    if( this.data.teacherId != teacherId){
      this.getSignClass(teacherId);
      this.setData({ teacherId: wx.getStorageSync('globalTeacherId')});
    }
    
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
    this.getSignClass(wx.getStorageSync('globalTeacherId'));
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getSignClass(wx.getStorageSync('globalTeacherId'));
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})