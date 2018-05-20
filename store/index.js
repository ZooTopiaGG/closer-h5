import Cookie from 'js-cookie'
import Coms from '~/assets/js/utils'
import {
  Indicator,
  Toast
} from 'mint-ui'
export const state = () => ({
  GET_MESSAGE_STATE: false,
  GET_APP_TOKEN: '',
  content: '',
  res: {},
  messagelist: {},
  postType: '',
  discuss: {},
  options: false,
  exist: true,
  group_res: [],
  group_info: {},
  auth: '',
  token: '',
  visibleLogin: false,
  visibleMessage: false
})

export const mutations = {
  GET_USER_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行
    let nvg = para.toLowerCase();
    let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1;
    state.GET_MESSAGE_STATE = !_result
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
  SET_MESSAGE(state, para) {
    state.messagelist = para
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
  // 莫太狂状态
  SET_VISIBLE_LOGIN(state, para) {
    state.visibleLogin = para
  },
  SET_VISIBLE_MESSAGE(state, para) {
    state.visibleMessage = para
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
      // console.log(token) 判断token是否存在或过期， 存在返回token，否则返回false
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
    console.log(url)
    let self = this
    let para = {
      path: url
    };
    let data = await self.$axios.$post(`${api.admin.get_auth_path}`, para);
    if (data.code === 0) {
      console.log("getcode===", data);
      location.href = data.result;
    }
  },
  // 通过code进行登录，如果get_wx_auth被调用， get_code_by_login才会被调用
  async get_code_by_login({
    commit
  }, {
    code
  }) {
    let self = this
    let para = {
      plateform: 2,
      code: code,
      protocol: "WEB_SOCKET"
    };
    let data = await self.$axios.$post(`${api.admin.login_with_wechat}`, para);
    console.log('wxlogindata===', data)
    if (data.code === 0) {
      console.log("datauser====", data.result.user);
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
      console.log('usercookies=====', Cookie.get('user'))
      console.log('tokencookies=====', Cookie.get('token'))
      // localstorage.setAge(0.1 * 24 * 60 * 60 * 1000).set('wx_user', userInfo).set('wx_token', userToken)
      commit('SET_USER', userInfo)
      commit('SET_TOKEN', userToken)
    } else {
      // self.$toast({
      //   message: data.result,
      //   position: "top"
      // });
    }
  },
  // 通过token登录， 先获取cookie查看token是否过期 如果过期则调用授权，如果没有过期则调用get_token_by_login获取用户信息
  async get_token_by_login({
    commit
  }, {
    phone,
    token
  }) {
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    try {
      let self = this
      let para = {
        phone: phone,
        token: token,
        protocol: 'WEB_SOCKET'
      }
      let data = await self.$axios.$post(`${api.admin.closeruser_regist}`, para)
      if (data.code === 0) {
        console.log('data===login===', data)
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
        // localstorage.setAge(0.1 * 24 * 60 * 60 * 1000).set('wx_user', userInfo).set('wx_token', userToken)
        commit('SET_USER', userInfo)
        commit('SET_TOKEN', userToken)
        Toast({
          message: '登录成功',
          position: 'top'
        })
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
      // console.log('data===', data)
      if (data.code === 0) {
        console.log('data===send===', data)
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
