function setRem() {
  if (typeof window !== 'undefined') {
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

// //获取浏览器页面可见高度和宽度  
// var _PageHeight = document.documentElement.clientHeight,
//   _PageWidth = document.documentElement.clientWidth;
// //计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）  
// var _LoadingTop = _PageHeight > 200 ? (_PageHeight - 200) / 2 : 0,
//   _LoadingLeft = _PageWidth > 200 ? (_PageWidth - 200) / 2 : 0;
// //在页面未加载完毕之前显示的loading Html自定义内容  
// var _LoadingHtml = `<div id="loadingDiv" 
// style="position:absolute;left:0;width:100%;
// height:${_PageHeight}px;top:0;background:#fff;
// opacity:1;filter:alpha(opacity=80);z-index:10000;">
// <div 
// style="position: absolute; 
// cursor1: wait; left: ${_LoadingLeft}px; 
// top: ${_LoadingTop}px;">
// <img src="/loading2.gif" width="200" height="200"/>
// </div></div>`;
// //呈现loading效果  
// document.write(_LoadingHtml);

// //监听加载状态改变  
// document.onreadystatechange = completeLoading;

// //加载状态为complete时移除loading效果  
// function completeLoading() {
//   if (document.readyState == "complete") {
//     var loadingMask = document.getElementById('loadingDiv');
//     loadingMask.parentNode.removeChild(loadingMask);
//   }
// }
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
