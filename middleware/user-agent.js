// 路由中间件
export default async function (context) {
  // 请求先判断Url 是否有token
  if (context.req) {
    let isServer = process.server;
    context.userAgent = isServer ? context.req.headers['user-agent'] : navigator.userAgent
    context.store.commit('GET_USER_AGENT', {
      nvg: context.userAgent,
      ref: context.req.originalUrl
    })
    context.store.commit('GET_APP_AGENT', {
      nvg: context.userAgent
    })
    context.store.commit('GET_AGENT', context.userAgent)
    context.store.commit('GET_APP_TOKEN', context.req.headers['authorization'])
    let nvg = context.userAgent.toLowerCase()
    // console.log(!(nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1) && !context.store.state.h5Cookies)
    if (!(nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1) && !context.store.state.h5Cookies) {
      let res = await context.store.dispatch("get_adcookie", {
        webUdid: true
      });
    }
  }
}
