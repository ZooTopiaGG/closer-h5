// 路由中间件
export default function (context) {

  // 请求先判断Url 是否有token
  if (context.req) {
    let isServer = process.server;
    context.userAgent = isServer ? context.req.headers['user-agent'] : navigator.userAgent
    context.store.commit('GET_USER_AGENT', {
      nvg: context.userAgent,
      ref: context.req.originalUrl
    })
    console.log('context.userAgent===', context.userAgent)
    context.store.commit('GET_AGENT', context.userAgent)
    context.store.commit('GET_APP_TOKEN', context.req.headers['authorization'])
  }
}
