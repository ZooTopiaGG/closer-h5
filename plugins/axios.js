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
      api.filePath = 'https://file-sandbox.tiejin.cn'
      api.baseUrl = 'https://api-sandbox.tiejin.cn/command/'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'https://file.tiejin.cn'
      api.baseUrl = 'https://api.tiejin.cn/command/'
    } else {
      api.filePath = 'https://file-sandbox.tiejin.cn'
      api.baseUrl = 'https://api-sandbox.tiejin.cn/command/'
    }
  } else {
    let host = window.location.host
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'https://file-sandbox.tiejin.cn'
      api.baseUrl = 'https://api-sandbox.tiejin.cn/command/'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'https://file.tiejin.cn'
      api.baseUrl = 'https://api.tiejin.cn/command/'
    } else {
      api.filePath = 'https://file-sandbox.tiejin.cn'
      api.baseUrl = 'https://api-sandbox.tiejin.cn/command/'
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
      // config.baseURL = 'http://10.3.0.116:8080/command/'
    } else if (/tiejin/.test(host)) {
      config.baseURL = 'https://api.tiejin.cn/command/'
    } else {
      config.baseURL = 'https://api-sandbox.tiejin.cn/command/'
    }
    // 全局设置 启用跨域传cookies
    config.withCredentials = true
    if (!store.state.GET_IS_APP) {
      if (store.state.h5Adid) {
        config.headers.common['X-Adid'] = store.state.h5Adid
      }
      let co;
      try {
        co = Cookies.get('h5Cookies')
      } catch (e) {
        co = store.state.h5Cookies
      }
      config.headers.common['X-Udid'] = co || 'h5-SRjHazKvYslHxwZxjy5tql9G4edf3d';
      if (co) {
        config.headers.common['Closer-Agent'] = 'Closer-H5';
      }
    }
    let t;
    try {
      t = Cookie.get('token')
    } catch (e) {
      t = store.state.token
    }
    // 线上时
    if (store.state.GET_APP_TOKEN && (config.url === 'closer_report.add' || config.url === 'closer_user.invite_counts' || config.url === 'closer_report.get_report_types')) {
      config.headers.Authorization = store.state.GET_APP_TOKEN
    } else if (t) {
      // 获取贴子详情不需要token验证
      config.headers.Authorization = `GroukAuth ${t}`
    } else {
      return
    }
  })
  // // 待处理
  // $axios.onError(error => {
  //   console.log('error======', error)
  //   const code = parseInt(error.response && error.response.status)
  //   console.log('code=============================', code)
  //   if (code) {
  //     redirect('/error')
  //   } else {
  //     redirect('/error/10x')
  //   }
  // })
}
