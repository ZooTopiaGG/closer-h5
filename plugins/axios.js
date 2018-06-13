import Cookie from 'js-cookie'
export default function ({
  $axios,
  redirect,
  app,
  store,
  req,
  res
}) {
  if (req) {
    let host = req.headers.host;
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'http://file.tiejin.cn'
    } else {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    }
  } else {
    let host = window.location.host
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'http://file.tiejin.cn'
    } else {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    }
  }
  $axios.onRequest(config => {
    let host;
    if (typeof window != 'undefined') {
      host = window.location.host;
    } else {
      if (req) {
        host = req.headers.host;
      }
    }
    if (/sandbox.tiejin/.test(host)) {
      config.baseURL = 'https://api-sandbox.tiejin.cn/command/'
      // config.baseURL = 'http://192.168.136.52:8080/command/'
    } else if (/tiejin/.test(host)) {
      config.baseURL = 'https://api.tiejin.cn/command/'
    } else {
      config.baseURL = 'https://api-sandbox.tiejin.cn/command/'
    }
    // console.log('cooccococ====', store.state.h5Cookies)
    if (store.state.GET_MESSAGE_STATE) {
      config.headers.common['X-Udid'] = store.state.h5Cookies || 'h5-SRjHazKvYslHxwZxjy5tql9G4edf3d';
      if (store.state.h5Cookies) {
        config.headers.common['Closer-Agent'] = 'Closer-H5';
      }
    }
    // 线上时
    if (store.state.GET_APP_TOKEN && (config.url === 'closer_report.add' || config.url === 'closer_user.invite_counts' || config.url === 'closer_report.get_report_types')) {
      config.headers.Authorization = store.state.GET_APP_TOKEN
    } else if (store.state.token) {
      // 获取贴子详情不需要token验证
      config.headers.Authorization = `GroukAuth ${store.state.token}`
    }
    // console.log(' config.headers========', config.headers)
  })
  $axios.onResponse(config => {
    // console.log('config====', config)
    // res.writeHead(200, {
    //   'Set-Cookie': store.state.h5Cookies
    // });
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (error.code === 500) {
      redirect('/sorry')
    } else {
      redirect('/error')
    }
  })
}
