import api from './api.js'
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
      let n = Date.now();
      let n2 = new Date(n);
      let y2 = n2.getFullYear();
      let m2 = n2.getMonth() + 1;
      m2 = m2 < 10 ? ('0' + m2) : m2;
      let d2 = n2.getDate();
      d2 = d2 < 10 ? ('0' + d2) : d2;
      if (y2 === y && m2 === m && d2 === d) {
        return h + ':' + minute;
      } else {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
      }
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
          _src,
          nH;
        if (widthArray && heightArray) {
          nH = heightArray[1] * 92 / widthArray[1] + "vw";
        } else {
          nH = "auto";
        }
        // fix 图片是中文带路径 补丁
        if (srcArray) {
          _src = srcArray[1].replace(/\+/g, "%2b");
          flag = `<section class='imgbox tiejin-imgbox' style="width: 100%;height: ${nH};">
                    <img style="height: ${nH}" data-index="${i+1}" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==' data-src='${_src}'/>
                </section>`;
        } else {
          _src = ''
          flag = '';
        }
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
      const regexPoster = /poster=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let flg;
      pVideo.forEach((x, i) => {
        // 匹配imageurl属性下的值
        let urlArray = x.match(regexUrl),
          // 匹配vid属性下的值
          vidArray = x.match(regexVid),
          coverArray = x.match(regexCover),
          posterArray = x.match(regexPoster),
          v, u, c
        // // 替换插入需要的值flg
        if (vidArray) {
          v = vidArray[1]
        } else {
          v = ''
        }
        if (urlArray) {
          u = urlArray[1]
        } else {
          u = ''
        }
        if (coverArray) {
          c = coverArray[1]
        } else {
          if (posterArray) {
            c = posterArray[1]
          } else {
            c = ''
          }
        }
        // let temp = pVideo[i].split('<p>');
        if (status) {
          flg = `<section 
                    class='imgbox tiejin-videobox'
                    data-vid='${v}'
                    data-uid='${u}'
                    >
                    <video src='${urlArray[1]}'
                      class='feed-video-bg'
                      style="object-fit:fill"
                      controls
                      preload='none'
                      data-bg='${c}'>
                    </video>
                  </section>`;
        } else {
          flg = `<section 
                    class='imgbox video-native-player tiejin-videobox-native feed-video-bg'
                    data-vid='${v}'
                    data-uid='${u}'
                    data-bg='${c}'
                    style='background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==");'>
                    <section 
                      class='flex 
                      flex-align-center 
                      flex-pack-center'
                      data-vid='${v}'
                      data-uid='${u}'
                      >
                      <span 
                        class='icon-shipin-2' 
                        data-vid='${v}'
                        data-uid='${u}'
                        >
                      </span>
                    </section>
                  </section>`;
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
        let flag = `<section class="imgbox tiejin-iframe">
                  ${newstr1}</iframe>
                </section>`;
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
  // 毫秒转换时间
  toCurrent(d) {
    let m = Math.round(d / 1000);
    if (m >= 60) {
      let f = Math.floor(m / 60),
        c = m - 60 * f,
        a, z;
      if (f < 10) {
        a = `0${f}`
      } else {
        a = `${f}`
      }
      if (c < 10) {
        z = `0${c}`
      } else {
        z = `${c}`
      }
      return `${a}:${z}`
    } else if (m < 60) {
      if (m < 10) {
        return `00:0${m}`
      } else {
        return `00:${m}`
      }
    }
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
  isJumpOut() {
    if (typeof window != 'undefined') {
      let ua = navigator.userAgent.toLowerCase();
      var iswx = false,
        isqq = false,
        iswb = false;
      // 微信内置浏览器
      iswx = /micromessenger/i.test(ua);

      // QQ内置浏览器
      isqq = /qq/i.test(ua);
      if (/mqqbrowser/i.test(ua)) {
        isqq = false;
      }
      // 微博内置浏览器
      iswb = /weibo/i.test(ua);
      return iswx || isqq || iswb;
    }
  },
  downApp(url) {
    if (url) {
      if (!this.isJumpOut()) {
        location.href = `${url}`;
        setTimeout(() => {
          location.href = `${location.protocol}//${
            location.host
          }?downurl=${url}`;
        }, 1500)
        return;
      }
      location.href = `${location.protocol}//${
        location.host
      }?downurl=${url}`;
      return;
    } else {
      location.href = `${location.protocol}//${location.hostname}`;
    }
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
  // 唤起原生播放ship
  h5PlayVideo(u, v, c, d, e) {
    if (!c) {
      let vid = v ? v : null,
        uid = u ? u : null;
      if (d) {
        if (e) {
          if (window.WebViewJavascriptBridge) {
            this.setupWebViewJavascriptBridge(function (bridge) {
              bridge.callHandler("playVideo", {
                vid: vid,
                url: uid
              });
            });
          }
        } else {
          if (typeof window.bridge != "undefined") {
            window.bridge.playVideo(vid, uid);
          }
        }
      } else {
        // 兼容 老版本
        location.href = `/?vid=${vid}`;
      }
    }
  }
}
