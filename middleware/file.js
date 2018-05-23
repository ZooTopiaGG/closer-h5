// 路由中间件
export default function (context) {
	if (typeof window != 'undefined') {
    host = window.location.host;
    console.log('window===', config.baseURL)      
	} else {
    if (context.req) {
      host = context.req.headers.host;     
    }
	}
	if (/sandbox.tiejin/.test(host)) {
    // api.filePath = 'http://file-sandbox.tiejin.cn'      
    } else if (/tiejin/.test(host)) {
    // api.filePath = 'http://file.tiejin.cn'
	}
}
  