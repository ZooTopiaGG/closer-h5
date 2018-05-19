function setRem() {
  if (typeof window !== 'undefined') {
    let deviceWidth = document.documentElement.clientWidth
    if (deviceWidth > 768) deviceWidth = 768
    document.documentElement.style.fontSize = deviceWidth / 7.5 + "px"
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
