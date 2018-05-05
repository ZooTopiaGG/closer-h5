export default function ({ $axios, redirect, app, store }) {
  $axios.onRequest(config => {
    config.headers.Authorization = "GroukAuth 1.f929e95038b6a7ce746fe58cb9f6f8d3f83c4f067f6cb28ad2ad86b34a4c557e5d73bdf4ebac38e380e965085c5451e308570963ee71112e099f7add0e495f45"
    console.log('Making request to ' + config.url)
    if (store.state.GET_APP_TOKEN) {
      console.log('ddddddadada==',config.url)
      config.headers.Authorization = store.state.GET_APP_TOKEN
    } else {
      return
    }
    // console.log('Making request to ' + config.url)
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    else if(error.code === 500) {
      redirect('/sorry')
    } else {
      redirect('/error')
    }
  })
}