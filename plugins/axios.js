import Cookie from 'js-cookie'
export default function ({
  $axios,
  redirect,
  app,
  store,
  req
}) {
  if (req) {
    let host = req.headers.host;
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'http://file.tiejin.cn'
    }
  } else {
    let host = window.location.host
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'http://file-sandbox.tiejin.cn'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'http://file.tiejin.cn'
    }
  }
  $axios.onRequest(config => {
    // console.log('Making request to==', config)
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
    } else if (/tiejin/.test(host)) {
      config.baseURL = 'https://api.tiejin.cn/command/'
    }
    // console.log('tokenenenen', store.state.token)
    // 线上时
    // console.log('Making request to ' + config.url)
    if (store.state.GET_APP_TOKEN && (config.url === 'closer_report.add' || config.url === 'closer_user.invite_counts')) {
      // console.log('ddddddadada==',config.url)
      config.headers.Authorization = store.state.GET_APP_TOKEN
    } else if (store.state.token &&
      (config.url === 'closer_reply.add_reply' || config.url === 'closer_reply.like' || config.url === 'closer_reply.replys' || config.url === 'closer_reply.comments')) {
      // 获取贴子详情不需要token验证
      config.headers.Authorization = `GroukAuth ${store.state.token}`
    } else {
      return
      // config.headers.Authorization = "GroukAuth 1.a2c03ce97d05b3bd41698909590e8d65436c831f1d32ca79cf94897ce0cd82ef"
    }
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
