// import wx from 'weixin-js-sdk'
//全局url域配置
//测试环境
let fileBase = 'https://file-sandbox.tiejin.cn'
let options = {
  str: '', // 文本字符串
  flg: '', // 需要插入的值 可为空
  splitStr1: '', // 需要分割的标签
  size: ''
}
export default {
  createTime(milliseconds, type) {
    let time = new Date(milliseconds);
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = time.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = time.getHours();
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
      days = jTime / 1000 / 60 / 60 / 24,
      daysRound = Math.floor(days),
      hours = jTime / 1000 / 60 / 60 - (24 * daysRound),
      hoursRound = Math.floor(hours),
      minutes = jTime / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound),
      minutesRound = Math.floor(minutes),
      seconds = jTime / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
      secondsRound = Math.floor(seconds);
    if (daysRound > 0) {
      return this.createTime(milliseconds, type)
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
  getRequest() {
    let url = location.search; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  // 图片地址处理
  makeFileUrl(url, type, size) {
    let sizes = size ? size : 500
    if (type === 'src') {
      return (url.indexOf('://') !== -1) ? url + '?s=' + sizes : fileBase + url + '?s=' + sizes;
    } else {
      return (url.indexOf('://') !== -1) ? url : fileBase + url;
    }
  },
  /*
    @param 富文本分割字符串
    str 被操作的字符串
    flg 分割后需要插入的字符串
    splitStr1 分割字符串1
    splitStr2 分割字符串2
    url 图片地址
  */
  // insert_flg(a, b, c, d){
  //   let newstr = `<img src="${a}?s=${b}" width="${c}" height="${d}"/>`
  //   return newstr;
  // },
  // // 正则表达式处理图片
  // regexImg(str) {
  //   const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  //   const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
  //   const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
  //   const regexPImg =new RegExp("<img.*?(?:>|/>)","gi");
  //   // const regexPImg = /<p><img.*?(?:>|\/>)/gi
  //   let pImg = str.match(regexPImg);
  //   // console.log(pImg)
  //   // 判断 是否匹配到图片
  //   let clientWidth = document.documentElement.clientWidth
  //   let size
  //   if (pImg) {
  //     pImg.forEach(async (x, i) => {
  //       console.log(x)
  //       let srcArray = x.match(regexSrc);
  //       console.log('srcArray====', srcArray)
  //       let widthArray = x.match(regexWidth);
  //       let heightArray = x.match(regexHeight);
  //       // console.log(srcArray)
  //       if (widthArray[1] >= heightArray[1]) {
  //         size = clientWidth * 2
  //       } else {
  //         size = parseInt(clientWidth * heightArray[1] * 2 / widthArray[1]) 
  //       }
  //       // 替换插入需要的值
  //       let flag = await this.insert_flg(srcArray[1], size, clientWidth, parseInt(clientWidth * heightArray[1] / widthArray[1]))
  //       // let flag = `<img src="${srcArray[1]}?s=${size}" width="${clientWidth}" height="${parseInt(clientWidth * heightArray[1] / widthArray[1])}"/>`
  //       // 正则替换富文本内的img标签
  //       console.log('str', str)
  //       let _htmls = str.replace(regexPImg, flag);
  //       console.log(_htmls)
  //       return _htmls
  //     })
  //   } else {
  //     return str
  //   }
  // },
  /*判断是否是微信 微博 QQ*/
  isCloserApp() {
    let nvg = navigator.userAgent.toLowerCase();
    let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1;
    return _result
  },
  // 回到顶部
  backtotop(topValue) {
    // topValue 介质
    let timer = setInterval(() => {
      let h = document.documentElement.scrollTop || document.body.scrollTop;
      let nowH = h;
      let speed = (0 - nowH) / 5; // 随着高度减速
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      if (h <= topValue) { //当前小于等于介质时,停止这次计时器
        clearInterval(timer); // C1
      }
      document.documentElement.scrollTop = h + speed;
      document.body.scrollTop = h + speed;
    }, 30)
  }
}
