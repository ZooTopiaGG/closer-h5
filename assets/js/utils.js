import api from './api.js';
import Cookie from 'js-cookie';
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
    try {
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
            // _src,
            newM,
            nH,
            minH;
          if (srcArray) {
            // _src = srcArray[1].replace(/\+/g, "%2b");
            if (widthArray && heightArray) {
              if (widthArray[1] < 200) {
                nW = widthArray[1] + 'px';
                nH = heightArray[1] + 'px';
              } else {
                nW = '100%';
                nH = heightArray[1] * 100 / widthArray[1] + "%";
              }
              minH = nH;
              newM = x.replace(/src=/g, `style="width: ${nW};height: 0; padding-bottom: ${nH}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy" data-index="${i+1}" data-src=`);
            } else {
              nW = '100%';
              nH = "auto";
              minH = '28.27vw';
              newM = x.replace(/src=/g, `style="width: ${nW}; background: #e7e7e7; max-width: 100%;" data-feedlazy="feedlazy2" data-index="${i+1}" data-src=`);
            }
          } else {
            // _src = '';
            newM = '';
          }
          // 正则替换富文本内的img标签
          // 替换不同文本
          html = html.replace(x, newM);
        });
      }
      const regexVideo = /<video.*?(?:>|\/>|<\/video>)/gi;
      const regexVideo2 = /<video.*?(?:>|\/>)/gi;
      let pVideo = await html.match(regexVideo);
      if (pVideo) {
        // 正则替换富文本内 img标签 待发布（npm）
        const regexUrl = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexVid = /vid=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexCover = /imageUrl=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexPoster = /poster=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let regexDuration = /duration=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let flg;
        let pa = parseInt;
        pVideo.forEach((x, i) => {
          // 匹配imageurl属性下的值
          let urlArray = x.match(regexUrl),
            // 匹配vid属性下的值
            vidArray = x.match(regexVid),
            coverArray = x.match(regexCover),
            posterArray = x.match(regexPoster),
            widthArray = x.match(regexWidth),
            heightArray = x.match(regexHeight),
            durationArray = x.match(regexDuration),
            v, u, c, d, w, h;
          // // 替换插入需要的值flg
          v = vidArray ? vidArray[1] : '';
          u = urlArray ? urlArray[1] : '';
          d = durationArray ? durationArray[1] : '';
          if (widthArray && heightArray) {
            if (pa(widthArray[1]) >= pa(heightArray[1])) {
              w = '100%';
            } else {
              w = '60%';
              h = 'auto'
            }
          } else {
            // 默认横
            w = '100%';
            h = '56.25vw';
          }
          if (coverArray) {
            c = coverArray[1]
          } else {
            c = posterArray ? posterArray[1] : ''
          }
          // let temp = pVideo[i].split('<p>');
          if (status) {
            flg = `<section 
                    class='feed-h5-videos2 feed-h5-videos-vertical2'
                    data-vid='${v}'
                    data-uid='${u}'
                    style="width: ${w}"
                    >
                    <video src='${urlArray[1]}'
                      preload="auto" 
                      class="feed-video-bg"
                      webkit-playsinline="true" 
                      x-webkit-airplay="true"  
                      playsinline="true"
                      style="object-fit:fill;
                      width: 100%;
                      height: auto;"
                      poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
                      data-duration="${d}"
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
                      class='parent-shipin'
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
          let flag = x.replace(/<iframe /g, `<iframe style="width: 100%;max-width:100%" width="100%" `);
          html = html.replace(x, flag);
        });
      }
      return html
    } catch (e) {}
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
  // get Verison 
  async compareVersion({
    nvg,
    f,
    s,
    t
  }) {
    try {
      let b = await nvg.split('closerapp/version/')[1].split('.');
      return b[0] > f || (b[0] == f && b[1] && b[1] > s) || (b[0] == f && b[1] == s && b[2] && b[2] > t)
    } catch (e) {
      return false
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
  isIOS() {
    let u = navigator.userAgent.toLowerCase();
    return !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/)
  },
  getParam(paramName, str) {
    var paramValue = "";
    var isFound = false;
    if (
      str.indexOf("?") > -1 &&
      str.indexOf("=") > -1
    ) {
      var arrSource = unescape(str).substring(str.indexOf("?") + 1, str.length).split('&')
      var i = 0;
      while (i < arrSource.length && !isFound) {
        if (arrSource[i].indexOf("=") > -1) {
          if (
            arrSource[i].split("=")[0].toLowerCase() ==
            paramName.toLowerCase()
          ) {
            paramValue = arrSource[i].split("=")[1];
            isFound = true;
          }
        }
        i++;
      }
    }
    return paramValue;
  },
  async downApp(url) {
    if (url) {
      if (!this.isJumpOut()) {
        if (url.indexOf('?from=group') > -1) {
          let id = await this.getParam('groupid', url);
          location.href = `closer://jump/to/group`;
        } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
          location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
        } else {
          location.href = url;
        }
        setTimeout(() => {
          location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
        }, 1500)
        return;
      } else {
        if (url.indexOf('?from=group') > -1) {
          location.href = url
        } else if (url.indexOf('pkgname=com.ums.closer') > -1) {
          location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer';
        } else {
          location.href = `${location.protocol}//${location.host}?downurl=${url}`;
        }
      }
    } else {
      location.href = `${location.protocol}//${location.host}`;
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
  },
  // 合并json
  mergeJsonObject(jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
      resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
      resultJsonObject[attr] = jsonbject2[attr];
    }
    return resultJsonObject;
  },
  // 统计方法
  async down_statistics({
    store,
    route,
    str,
    defaultStr,
    redirectUrl
  }) {
    let result = await store.dispatch("down_adcookies");
    if (result) {
      let _page, url, did = route.params.id || route.params.messageid,
        progress, _str, s = JSON.parse;
      if (route.path.indexOf("/community") > -1) {
        _page = "community";
        url = `closer://community/${did}`;
      } else if (route.path.indexOf("/feed") > -1) {
        _page = "article";
        url = `closer://feed/${did}`;
        if (store.state.res.int_type === 1) {
          _page = "video";
        } else {
          _page = "article";
        }
      } else if (route.path.indexOf("/group") > -1) {
        _page = "group";
        url = `closer://group/${did}`;
      } else {
        _page = "inviter";
        url = `closer://jump/to/mine`;
        did = s(Cookie.get("inviter")).id
      }
      _str = typeof (str) === 'string' && str ? str : defaultStr;
      let p1 = {
        action: "click", //		'行为类型(曝光 浏览结束点击返回 负反馈 点击下载)，参数取值:exposure back feedback download'        
        objectType: _page || "article", //		'统计对象类型（文章 视频 栏目 群组 H5分享的群组，栏目，帖子）,参数取值:article video community group'
        objectId: did || null, //		'统计对象唯一标识'
        position: _str, //		'点击位置，若action为download时必填,参数取值：top bottom'
        progress: 1, //		'浏览进度，文章为阅读的进度，图集为当前阅读的图片/总的图片数，视频为当前播放时间/总时间 小数点两位：0.95'
        recommendId: null //		'本次推荐的唯一标识 推荐内容ID'
      };
      let res = await store.dispatch("down_statistics", {
        p1
      });
      if (res) {
        if (redirectUrl) {
          if (redirectUrl === 'wx') {
            return true
          } else {
            this.downApp(redirectUrl);
            return
          }
        } else {
          this.downApp(url);
        }
      }
    }
  },
  createScript(url, type) {
    let s = document.createElement("script");
    s.src = url;
    if (type) {
      s.defer = type
    }
    document.head.appendChild(s);
  }
}
