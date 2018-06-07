import api from './api.js'
let options = {
  str: '', // 文本字符串
  flg: '', // 需要插入的值 可为空
  splitStr1: '', // 需要分割的标签
  size: ''
}
export default {
  createTime(milliseconds, type) {
    let time = new Date(milliseconds);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = time.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = time.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = time.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let seconds = time.getSeconds();
    seconds = seconds < 10 ? ('0' + seconds) : seconds;
    if (type === 'yy-mm-dd hh:MM') {
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
    } else if (type === 'yy-mm-dd MM:ss') {
      return y + '-' + m + '-' + d + ' ' + minute + ':' + seconds;
    } else if (type === '年/月/日') {
      return y + '年' + m + '月' + d + '日';
    } else if (type === 'yy.mm.dd') {
      return y + '.' + m + '.' + d;
    } else if (type === 'yy.mm.dd hh:MM') {
      return y + '.' + m + '.' + d + ' ' + h + ':' + minute;
    } else {
      return y + '-' + m + '-' + d;
    }
  },
  // getCommonTime(milliseconds, type) {
  //   let time = new Date(milliseconds),
  //     time_ = new Date(),
  //     time1 = time.getTime(time), //发布时间
  //     time_1 = time_.getTime(time_), //现在时间
  //     jTime = time_1 - time1,
  //     days = jTime / 1000 / 60 / 60 / 24,
  //     daysRound = Math.floor(days),
  //     hours = jTime / 1000 / 60 / 60 - (24 * daysRound),
  //     hoursRound = Math.floor(hours),
  //     minutes = jTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound),
  //     minutesRound = Math.floor(minutes),
  //     seconds = jTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
  //     secondsRound = Math.floor(seconds);
  //   if (daysRound > 0) {
  //     return this.createTime(milliseconds, type)
  //   } else {
  //     if (hoursRound > 0) {
  //       return hoursRound + "小时前";
  //     } else {
  //       if (minutesRound > 10) {
  //         return minutesRound + "分钟前";
  //       } else {
  //         if (secondsRound > 0) {
  //           return "刚刚";
  //         }
  //       }
  //     }
  //   }
  // },
  getCommonTime(milliseconds, type) {
    let time = new Date(milliseconds),
      time_ = new Date(),
      time1 = time.getTime(time), //发布时间
      time_1 = time_.getTime(time_), //现在时间
      jTime = time_1 - time1,
      month = jTime / 1000 / 60 / 60 / 24 / 30,
      monthRound = Math.floor(month),
      days = jTime / 1000 / 60 / 60 / 24,
      daysRound = Math.floor(days),
      hours = jTime / 1000 / 60 / 60 - (24 * daysRound),
      hoursRound = Math.floor(hours),
      minutes = jTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound),
      minutesRound = Math.floor(minutes),
      seconds = jTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
      secondsRound = Math.floor(seconds);
    // console.log('month===', month)
    if (monthRound > 1) {
      return monthRound + '个月前'
    } else {
      if (daysRound > 0) {
        return daysRound + '天前'
      } else {
        if (hoursRound > 0) {
          return hoursRound + "小时前";
        } else {
          if (minutesRound > 10) {
            return minutesRound + "分钟前";
          } else {
            if (secondsRound > 0) {
              return "刚刚";
            }
          }
        }
      }
    }

  },
  //转换音频时长显示
  transTime(time) {
    let duration = parseInt(time);
    let minute = parseInt(duration / 60);
    let sec = duration % 60 + '';
    let isM0 = ':';
    if (minute == 0) {
      minute = '00';
    } else if (minute < 10) {
      minute = '0' + minute;
    }
    if (sec.length == 1) {
      sec = '0' + sec;
    }
    return minute + isM0 + sec
  },
  getParam(paramName) {
    let paramValue = "";
    let isFound = false;
    if (location.search.indexOf("?") == 0 && location.search.indexOf("=") > 1) {
      let arrSource = unescape(location.search).substring(1, location.search.length).split("&");
      let i = 0;
      while (i < arrSource.length && !isFound) {
        if (arrSource[i].indexOf("=") > 0) {
          if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
            paramValue = arrSource[i].split("=")[1];
            isFound = true;
          }
        }
        i++;
      }
    }
    return paramValue;
  },

  // 图片地址处理
  makeFileUrl(url, type, size) {
    if (url) {
      let sizes = size ? size : 500
      if (type === 'src') {
        return (url.indexOf('://') !== -1) ? url + '?s=' + sizes : api.filePath + url + '?s=' + sizes;
      } else {
        return (url.indexOf('://') !== -1) ? url : api.filePath + url;
      }
    } else {
      return
    }
  },
  // 获取cookie通过name
  getCookiebyName(cookie, name) {
    var pair = cookie.match(new RegExp(name + '=([^;]+)'));
    return !!pair ? pair[1] : null;
  },
  // 正则验证手机号
  isPhoneNum(str) {
    let regex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    return regex.test(str)
  },
  /*判断是否是微信 微博 QQ*/
  isWeiXin() {
    if (typeof window != 'undefined') {
      var wx = navigator.userAgent.toLowerCase();
      return wx.indexOf('micromessenger') != -1
    } else {
      return false
    }
  },
  isAlipay() {
    var weibo = navigator.userAgent.toLowerCase();
    return weibo.indexOf('weibo') != -1
  },
  /*判断是否是贴近app*/
  isCloserApp() {
    let nvg = navigator.userAgent.toLowerCase();
    let _result = nvg.indexOf('closer-ios') != -1 || nvg.indexOf('closer-android') != -1;
    return _result
  },
  // jsbriadge ---ios
  setupWebViewJavascriptBridge(callback) {
    // console.log(callback)
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    // var WVJBIframe = document.createElement('iframe');
    // WVJBIframe.style.display = 'none';
    // WVJBIframe.src = 'https://__bridge_loaded__';
    // document.documentElement.appendChild(WVJBIframe);
    // setTimeout(function () {
    //   document.documentElement.removeChild(WVJBIframe)
    // }, 0)
  }
}
