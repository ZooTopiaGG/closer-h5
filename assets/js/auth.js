import Cookie from 'js-cookie'
export default {
  //获取服务端cookie
  getcookiesInServer: function (req) {
    let service_cookie = {};
    // console.log('着 his萨达萨达是的=====', req.headers.cookie)
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    // console.log('service_cookie ====', service_cookie)
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient: function (key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  }
}
