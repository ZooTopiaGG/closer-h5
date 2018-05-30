// 路由中间件
export default function (context) {
  // 给上下文对象增加 userAgent 属性（增加的属性可在 `asyncData` 和 `fetch` 方法中获取
  // let isClient = process.client;

  // 请求先判断Url 是否有token
  if (context.req) {
    // console.log('req====', context.req)
    // console.log('requrl====', context.req.url)
    // console.log('reqoriginalurl====', context.req.originalUrl)
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
