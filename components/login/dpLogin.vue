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
    <section class="tj-code" v-if="isAbsolute != 'toMessageBind'">
      <mt-field type="text" placeholder="图形验证码" :attr="{ maxlength: 5 }" v-model="img_code_value" class="margin-bottom-40">
        <img class="tj-code-img" @click="sendImgCode" :src="get_img_code">
      </mt-field>
    </section>
    <section class="tj-code">
      <mt-field placeholder="验证码" type="tel" :attr="{ maxlength: 6 }" v-model="code" class="margin-bottom-40">
        <mt-button type="default" class="tj-code-btn cursor" :disabled="isdisabled" @click="sendCode">{{ sendName }}</mt-button>
      </mt-field>
    </section>
    <mt-button type="primary" v-if="isAbsolute != 'toMessageBind'" :disabled="loading === 1" :class="{
      'cursor': true,
      'margin-top-20': true, 
      'tj-btn': true
    }" @click="toLogin">
      <section class="flex flex-align-center flex-pack-center">
        <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
        <span v-if="isAbsolute === 'inviter'">立即下载，提现秒到账</span>
        <span v-else>登 录</span>
      </section>
    </mt-button>
    <mt-button type="primary" v-else :disabled="loading === 1" :class="{
      'cursor': true,
      'margin-top-20': true, 
      'tj-btn': true
    }" @click="toBind">
      <section class="flex flex-align-center flex-pack-center">
        <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
        <span>绑定手机</span>
      </section>
    </mt-button>
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
      loading: 2
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
      if (self.isAbsolute != "toMessageBind") {
        if (!self.img_code_value) {
          self.isdisabled = false;
          self.$toast({
            message: "图形验证码不能为空",
            position: "top"
          });
          return false;
        } else {
          if (self.img_code_value.length < 5) {
            self.isdisabled = false;
            self.$toast({
              message: "图形验证码格式错误",
              position: "top"
            });
            return false;
          }
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
      if (self.isAbsolute != "toMessageBind") {
        para = {
          phone: self.phone,
          grouk_captcha_value: self.img_code_value
        };
      } else {
        para = {
          phone: self.phone,
          type: "bind"
        };
      }
      console.log('para====', para)
      let result = await self.$store.dispatch("get_code_by_phone_v2", para);
      console.log('result===', result)
      if (!result) {
        self.isdisabled = false;
        self.sendName = "重新发送";
        if (self.isAbsolute != "toMessageBind") {
          self.get_img_code = `${
            api.filePath
          }/captcha/image?tempstamp=${Date.now()}`;
        }
        clearInterval(timer);
      }
    },
    // 登录
    async toLogin() {
      let self = this;
      // console.log(self.isAbsolute);
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
        let type = self.$route.path.indexOf("/invite") > -1 ? 'bonus': 'else';
        let status = await self.$store.dispatch("get_token_by_login", {
          phone: self.phone,
          token: self.code,
          udid: Cookie.get("h5Cookies"),
          type: type
        });
        if (status) {
          self.loading = 2;
          self.$store.commit("SET_VISIBLE_LOGIN", false);
          if (self.isAbsolute === "inviter") {
            // 需要传入打开相应app页面的参数
            // location.href = api.downUrl;
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
          if (self.isAbsolute === "toMessageBind") {
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
        redirectUrl = `${location.protocol}//${
          location.host
        }?from=group&groupid=${self.$route.params.id}`;
      }
      self.$com.down_statistics(
        self.$store,
        self.$route,
        str,
        self.$store.state.extension_text,
        redirectUrl
      );
    }
  }
};
</script>
<style>
.dpLogin {
  width: 87.2vw;
  /* height: 72.6vw; */
  background: #fff;
  padding: 5.34vw;
  box-sizing: border-box;
  margin: 26.7vw auto 0;
  border-radius: 3px;
}
.inHtmlLogin {
  margin: 0 auto;
  padding: 0;
  height: auto;
}
.tj-code-img {
  width: 94px;
  height: 26px;
  border-radius: 3px;
}
.inHtmlLogin .mint-cell-wrapper {
  background-image: -webkit-linear-gradient(
    bottom,
    rgba(243, 243, 243, 1),
    rgba(243, 243, 243, 1) 50%,
    transparent 0
  );
  background-image: linear-gradient(
    0deg,
    rgba(243, 243, 243, 1),
    rgba(243, 243, 243, 1) 50%,
    transparent 0
  );
}
.inHtmlLogin .mint-cell:last-child {
  background-image: -webkit-linear-gradient(
    bottom,
    rgba(243, 243, 243, 1),
    rgba(243, 243, 243, 1) 50%,
    transparent 0
  );
  background-image: linear-gradient(
    0deg,
    rgba(243, 243, 243, 1),
    rgba(243, 243, 243, 1) 50%,
    transparent 0
  );
}
.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 6.94vw;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2vw;
  line-height: 1.7;
}
/* .notweixin {
  margin-top: 20px;
} */
</style>
