function setRem() {
  if (typeof window !== 'undefined') {
    let nvg = navigator.userAgent.toLowerCase()
    // 判断页面当前处于的浏览器或者当前链接，设置html的hidden和auto
    if (nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1 || location.href.indexOf('/invite') > -1) {
      document.documentElement.style.overflow = "auto"
    } else {
      document.documentElement.style.overflow = "hidden"
    }
  } else {
    console.log('Do not use window in server')
  }
}
// 初始化
setRem()

if (typeof document != 'undefined') {
  document.onreadystatechange = completeLoading;
}

function completeLoading() {
  if (document.readyState == 'interactive') {
    canShowContent()
    try {
      window.webkit.messageHandlers.canShowContent.postMessage(null);
    } catch (e) {}
  }
  if (document.readyState == "complete") {}
}

function canShowContent() {}
