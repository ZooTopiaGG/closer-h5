/*适配移动设备 关键代码*/
(function() {
    if (typeof window !== 'undefined') {
        let deviceWidth = document.documentElement.clientWidth
        if (deviceWidth > 768) deviceWidth = 768
        document.documentElement.style.fontSize = deviceWidth / 7.5 + "px"
        document.body.style.overflow = "hidden"
    } else {
        console.log('Do not use window in server')
    }
})();
