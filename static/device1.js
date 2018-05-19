function setRem() {
  if (typeof window !== 'undefined') {
    let deviceWidth = document.documentElement.clientWidth
    if (deviceWidth > 768) deviceWidth = 768
    document.documentElement.style.fontSize = deviceWidth / 7.5 + "px"
    let nvg = navigator.userAgent.toLowerCase()
    if (nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1) {
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
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
