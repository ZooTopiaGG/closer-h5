import Cookie from 'js-cookie'
import Coms from '~/assets/js/utils'
import {
  Indicator,
  Toast
} from 'mint-ui'
export const state = () => ({
  GET_MESSAGE_STATE: false,
  agent: '',
  GET_APP_TOKEN: '',
  content: '',
  res: {},
  webNoNav: true,
  webNoFooter: true,
  // messagelist: {},
  postType: '',
  discuss: {},
  options: false,
  exist: true,
  group_res: [],
  group_info: {},
  auth: '',
  token: '',
  visibleLogin: false,
  visibleMessage: false,
  is_follow: false,
  incr_view: ''
})

export const mutations = {
  GET_USER_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行 判断路由类型
    let nvg = para.nvg.toLowerCase();
    let refer = para.ref
    let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1 || refer.indexOf('/invite') > -1;
    state.GET_MESSAGE_STATE = !_result
  },
  GET_AGENT(state, para) {
    let nvg = para.toLowerCase();
    state.agent = nvg;
  },
  GET_APP_TOKEN(state, para) {
    state.GET_APP_TOKEN = para
  },
  SET_CONTENT(state, para) {
    state.content = para
  },
  SET_RES(state, para) {
    state.res = para
  },
  // 
  GET_INCR_VIEW(state, para) {
    console.log('para====', para)
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
  SET_DISSCUSS(state, para) {
    state.discuss = para
  },
  SET_OPTIONS(state, para) {
    state.options = para
  },
  GET_EXIST_STATUS(state, para) {
    state.exist = para
  },
  SET_GROUP_RES(state, para) {
    state.group_res = para
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
  // 关注
  SET_FOCUS_STAT(state, para) {
    state.is_follow = para
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
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
    }
  },
  // 获取微信授权code，先获取SET_AUTH 判断cookie是否存在或过期，若过期则调用get_wx_auth
  async get_wx_auth({
    commit
  }, {
    url
  }) {
    let self = this
    let para = {
      path: url
    };
    let data = await self.$axios.$post(`${api.admin.get_auth_path}`, para);
    if (data.code === 0) {
      location.href = data.result;
    }
  },

  // 通过code进行登录，如果get_wx_auth被调用， get_code_by_login才会被调用
  async get_code_by_login({
    commit
  }, {
    code,
    $router,
    type
  }) {
    let self = this,
      para;
    // 注意： code 只能用一次，所以这里校验了 就不能再登录了，需要将校验放在登录里面
    // $router 是否存在 验证是否是奖励金登录
    if (type && type === 'bonus') {
      let unionId,
        nickName,
        avatar;
      let check = await self.$axios.$get(`${api.admin.check_wechat}?code=${code}`)
      if (check.code != 0) {
        Toast({
          message: '该账号已被使用',
          position: 'top'
        })
        $router.push({
          path: '/invite/alreadyget'
        })
        return
      } else {
        if (check.result.hasRegist) {
          Toast({
            message: '该账号已被使用',
            position: 'top'
          })
          $router.push({
            path: '/invite/alreadyget'
          })
          return
        } else {
          unionId = check.result.unionId;
          nickName = check.result.nickName;
          avatar = check.result.avatar;
        }
      }
      if (Cookie.get('inviter')) {
        let inv = JSON.parse(Cookie.get('inviter'))
        para = {
          unionid: unionId,
          inviter: inv.id,
          nickName: nickName,
          avatar: avatar,
          protocol: "WEB_SOCKET"
        }
      } else {
        Toast({
          message: '该账号没有被邀请',
          position: 'top'
        })
        return
      }
    } else {
      para = {
        plateform: 2,
        code: code,
        protocol: "WEB_SOCKET",
      }
    }
    // return
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
    } else {
      return
    }
  },
  // 通过token登录， 先获取cookie查看token是否过期 如果过期则调用授权，如果没有过期则调用get_token_by_login获取用户信息
  async get_token_by_login({
    commit
  }, {
    phone,
    token,
    $router,
    type
  }) {
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    // 邀新 inviter参数
    try {
      let self = this,
        para;
      if (type && type === 'bonus') {
        let check = await self.$axios.$get(`${api.admin.check}?type=phone&code=${phone}`)
        if (check.code != 0) {
          Toast({
            message: '该账号已被使用',
            position: 'top'
          })
          $router.push({
            path: '/invite/alreadyget'
          })
          return
        }
        if (Cookie.get('inviter')) {
          let inv = JSON.parse(Cookie.get('inviter'))
          para = {
            phone: phone,
            token: token,
            inviter: inv.id,
            protocol: 'WEB_SOCKET'
          }
        } else {
          Toast({
            message: '该账号没有被邀请',
            position: 'top'
          })
          return
        }
      } else {
        para = {
          phone: phone,
          token: token,
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
    phone
  }) {
    let self = this
    Toast({
      message: '发送成功！',
      position: 'top'
    })
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    try {
      let para = {
        phone: phone
      }
      let data = await self.$axios.$post(`${api.admin.get_code_by_phone}`, para)
      if (data.code === 0) {} else {
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
  // 关注，取消关注
  async get_focus_stat({
    commit
  }, {
    communityid,
    flag
  }) {
    let self = this
    try {
      let data = await self.$axios.$get(`${api.community.subscription}?communityid=${communityid}&flag=${flag}`)
      if (data.code === 0) {
        console.log('data===subscription===', flag)
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
  }
}
