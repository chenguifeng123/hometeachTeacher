const app = getApp()
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    hiddenmodalput: true,
    phone:'',
    globalTeacherId: wx.getStorageSync('globalTeacherId'),
    salary: wx.getStorageSync('salary'),

    recordList:[]
  },

  // 取消
  teacherInputCancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  // 确认  
  teacherInputConfirm: function (event) {
    this.setData({
      hiddenmodalput: true
    });
    // 加载老师信息
    var op = this;
    app.getUrl('/local/login/' + op.data.phone, function (data) {
      if (app.hasData(data)) {
        if (!!data.teacherId) {
          wx.setStorageSync('globalTeacherId', data.teacherId);
          wx.setStorageSync('salary', data.hourSalary);
          wx.setStorageSync('lastName', data.lastName);
        } else {
          wx.showToast({
            title: 'Failed',
            duration: 2000
          });
        }
      }
    });
  },
  // 学员输入
  teacherInput: function (event) {
    var phone = event.detail.value;
    this.setData({
      phone: phone
    });
  },

  // 老师登录
  teacherLogin: function () {
    var globalTeacherId = wx.getStorageSync('globalTeacherId');
    // 老师未登录
    if (globalTeacherId == '') {
      // 弹出输入提示框
      this.setData({
        hiddenmodalput: false
      });

    }
  },

  teacherOut:function(){
    wx.showModal({
      title: 'Information',
      content: 'Are you sure log out ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('globalTeacherId', '');
          wx.setStorageSync('salary', '');
          wx.setStorageSync('lastName', '');

          wx.showToast({
            title: 'Success',
            duration: 2000
          });

        } else if (res.cancel) {
          console.log('User canceld')
        }
      }
    })

  },


  // 微信登录
  wxUserInit: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getClassRecord:function(){
    var op = this;
    if (op.data.globalTeacherId != '') {
      app.getUrl('/local/getTeacherLecture/' + globalTeacherId, function (data) {
        if (app.hasData(data)) {
          op.setData({ recordList: data });
        }
      });
    }
  },

  jumpInfo:function(){
    wx.navigateTo({
      url: '/pages/my/classList'
    });
  },

  jumpRecord: function () {
    wx.navigateTo({
      url: '/pages/my/classRecord'
    });
  },

  jumpPerson: function(){
    wx.navigateTo({
      url: '/pages/my/person'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.wxUserInit();
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