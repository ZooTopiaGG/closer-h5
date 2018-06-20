<template>
  <div :class="{
    dpLogin: true,
    inHtmlLogin: !isAbsolute
  }">
    <div class="title" v-if="isAbsolute">
      <span>登录后继续操作</span>
    </div>
    <mt-field placeholder="手机号" type="tel" :attr="{ maxlength: 11 }" v-model="phone" class="margin-bottom-40"></mt-field>
    <div class="tj-code">
      <mt-field placeholder="图形验证码" :attr="{ maxlength: 5 }" v-model="img_code_value" class="margin-bottom-40">
        <img class="tj-code-img" @click="sendImgCode" :src="get_img_code">
      </mt-field>
    </div>
    <div class="tj-code">
      <mt-field placeholder="验证码" type="tel" :attr="{ maxlength: 6 }" v-model="code" class="margin-bottom-40">
        <mt-button type="default" class="tj-code-btn cursor" :disabled="isdisabled" @click="sendCode">{{ sendName }}</mt-button>
      </mt-field>
    </div>
    <mt-button type="primary" :disabled="loading === 1" :class="{
      'cursor': true,
      'margin-top-20': true, 
      'tj-btn': true,
      notweixin: !isAbsolute
    }" @click="toLogin">
      <div class="flex flex-align-center flex-pack-center">
        <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
        <span v-if="isAbsolute">登 录</span>
        <span v-else>立即下载，提现秒到账</span>
      </div>
    </mt-button>
  </div>
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
      type: Boolean,
      default: true
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

      let result = await self.$store.dispatch("get_code_by_phone", {
        phone: self.phone,
        grouk_captcha_value: self.img_code_value
      });
      if (!result) {
        self.isdisabled = false;
        self.sendName = "重新发送";
        self.get_img_code = `${
          api.filePath
        }/captcha/image?tempstamp=${Date.now()}`;
        clearInterval(timer);
      }
    },
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
        let type;
        if (self.$route.path.indexOf("/invite") === -1) {
          type = "else";
        } else {
          type = "bonus";
        }
        let status = await self.$store.dispatch("get_token_by_login", {
          phone: self.phone,
          token: self.code,
          udid: Cookie.get("h5Cookies"),
          type: type
        });
        if (status) {
          self.loading = 2;
          if (!self.isAbsolute) {
            // 需要传入打开相应app页面的参数
            // location.href = api.downUrl;
            location.href = `${api.downHost}?downurl=closer://jump/to/mine`;
          } else {
            self.$store.commit("SET_VISIBLE_LOGIN", false);
          }
        } else {
          self.loading = 2;
        }
      } catch (err) {
        self.loading = 2;
      }
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
  height: 8vw;
  line-height: 8vw;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2vw;
}
.notweixin {
  margin-top: 20px;
}
</style>
