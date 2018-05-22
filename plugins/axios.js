export default function ({
  $axios,
  redirect,
  app,
  store,
  req
}) {
  $axios.onRequest(config => {
    // console.log('Making request to==', config)
    let host;
    if (typeof window != 'undefined') {
      host = window.location.host;
      console.log('window===', config.baseURL)      
    } else {
      if (req) {
        host = req.headers.host;
        console.log('server===', config.baseURL)      
      }
    }
    if (/sandbox.tiejin/.test(host)) {
      api.filePath = 'http://file-sandbox.tiejin.cn'      
      config.baseURL = 'https://api-sandbox.tiejin.cn/command/'
    } else if (/tiejin/.test(host)) {
      api.filePath = 'http://file.tiejin.cn'      
      config.baseURL = 'https://api.tiejin.cn/command/'
    }
    // 线上时
    // console.log('Making request to ' + config.url)
    if (store.state.GET_APP_TOKEN && (config.url === 'closer_report.add' || config.url === 'closer_user.invite_counts')) {
      // console.log('ddddddadada==',config.url)
      config.headers.Authorization = store.state.GET_APP_TOKEN
    } else {
      // config.headers.Authorization = "GroukAuth 1.a2c03ce97d05b3bd41698909590e8d65436c831f1d32ca79cf94897ce0cd82ef"
      return
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
