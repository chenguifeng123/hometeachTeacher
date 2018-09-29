const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = 'https://www.hometeach.cn';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 去前后空格  
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息  
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息  
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

// 参数拼接
function fillUrlParams(url, params) {
  var list = [];
  for (var prop in params) {
    list.push(prop + "=" + params[prop]);
  }
  return list.length > 0 ? url + "?" + list.join("&") : url;
}

function translate(data, value) {
  for (var index = 0; index < data.length; index++)
    if (data[index].value == value) return data[index].desc;
  return value;
}

function translateUrl(value) {
  if (value.indexOf(rootDocment) == -1)
    return rootDocment + value;
  return value;
}

var book = [
  { value: 0, desc: 'Fingerprints 1A' },
  { value: 1, desc: 'Fingerprints 1B' },
  { value: 2, desc: 'Fingerprints 2A' },
  { value: 3, desc: 'Fingerprints 2B' },
  { value: 4, desc: 'Fingerprints 3A' },
  { value: 5, desc: 'Fingerprints 3B' },
  { value: 6, desc: 'Phonics' },
  { value: 7, desc: 'Nursery Rhyme' },
  { value: 8, desc: 'First Friends 1' },
  { value: 9, desc: 'First Friends 2' },
  { value: 10, desc: 'First Friends 3' }];

module.exports = {
  formatTime: formatTime,
  req: req,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getReq: getReq,

  fillUrlParams: fillUrlParams,
  translate: translate,
  translateUrl: translateUrl,

  book: book
}
