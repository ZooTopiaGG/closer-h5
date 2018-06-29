import Cookie from 'js-cookie'
import Coms from '~/assets/js/utils'
import {
  Indicator,
  Toast
} from 'mint-ui'
export const state = () => ({
  GET_MESSAGE_STATE: false,
  GET_APP_NAV: false,
  agent: '',
  nvgtype: '',
  nvgversion: '',
  GET_APP_TOKEN: '',
  content: '',
  end_html: '',
  discuss: {},
  res: {},
  postType: '',
  options: false,
  exist: true,
  feed_list: [],
  group_info: {},
  webNoNav: true,
  webNoFooter: true,
  auth: '',
  token: '',
  visibleLogin: false,
  visibleMessage: false,
  is_follow: false,
  incr_view: '',
  h5Cookies: '',
  current_url: '',
  message_item: {},
  messagelist: []
})

export const mutations = {
  GET_USER_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行 判断路由类型
    let nvg = para.nvg.toLowerCase();
    let refer = para.ref
    let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1 || refer.indexOf('/invite') > -1;
    state.GET_MESSAGE_STATE = !_result
  },
  GET_APP_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行 判断路由类型
    let nvg = para.nvg.toLowerCase();
    let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1;
    state.GET_APP_NAV = !_result
  },
  GET_AGENT(state, para) {
    let nvg = para.toLowerCase();
    state.agent = nvg;
  },
  GET_VERSION(state) {
    let nvg = navigator.userAgent.toLowerCase(),
      nvgtype, nvgversion;
    // window.navigator.appVersion 获取手机版本
    if (nvg.indexOf('android') > -1 || nvg.indexOf('adr') > -1 || nvg.indexOf('linux') > -1) {
      // android终端
      nvgtype = 'android'
      // android版本
      if (!!nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))) {
        let v = nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))
        nvgversion = v[1].replace(/\./g, "_")
      }
    } else if (nvg.indexOf('iphone') > -1 || nvg.indexOf('ipad') > -1 || nvg.indexOf('safari') > -1) {
      // ios终端
      nvgtype = 'ios'
      // ios版本 new RegExp("version/(\\d+(?:\\.\\d*)?)") // 匹配尽量少的一项
      // new RegExp("version/(\\d+(?:\\.\\d*)+)") 匹配尽量多的项
      if (!!nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))) {
        let v = nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))
        nvgversion = v[1].replace(/\./g, "_")
      }
    } else {
      nvgtype = 'windows'
    }
    state.nvgversion = nvgversion;
    state.nvgtype = nvgtype;
  },
  GET_APP_TOKEN(state, para) {
    state.GET_APP_TOKEN = para
  },
  SET_CONTENT(state, para) {
    state.content = para
  },
  SET_END_HTML(state, para) {
    state.end_html = para
  },
  SET_RES(state, para) {
    state.res = para
  },
  SET_DISSCUSS(state, para) {
    state.discuss = para
  },
  // 
  GET_INCR_VIEW(state, para) {
    state.incr_view = para
  },
  SET_NO_NAV(state, para) {
    state.webNoNav = para
  },
  SET_NO_FOOTER(state, para) {
    state.webNoFooter = para
  },
  SET_POSTTYPE(state, para) {
    state.postType = para
  },
  SET_OPTIONS(state, para) {
    state.options = para
  },
  GET_EXIST_STATUS(state, para) {
    state.exist = para
  },
  SET_FEED_LIST(state, para) {
    state.feed_list = para
  },
  SET_GROUP_INFO(state, para) {
    state.group_info = para
  },
  // 微信授权信息
  SET_USER(state, para) {
    state.auth = para
  },
  SET_TOKEN(state, para) {
    state.token = para
  },
  // 分享feed
  SET_VISIBLE_LOGIN(state, para) {
    state.visibleLogin = para
  },
  SET_VISIBLE_MESSAGE(state, para) {
    state.visibleMessage = para
  },
  SET_MESSAGE_ITEM(state, para) {
    state.message_item = para
  },
  SET_MESSAGE_LIET(state, para) {
    state.messagelist = para
  },
  // 关注
  SET_FOCUS_STAT(state, para) {
    state.is_follow = para
  },
  // 获取h5cookies
  SET_H5COOKIES(state, para) {
    state.h5Cookies = para
  },
  // 设置当前url
  SET_CURRENT_URL(state, para) {
    state.current_url = para
  }
}

export const actions = {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    if (req && req.headers.cookie) {
      // 进入页面之前请求服务 获取cookies
      let user = Coms.getCookiebyName(decodeURIComponent(decodeURIComponent(req.headers.cookie)), 'user')
      let token = Coms.getCookiebyName(decodeURIComponent(decodeURIComponent(req.headers.cookie)), 'token')
      let h5Cookies = Coms.getCookiebyName(decodeURIComponent(decodeURIComponent(req.headers.cookie)), 'h5Cookies')
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
      commit('SET_H5COOKIES', h5Cookies)
    }
  },
  // 获取微信授权code，先获取SET_AUTH 判断cookie是否存在或过期，若过期则调用get_wx_auth
  async get_wx_auth({
    commit
  }, {
    url
  }) {
    let self = this
    try {
      let para = {
        path: url
      };
      let data = await self.$axios.$post(`${api.admin.get_auth_path}`, para);
      if (data.code === 0) {
        location.href = data.result;
      }
    } catch (e) {
      console.log(e)
    }
  },

  // 通过code进行登录，如果get_wx_auth被调用，get_code_by_login才会被调用
  async get_code_by_login({
    commit
  }, {
    code,
    // $router,
    inv_id,
    type
  }) {
    let self = this,
      para;
    // 注意： code 只能用一次，所以这里校验了 就不能再登录了，需要将校验放在登录里面
    // $router 是否存在 验证是否是奖励金登录
    if (type && type === 'bonus') {
      let unionId,
        nickName,
        avatar,
        paras = {
          code: code
        }
      // 校验账号是否存在
      let check = await self.$axios.$post(`${api.admin.check_wechat}`, paras)
      if (check.code != 0) {
        return false
      } else {
        if (check.result.hasRegist) {
          return false
        } else {
          unionId = check.result.unionId;
          nickName = check.result.nickName;
          avatar = check.result.avatar;
        }
      }
      if (inv_id) {
        para = {
          unionid: unionId,
          inviter: inv_id,
          nickName: nickName,
          avatar: avatar,
          protocol: "WEB_SOCKET"
        }
      } else {
        return false
      }
    } else {
      para = {
        plateform: 2,
        code: code,
        protocol: "WEB_SOCKET",
      }
    }
    let data = await self.$axios.$post(`${api.admin.login_with_wechat}`, para);
    if (data.code === 0) {
      // 返回的数据
      let userInfo = {
        gender: data.result.user.gender,
        phones: data.result.user.phones,
        updateTime: data.result.user.updateTime,
        avatar: data.result.user.avatar,
        createTime: data.result.user.createTime,
        teamID: data.result.user.teamID,
        // 姓名
        fullname: data.result.user.fullname,
        security_signal: data.result.user.security_signal,
        objectID: data.result.user.objectID,
        email: data.result.user.email,
        username: data.result.user.username,
        status: data.result.user.status
      };
      let userToken = data.result.token;
      // // 存cookies
      Cookie.set('token', userToken, {
        expires: 7
      })
      Cookie.set('user', userInfo, {
        expires: 7
      })
      commit('SET_USER', userInfo)
      commit('SET_TOKEN', userToken)
      return true
    } else {
      return false
    }
  },
  // 通过token登录， 先获取cookie查看token是否过期 如果过期则调用授权，如果没有过期则调用get_token_by_login获取用户信息
  async get_token_by_login({
    commit
  }, {
    phone,
    token,
    // $router,
    type
  }) {
    // 点击必须登录的按 钮，可获取cookie进行判断 信息
    // 邀新 inviter参数
    try {
      let self = this,
        para;
      if (type && type === 'bonus') {
        para = {
          type: 'phone',
          code: phone
        }
        let check = await self.$axios.$post(`${api.admin.check}`, para)
        if (check.code != 0) {
          Toast({
            message: '您不是新用户或者您已经领取过了',
            position: 'top'
          })
          location.href = '/invite/alreadyget'
          return false
        }
        if (Cookie.get('inviter')) {
          let inv = JSON.parse(Cookie.get('inviter'))
          para = {
            phone: phone,
            token: token,
            inviter: inv.id,
            udid: Cookie.get('h5Cookies'),
            protocol: 'WEB_SOCKET'
          }
        } else {
          Toast({
            message: '该账号没有被邀请',
            position: 'top'
          })
          return false
        }
      } else {
        para = {
          phone: phone,
          token: token,
          udid: Cookie.get('h5Cookies'),
          protocol: 'WEB_SOCKET'
        }
      }
      let data = await self.$axios.$post(`${api.admin.closeruser_regist}`, para)
      if (data.code === 0) {
        let userInfo = {
          gender: data.result.user.gender,
          phones: data.result.user.phones,
          updateTime: data.result.user.updateTime,
          avatar: data.result.user.avatar,
          createTime: data.result.user.createTime,
          teamID: data.result.user.teamID,
          // 姓名
          fullname: data.result.user.fullname,
          security_signal: data.result.user.security_signal,
          objectID: data.result.user.objectID,
          email: data.result.user.email,
          username: data.result.user.username,
          status: data.result.user.status
        };
        let userToken = data.result.token;
        // // 存cookies
        Cookie.set('token', userToken, {
          expires: 7
        })
        Cookie.set('user', userInfo, {
          expires: 7
        })
        commit('SET_USER', userInfo)
        commit('SET_TOKEN', userToken)
        if (type && type === "bonus") {
          Toast({
            message: '领取成功，前往App直接领取',
            position: 'top'
          })
        }
        return true
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
        return false
      }
    } catch (err) {
      Toast({
        message: 'throw new error not be normal',
        position: 'top'
      })
      throw err;
    }
  },
  // 获取验证码
  async get_code_by_phone({
    commit
  }, {
    phone,
    grouk_captcha_value
  }) {
    let self = this
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    try {
      let para = {
        phone: phone,
        grouk_captcha_value: grouk_captcha_value
      }
      let data = await self.$axios.$post(`${api.admin.get_code_by_phone}`, para)
      console.log('data====', data)
      if (data.code === 0) {
        Toast({
          message: '发送成功！',
          position: 'top'
        });
        return true
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
        return false
      }
    } catch (err) {
      Toast({
        message: err,
        position: 'top'
      })
    }
  },
  // 关注，取消关注
  async get_focus_stat({
    commit
  }, {
    communityid,
    flag
  }) {
    let self = this
    try {
      let para = {
        communityid: communityid,
        flag: flag
      }
      let data = await self.$axios.$post(`${api.community.subscription}`, para)
      if (data.code === 0) {
        if (flag == 0) {
          commit('SET_FOCUS_STAT', false)
        } else {
          commit('SET_FOCUS_STAT', true)
          Toast({
            message: '关注成功',
            position: 'top'
          })
        }
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
      }
    } catch (err) {
      Toast({
        message: err,
        position: 'top'
      })
    }
  },
  // 微信分享
  async wx_share({
    commit
  }, {
    title,
    desc,
    pic
  }) {
    let self = this,
      url = location.href.split('#')[0],
      para = {
        url: url
      }
    try {
      let res = await self.$axios.$post(`${api.share.wechat_config}`, para)
      if (res.code === 0) {
        let data = res.result;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: data.appId, // 必填，公众号的唯一标识
          timestamp: data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.nonceStr, // 必填，生成签名的随机串
          signature: data.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              Toast('分享成功');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享给好友
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: pic, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              //layer.msg('分享成功');
              Toast('分享成功');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享到qq
          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              Toast('分享成功');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享到QQ空间
          wx.onMenuShareQZone({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: url, // 分享链接
            imgUrl: pic, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              Toast('分享成功');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        });
        wx.error(function (res) {
          // console.log(res);
        });
      }
    } catch (e) {
      console.log('e====', e)
    }
  },
  // h5设置cookies埋点
  async get_adcookie({
    commit
  }, {
    webUdid
  }) {
    let self = this
    try {
      let para = {
        webUdid: webUdid
      }
      let data = await self.$axios.$post(`${api.share.get_adcookie}`, para)
      if (data.code === 0) {
        commit('SET_H5COOKIES', data.result.udid)
        // Cookie.set("h5Cookies", data.result.udid);
        return data.result.udid
      }
    } catch (e) {
      console.log('e==', e)
    }
  },
  // 下载调用get_adcookies
  async down_adcookies({
    commit
  }, {
    webUdid,
    deviceType,
    deviceVersion,
    adid
  }) {
    let self = this,
      para = {
        webUdid: true,
        deviceType: deviceType || 'ios',
        deviceVersion: deviceVersion || '11_0_0',
        adid: adid || 'closer-share'
      }
    let data = await self.$axios.$post(`${api.share.get_adcookie}`, para)
    if (data.code === 0) {
      return true
    }
  },
  // 留言列表
  async message_list({
    commit
  }, {
    subjectid
  }) {
    let self = this;
    try {
      let para1 = {
        pagesize: 5,
        pagenum: 1,
        subjectid: subjectid
      };
      let data = await self.$axios.$post(`${api.command.comments}`, para1);
      if (data.code === 0) {
        // self.messagelist = data.result;
        commit('SET_MESSAGE_LIET', data.result)
      } else {
        self.$toast({
          message: data.result,
          position: "top"
        });
      }
      return true
    } catch (err) {
      self.$toast({
        message: err,
        position: "top"
      });
    }
  },
}
