// 路由中间件
export default async function (context) {
  // 请求先判断Url 是否有token
  if (context.req) {
    let isServer = process.server;
    context.userAgent = isServer ? context.req.headers['user-agent'] : navigator.userAgent
    // 获取并设置UA
    context.store.commit('GET_USER_AGENT', {
      nvg: context.userAgent,
      ref: context.req.originalUrl
    })
    // 获取当前页面的URL
    if (!context.store.state.current_url) {
      context.store.commit('SET_CURRENT_URL', context.req.headers.referer)
    }
    // 获取并设置当前TOKEN
    context.store.commit('GET_APP_TOKEN', context.req.headers['authorization'])
    let nvg = context.userAgent.toLowerCase()
    // 判断UA，并发出请求
    if (!(nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1) && !context.store.state.h5Cookies) {
      await context.store.dispatch("get_adcookie", {
        webUdid: true
      });
    }
  }
}
