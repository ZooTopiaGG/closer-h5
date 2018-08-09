import Cookie from 'js-cookie'
import Coms from '~/assets/js/utils'
import {
  Indicator,
  Toast
} from 'mint-ui'
export const state = () => ({
  GET_MESSAGE_STATE: false,
  GET_IS_APP: false,
  agent: '',
  isPre: false,
  nvgtype: '',
  nvgTypeToPowerCase: '',
  nvgversion: '',
  GET_APP_TOKEN: '',
  content: '',
  end_html: '',
  discuss: {},
  res: {},
  exist: true,
  feed_list: [],
  group_info: {},
  webNoNav: true,
  webNoFooter: true,
  auth: '',
  token: '',
  visibleLogin: false,
  is_follow: false,
  incr_view: '',
  h5Cookies: '',
  h5Adid: '',
  isLongVideo: false,
  current_url: '',
  message_item: {},
  messagelist: '',
  alert_stat: false,
  confirm_stat: false,
  version_1_2: true, // 默认 1.2版本以上
  get_login_type: '', // toFocus 来自关注后弹窗 toDown 来自登录后直接跳转下载 inviter 来自奖励金,
  extension_text: '', // 来自某个按钮的点击
  enter_time: 0,
  current_time: 0,
  duration_time: 0,
})

export const mutations = {
  // 设置特殊状态
  async GET_USER_AGENT(state, para) {
    // 通过中间件。判断在路由之前执行 判断路由类型
    let nvg = para.nvg.toLowerCase(),
      refer = para.ref,
      r = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1,
      _result = r || refer.indexOf('/invite') > -1;
    state.version_1_2 = await Coms.compareVersion(nvg);
    state.GET_MESSAGE_STATE = !_result;
    state.GET_IS_APP = r
    state.agent = nvg;
    state.isPre = refer.indexOf('?view=pre') > -1;
  },
  // 前端获取手机浏览器版本以及内核
  GET_VERSION(state) {
    let nvg = navigator.userAgent.toLowerCase(),
      nvgtype, nvgversion, nvgTypeToPowerCase;
    // window.navigator.appVersion 获取手机版本
    if (nvg.indexOf('android') > -1 || nvg.indexOf('adr') > -1 || nvg.indexOf('linux') > -1) {
      // android终端
      nvgtype = 'android';
      nvgTypeToPowerCase = 'Android';
      // android版本
      if (!!nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))) {
        let v = nvg.match(new RegExp("android\\s(\\d+(?:\\.\\d*)+)"))
        nvgversion = v[1].replace(/\./g, "_")
      }
    } else if (nvg.indexOf('iphone') > -1 || nvg.indexOf('ipad') > -1 || nvg.indexOf('safari') > -1) {
      // ios终端
      nvgtype = 'ios'
      nvgTypeToPowerCase = 'IOS'
      // ios版本 new RegExp("version/(\\d+(?:\\.\\d*)?)") // 匹配尽量少的一项
      // new RegExp("version/(\\d+(?:\\.\\d*)+)") 匹配尽量多的项
      if (!!nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))) {
        let v = nvg.match(new RegExp("version/(\\d+(?:\\.\\d*)+)"))
        nvgversion = v[1].replace(/\./g, "_")
      }
    } else {
      nvgtype = 'windows'
      nvgTypeToPowerCase = 'Windows'
    }
    state.nvgversion = nvgversion;
    state.nvgtype = nvgtype;
    state.nvgTypeToPowerCase = nvgTypeToPowerCase
  },
  // 前端获取UA
  async GET_UA_FORNT(state, para) {
    let nvg = para.toLowerCase();
    state.version_1_2 = await Coms.compareVersion(nvg);
    // // 基于 1.1.100 做验证
    // if (nvg.indexOf('closerapp/version/') > -1) {
    //   let b = nvg.split('closerapp/version/')[1].split('.');
    //   state.version_1_2 = b[0] > 1 || (b[0] == 1 && b[1] && b[1] > 1) || (b[0] == 1 && b[1] == 1 && b[2] && b[2] > 100)
    // } else {
    //   state.version_1_2 = false
    // }
  },
  // 设置获取app传来的token
  GET_APP_TOKEN(state, para) {
    state.GET_APP_TOKEN = para
  },
  // 设置贴子详情内容
  SET_CONTENT(state, para) {
    state.content = para
  },
  // 设置神议论结束语
  SET_END_HTML(state, para) {
    state.end_html = para
  },
  // 设置贴子返回详情
  SET_RES(state, para) {
    state.res = para
  },
  // 设置神议论列表信息
  SET_DISSCUSS(state, para) {
    state.discuss = para
  },
  // 设置阅读量
  GET_INCR_VIEW(state, para) {
    state.incr_view = para
  },
  // 设置顶部导航显示状态
  SET_NO_NAV(state, para) {
    state.webNoNav = para
  },
  // 竖视频
  ITS_LONG_VIDEO(state, para) {
    state.isLongVideo = para
  },
  // 设置底部悬浮显示状态
  SET_NO_FOOTER(state, para) {
    state.webNoFooter = para
  },
  // 设置贴子是否被删除
  GET_EXIST_STATUS(state, para) {
    state.exist = para
  },
  // 设置贴子列表
  SET_FEED_LIST(state, para) {
    state.feed_list = para
  },
  // 设置群组信息
  SET_GROUP_INFO(state, para) {
    state.group_info = para
  },
  // 设置微信授权后用户信息
  SET_USER(state, para) {
    state.auth = para
  },
  // 设置token
  SET_TOKEN(state, para) {
    state.token = para
  },
  // 分享feed
  SET_VISIBLE_LOGIN(state, para) {
    state.visibleLogin = para
  },
  // 设置每条留言信息
  SET_MESSAGE_ITEM(state, para) {
    state.message_item = para
  },
  // 设置留言列表
  SET_MESSAGE_LIET(state, para) {
    state.messagelist = para
  },
  // 设置关注状态
  SET_FOCUS_STAT(state, para) {
    state.is_follow = para
  },
  // 设置h5cookies到浏览器
  SET_H5COOKIES(state, para) {
    state.h5Cookies = para
  },
  // 设置adid
  SET_ADID(state, para) {
    state.h5Adid = para
  },
  // 设置当前url地址
  SET_CURRENT_URL(state, para) {
    state.current_url = para
  },
  // 显示alert弹窗组件
  SHOW_ALERT(state, para) {
    state.alert_stat = para
  },
  // 显示confirm弹窗组件
  SHOW_CONFIRM(state, para) {
    state.confirm_stat = para
  },
  // 获取登录类型
  GET_LOGIN_TYPE(state, para) {
    state.get_login_type = para
  },
  // 设置来自某个按钮的状态
  SET_EXTENSION_TEXT(state, para) {
    state.extension_text = para
  },
  // enter page time 
  SET_ENTER_TIME(state, para) {
    state.enter_time = para
  },
  // get current time
  GET_CURRENT_TIME(state, para) {
    state.current_time = para
  },
  // get video duration
  GET_VIDEO_DURATION(state, para) {
    state.duration_time = para
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
      let h5Adid = Coms.getCookiebyName(decodeURIComponent(decodeURIComponent(req.headers.cookie)), 'h5Adid')
      commit('SET_USER', user)
      commit('SET_TOKEN', token)
      commit('SET_H5COOKIES', h5Cookies)
      commit('SET_ADID', h5Adid)
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
    commit,
    state
  }, {
    code,
    // $router,
    inv_id,
    type
  }) {
    let self = this,
      para, uo;
    if (Cookie.get("h5Cookies")) {
      uo = Cookie.get("h5Cookies")
    } else {
      uo = state.h5Cookies
    }
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
          protocol: "WEB_SOCKET",
          udid: uo,
          adid: Cookie.get('h5Adid') || 'closer-invitenew',
        }
      } else {
        return false
      }
    } else {
      para = {
        plateform: 2,
        code: code,
        protocol: "WEB_SOCKET",
        udid: uo,
        adid: Cookie.get('h5Adid') || 'closer-share'
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
    state,
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
        para, uo;
      if (Cookie.get("h5Cookies")) {
        uo = Cookie.get("h5Cookies")
      } else {
        uo = state.h5Cookies
      }
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
            udid: uo,
            adid: Cookie.get('h5Adid') || 'closer-invitenew',
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
          udid: uo,
          protocol: 'WEB_SOCKET',
          adid: Cookie.get('h5Adid') || 'closer-share'
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
  // 绑定手机 重新获取信息
  async refresh_user_info({
    commit
  }) {
    let self = this,
      data = await self.$axios.$get(`${api.admin.user_show}`)
    if (data.code === 0) {
      let userInfo = {
        gender: data.result.gender,
        phones: data.result.phones,
        updateTime: data.result.updateTime,
        avatar: data.result.avatar,
        createTime: data.result.createTime,
        teamID: data.result.teamID,
        // 姓名
        fullname: data.result.fullname,
        security_signal: data.result.security_signal,
        objectID: data.result.objectID,
        email: data.result.email,
        username: data.result.username,
        status: data.result.status
      };
      Cookie.set('user', userInfo, {
        expires: 7
      })
      commit('SET_USER', userInfo)
      return true
    }
  },
  // 获取手机验证码
  /** async get_code_by_phone_v2({
    commit
  }, {
    para
  }) {
    let self = this;
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    try {
      let data;
      if (para.type && para.type === 'bind') {
        data = await self.$axios.$post(`${api.admin.get_code_by_phone}`, para)
      } else {
        data = await self.$axios.$post(`${api.admin.get_code_by_phone_v2}`, para)
      }
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
  }, **/
  async get_code_by_phone_v2({
    commit
  }, {
    para
  }) {
    let self = this;
    // 点击必须登录的按钮，可获取cookie进行判断 信息
    try {
      let data;
      if (para.type && para.type === 'bind') {
        data = await self.$axios.$post(`${api.admin.get_code_by_phone}`, para)
      } else {
        data = await self.$axios.$post(`${api.admin.get_code_by_phone_v4}`, para)
      }
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
  // 绑定手机
  async bind_phone({
    commit
  }, {
    phone,
    code
  }) {
    let self = this,
      para = {
        phone,
        code
      }
    try {
      let data = await self.$axios.$post(`${api.admin.bind_phone}`, para)
      if (data.code === 0) {
        self.dispatch('refresh_user_info')
        return true
      } else {
        Toast({
          message: data.result,
          position: 'top'
        })
        return false
      }
    } catch (e) {}
  },
  // 关注，取消关注栏目
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
          return true
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
  // 微信二次分享
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
        return data.result.udid
      }
    } catch (e) {
      console.log('e==', e)
    }
  },
  // 点击下载按钮时调用get_adcookies做统计
  async down_adcookies({
    state,
    commit
  }) {
    let self = this,
      para = {
        webUdid: false,
        deviceType: state.nvgtype || 'ios',
        deviceVersion: state.nvgversion || '11_0_0',
        adid: state.h5Adid || 'closer-share'
      }
    let data = await self.$axios.$post(`${api.share.get_adcookie}`, para)
    return true
  },
  // 点击下载按钮时统计
  // 通用h5分享统计，目前主要针对 帖子 栏目 群组 活动
  async down_statistics({
    state,
    commit
  }, {
    p1
  }) {
    if (Cookie.get("user")) {
      var userId = JSON.parse(Cookie.get("user")).objectID || "";
    }
    let self = this,
      p2 = {
        userId: userId || "", // '用户ID，用户全网唯一标示，级别从高到底：userId>deviceId>cookie，userId，deviceId，cookie三个中必须要传一个'
        deviceId: "", //	'设备ID，移动设备的唯一标示，比如iOS系统的IDFA、IDFV，安卓系统的IMEI，mac地址等 ，userId，deviceId，cookie三个中必须要传一个'
        cookie: Cookie.get("h5Cookies") || "", //	'cookie，以H5接入时使用，userId，deviceId，cookie三个中必须要传一个'
        platform: "H5", //	'设备平台,参数取值:Android IOS H5'
        attachPlatform: state.nvgTypeToPowerCase || "", //	'H5的载体，当platform为H5时，如果设备为安卓设备，则传Android，IOS设备则传IOS，其他不传'
        communityId: state.res.communityid || "", //		'栏目id,统计对象有该属性则需要填写'
        title: state.res.title || "", //		'标题 如果是文章或视频该参数需要上传'
        action: "click", //		'行为类型(曝光 浏览结束点击返回 负反馈 点击下载)，参数取值:exposure back feedback download'
        dreason: "", //		'负反馈内容，当action为feedback时必填，格式为：["负反馈内容1", "负反馈内容2"]'
        time: Date.now(), //		'行为发生的时间戳，单位毫秒'
        cost: Date.now() - state.enter_time || 0, //		'浏览时长/曝光时长，单位毫秒'
        totalTime: state.duration_time || 0, //		'内容总时长，单位毫秒
      }
    let para = await Coms.mergeJsonObject(p1, p2);
    let data = await self.$axios.$post(`${api.share.common}`, para);
    if (data.code === 0) {
      return true
    }
  },
  // 评论以及回复评论
  async sure_message({
    commit
  }, {
    subjectid,
    content,
    lastid
  }) {
    let self = this;
    try {
      let para;
      // 子评论id存在 则是回复子评论
      if (lastid) {
        para = {
          subjectid: subjectid,
          content: content,
          lastid: lastid
        };
      } else {
        para = {
          subjectid: subjectid,
          content: content
        };
      }
      let data = await self.$axios.$post(`${api.admin.add_reply}`, para);
      if (data.code === 0) {
        commit("SHOW_CONFIRM", true);
      } else {
        Toast({
          message: data.result,
          position: "top"
        });
      }
    } catch (err) {
      Toast({
        message: err,
        position: "top"
      });
    }
  },
  // 加入群组
  async join_group({
    state,
    commit
  }, {
    classid,
    join_limit
  }) {
    let self = this,
      para,
      url, fullname;
    if (Cookie.get('user')) {
      fullname = JSON.parse(Cookie.get('user')).fullname
    } else {
      fullname = 'xxx'
    }
    if (join_limit == 0) {
      url = api.group.join
      para = {
        classid,
      }
    } else if (join_limit == 1) {
      url = api.admin.send_message
      para = {
        id: classid || state.group_info.group_info.id,
        type: 'group',
        name: state.group_info.group_info.name || '',
        communityId: state.group_info.group_info.communityid || ''
      }
    } else {
      return true
    }
    let data = await self.$axios.$post(`${url}`, para);
    return true
  }
}
