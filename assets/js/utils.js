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
  // 富文本处理
  async makeHtmlContent(html, status) {
    let _html;
    const regexImg = /<img.*?(?:>|\/>)/gi;
    let pImg = await html.match(regexImg);
    if (pImg) {
      const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
      const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let size, flag;
      pImg.forEach((x, i) => {
        let
          srcArray = x.match(regexSrc),
          widthArray = x.match(regexWidth),
          heightArray = x.match(regexHeight),
          nW,
          nH;
        if (widthArray && heightArray) {
          nH = heightArray[1] * 92 / widthArray[1] + "vw";
        } else {
          nH = "auto";
        }
        // fix 图片是中文带路径 补丁
        let _src = srcArray[1].replace(/\+/g, "%2b");
        flag = `<div class='imgbox tiejin-imgbox' style="height: ${nH}">
                          <img style="height: ${nH}" data-index="${i+1}" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==' data-src='${_src}'/>
                        </div>`;
        // 正则替换富文本内的img标签
        // 替换不同文本
        html = html.replace(x, flag);
      });
    }
    const regexVideo = /<video.*?(?:>|\/>|<\/video>)/gi;
    let pVideo = await html.match(regexVideo);
    if (pVideo) {
      // 正则替换富文本内 img标签 待发布（npm）
      const regexUrl = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      const regexVid = /vid=[\'\"]?([^\'\"]*)[\'\"]?/i;
      const regexCover = /imageUrl=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let flg;
      pVideo.forEach((x, i) => {
        // 匹配imageurl属性下的值
        let urlArray = x.match(regexUrl);
        // 匹配vid属性下的值
        let vidArray = x.match(regexVid);
        let coverArray = x.match(regexCover);
        // // 替换插入需要的值flg
        // let temp = pVideo[i].split('<p>');
        if (status) {
          flg = `<div 
                    class='imgbox tiejin-videobox'
                    data-vid='${vidArray[1]}' 
                    >
                    <video src='${urlArray[1]}'
                      controls='controls' 
                      preload='none' 
                      webkit-playsinline='true'
                      playsinline='true'
                      x-webkit-airplay='allow'
                      x5-video-player-type='h5'
                      x5-video-orientation='portraint'
                      poster='${coverArray[1]}' 
                      data-cover='${coverArray[1]}'>
                    </video>
                  </div>`;
        } else {
          flg = `<div 
                    class='imgbox video-native-player tiejin-videobox-native feed-video-bg'
                    data-vid='${vidArray[1]}'
                    data-bg='${coverArray[1]}'
                    style='background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==");'>
                    <div 
                      class='flex 
                      flex-align-center 
                      flex-pack-center'
                      data-vid='${vidArray[1]}' 
                      >
                      <span 
                        class='icon-font icon-shipin' 
                        data-vid='${vidArray[1]}' 
                        >
                      </span>
                    </div>
                  </div>`;
        }
        html = html.replace(x, flg);
      });
    }
    const regexIframe = /<iframe.*?(?:>|\/>|<\/iframe>)/gi;
    let piFrame = await html.match(regexIframe);
    if (piFrame) {
      const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
      const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
      piFrame.forEach((x, i) => {
        let widthArray = x.match(regexWidth);
        let heightArray = x.match(regexHeight);
        let newsplit = x.split(widthArray[0]);
        let newstr = `${newsplit[0]}width="100%"${newsplit[1]}`;
        let newsplit1 = newstr.split(heightArray[0]);
        let newstr1 = `${newsplit1[0]} height="240" ${newsplit1[1]}`;
        let flag = `<div class="imgbox tiejin-iframe">
                  ${newstr1}</iframe>
                </div>`;
        html = html.replace(x, flag);
      });
    }
    return html
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
    let regex = /^1[^01][0-9]\d{8}$/
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
  // 展开收起 速率计算
  doMove(obj, iTarget, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var iSpeed = (iTarget - obj.offsetHeight) / 5;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      iTarget == obj.offsetHeight ? (clearInterval(obj.timer), callback && callback()) : obj.style.height = iSpeed + obj.offsetHeight + "px"
    }, 30)
  },
  // jsbriadge ---ios
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  },
}
