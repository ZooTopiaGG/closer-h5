<template>
  <section :class="{
    dpLogin: true,
    inHtmlLogin: isAbsolute === 'inviter'
  }">
    
    <section class="title" v-if="isAbsolute === 'toMessage' || isAbsolute === 'toMessageBind'">
      <span>客官，根据国家法律，发表文字评论必须填写手机号，所以拜托啦～</span>
    </section>
    <section class="title" v-else-if="isAbsolute != 'inviter'">
      <span>{{ title }}</span>
    </section>
    <mt-field placeholder="手机号" type="tel" :attr="{ maxlength: 11 }" v-model="phone" class="margin-bottom-40"></mt-field>
    <section class="tj-code">
      <mt-field placeholder="验证码" type="tel" :attr="{ maxlength: 6 }" v-model="code" class="margin-bottom-40">
        <mt-button type="default" class="tj-code-btn cursor" id="tj-code-btn" :disabled="isdisabled">{{ sendName }}</mt-button>
      </mt-field>
    </section>
    <mt-button type="primary" :disabled="loading === 1" :class="{
      'cursor': true,
      'margin-top-20': true, 
      'tj-btn': true,
      notweixin: isAbsolute == 'inviter'
    }" @click="gotonext">
      <section class="flex flex-align-center flex-pack-center">
        <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
        <span v-if="isAbsolute === 'inviter'">立即下载，提现秒到账</span>
        <span v-else-if="isAbsolute === 'toMessageBind'">绑定手机</span>
        <span v-else>登 录</span>
      </section>
    </mt-button>
    <section id="captcha"></section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "dpLogin",
  data() {
    return {
      phone: "",
      code: "",
      sendName: "发送验证码",
      img_code_value: "",
      get_img_code: `${api.filePath}/captcha/image`,
      isdisabled: false,
      loading: 2,
      captchaIns: "",
      captchaValidate: "",
      timer: ""
    };
  },
  props: {
    isAbsolute: {
      type: String,
      default: "login"
    },
    title: {
      type: String,
      default: "登录后继续操作"
    }
  },
  methods: {
    async sendImgCode() {
      // sendImgCode
      let self = this;
      self.get_img_code = `${
        api.filePath
      }/captcha/image?tempstamp=${Date.now()}`;
    },
    async sendCode() {
      let self = this,
        time = 60;
      self.isdisabled = true;
      if (!$async.isPhoneNum(self.phone)) {
        self.isdisabled = false;
        self.$toast({
          message: "手机号格式错误",
          position: "top"
        });
        return false;
      }
      // 网易E盾
      if (self.isAbsolute != "toMessageBind") {
        if (!(self.captchaValidate && self.captchaValidate.validate)) {
          self.isdisabled = false;
          self.$toast({
            message: "安全验证失败",
            position: "top"
          });
          return false;
        }
      }
      let timer = setInterval(() => {
        time--;
        if (time <= 1) {
          self.sendName = "重新发送";
          self.isdisabled = false;
          clearInterval(timer);
        } else {
          self.sendName = `正在发送 ${time} s`;
        }
      }, 1000);
      let para;
      if (self.isAbsolute === "toMessageBind") {
        para = {
          phone: self.phone,
          type: "bind"
        };
      } else if (self.isAbsolute === "inviter") {
        // 判断是在微信，还是在外部浏览器
        if ($async.isWeiXin()) {
          para = {
            phone: self.phone,
            captchaValidate: self.captchaValidate.validate,
            type: "bind"
          };
        } else {
          para = {
            phone: self.phone,
            captchaValidate: self.captchaValidate.validate
          };
        }
      } else {
        // 登录发送验证码
        para = {
          phone: self.phone,
          captchaValidate: self.captchaValidate.validate
          // code: self.$route.query.code 暂时不用
        };
      }
      let result = await self.$store.dispatch("get_code_by_phone_v2", {
        para: para
      });
      if (!result) {
        self.isdisabled = false;
        self.sendName = "重新发送";
        clearInterval(timer);
      }
    },
    async gotonext() {
      let self = this;
      if (self.isAbsolute === "toMessageBind") {
        self.toBind();
      } else if (self.isAbsolute === "inviter") {
        // 判断是在微信，还是在外部浏览器
        if ($async.isWeiXin()) {
          self.toBind();
        } else {
          self.toLogin();
        }
      } else {
        // 登录发送验证码
        self.toLogin();
      }
    },
    // 登录
    async toLogin() {
      let self = this;
      try {
        self.loading = 1;
        if (!$async.isPhoneNum(self.phone)) {
          self.loading = 2;
          self.$toast({
            message: "手机号格式错误",
            position: "top"
          });
          return false;
        }
        if (!self.code) {
          self.loading = 2;
          self.$toast({
            message: "验证码错误",
            position: "top"
          });
          return false;
        }
        if (isNaN(self.code) || self.code.length != 6) {
          self.loading = 2;
          self.$toast({
            message: "验证码错误",
            position: "top"
          });
          return false;
        }
        // 判断是否是在奖励金页面
        let uo = Cookie.get("h5Cookies")
          ? Cookie.get("h5Cookies")
          : self.$store.state.h5Cookies;
        let type = self.$route.path.indexOf("/invite") > -1 ? "bonus" : "else";
        let status = await self.$store.dispatch("get_token_by_login", {
          phone: self.phone,
          token: self.code,
          udid: uo,
          type: type
        });
        if (status) {
          self.loading = 2;
          self.$store.commit("SET_VISIBLE_LOGIN", false);
          if (self.isAbsolute === "inviter") {
            // 需要传入打开相应app页面的参数
            location.href = `${location.protocol}//${
              location.host
            }?downurl=closer://jump/to/mine`;
          } else if (self.isAbsolute === "toFocus") {
            // self.$store.commit("SHOW_ALERT", true);
            self.sureFocus();
          } else if (self.isAbsolute === "toDown") {
            self.downApp();
          } else if (self.isAbsolute === "toMessage") {
            self.sureMessage();
          }
        } else {
          self.loading = 2;
        }
      } catch (err) {
        self.loading = 2;
      }
    },
    // 绑定手机号
    async toBind() {
      let self = this;
      try {
        self.loading = 1;
        if (!$async.isPhoneNum(self.phone)) {
          self.loading = 2;
          self.$toast({
            message: "手机号格式错误",
            position: "top"
          });
          return false;
        }
        if (!self.code) {
          self.loading = 2;
          self.$toast({
            message: "验证码错误",
            position: "top"
          });
          return false;
        }
        if (isNaN(self.code) || self.code.length != 6) {
          self.loading = 2;
          self.$toast({
            message: "验证码错误",
            position: "top"
          });
          return false;
        }
        let para = {
          phone: self.phone,
          code: self.code
        };
        let status = await self.$store.dispatch("bind_phone", para);
        if (status) {
          self.loading = 2;
          self.$store.commit("SET_VISIBLE_LOGIN", false);
          if (self.isAbsolute === "inviter") {
            // 需要传入打开相应app页面的参数
            location.href = `${location.protocol}//${
              location.host
            }?downurl=closer://jump/to/mine`;
          } else if (self.isAbsolute === "toMessageBind") {
            self.sureMessage();
          }
          // 通过token获取用户信息 来更新user
        } else {
          self.loading = 2;
        }
      } catch (err) {
        self.loading = 2;
      }
    },
    // 确认回复
    async sureMessage() {
      let self = this,
        para;
      if (self.$route.params.id) {
        para = {
          subjectid: self.$route.params.messageid,
          content: window.sessionStorage.getItem("textarea"),
          lastid: self.$route.params.id
        };
      } else {
        para = {
          subjectid: self.$route.params.messageid,
          content: window.sessionStorage.getItem("textarea")
        };
      }
      await self.$store.dispatch("sure_message", para);
    },
    // 确认关注
    async sureFocus() {
      let self = this;
      let result = await self.$store.dispatch("get_focus_stat", {
        communityid: self.$store.state.res.communityid,
        flag: self.$store.state.is_follow ? 0 : 1
      });
      if (result) {
        self.$store.commit("SHOW_ALERT", true);
      }
    },
    async downApp(str) {
      let self = this,
        redirectUrl;
      if (
        self.$store.state.extension_text === "more_group_member" ||
        self.$store.state.extension_text === "enter_group"
      ) {
        await self.$store.dispatch("join_group", {
          classid: self.$route.params.id,
          join_limit: self.$store.state.group_info.group_info.join_limit
        });
        redirectUrl = `${location.protocol}//${
          location.host
        }?from=group&groupid=${self.$route.params.id}&tk=1`;
      }
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: self.$store.state.extension_text,
        redirectUrl
      });
    }
  },
  mounted() {
    let _this = this;
    document.getElementById("tj-code-btn").addEventListener(
      "click",
      function() {
        initNECaptcha(
          {
            element: "#captcha",
            captchaId: "9bff9612504c4b0f9bd9d63b142dd43e",
            mode: "popup", // 仅智能无感知验证码时，mode 才能设置为 bind
            width: "320px",
            onVerify: function(err, data) {
              // 用户验证码验证成功后，进行实际的提交行为
              if (data) {
                _this.captchaValidate = data;
                _this.sendCode();
              }
            }
          },
          function(instance) {
            // 初始化成功后得到验证实例instance，可以调用实例的方法
            // 重复执行， 如果初始化成功则无需执行
            _this.captchaIns = instance;
            if ($async.isPhoneNum(_this.phone)) {
              _this.captchaIns && _this.captchaIns.popUp(); // 手动调用verify方法
            } else {
              _this.$toast({
                message: "手机号格式错误",
                position: "top"
              });
              return false;
            }
          },
          function(err) {
            // 初始化失败后触发该函数，err对象描述当前错误信息
          }
        );
      },
      false
    );
  }
};
</script>
