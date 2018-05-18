import utils from '~/assets/js/utils.js'
export default async function ({
  app,
  error,
  store,
  req
}) {
  console.log('req.headers.referer====', req.headers.referer)
  if (process.client) {
    console.log('dddd======', utils.isWeiXin())
    await store.dispatch('get_wx_auth', {
      url: 'http://h5-sandbox.tiejin.cn/invite/bonus'
    })
  }
}
