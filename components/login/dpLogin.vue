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
      <mt-field placeholder="验证码" type="tel" :attr="{ maxlength: 6 }" v-model="code" class="margin-bottom-40">
        <mt-button type="default" class="tj-code-btn" :disabled="isdisabled" @click="sendCode">{{ sendName }}</mt-button>
      </mt-field>
    </div>
    <mt-button type="primary" class="margin-top-20 tj-btn" @click="toLogin">
      <span v-if="isAbsolute">登 录</span>
      <span v-else>立即下载，提现秒到账</span>
    </mt-button>
  </div>
</template>
<script>
export default {
  name: "dpLogin",
  // components: {
  //     dpButton,
  //     dpRadio
  // },
  data() {
    return {
      phone: "",
      code: "",
      sendName: "发送验证码",
      isdisabled: false
    };
  },
  props: {
    isAbsolute: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    async sendCode() {
      let self = this,
        time = 60;
      self.isdisabled = true;
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
      if (!$async.isPhoneNum(self.phone)) {
        clearInterval(timer);
        self.isdisabled = false;
        self.$toast({
          message: "手机号格式错误",
          position: "top"
        });
        return false;
      }
      await self.$store.dispatch("get_code_by_phone", {
        phone: self.phone
      });
    },
    async toLogin() {
      let self = this;
      if (!$async.isPhoneNum(self.phone)) {
        self.$toast({
          message: "手机号格式错误",
          position: "top"
        });
        return false;
      }
      if (!self.code) {
        self.$toast({
          message: "手机号或验证码错误",
          position: "top"
        });
        return false;
      }
      await self.$store.dispatch("get_token_by_login", {
        phone: self.phone,
        token: self.code
      });
      self.$store.commit("SET_VISIBLE_LOGIN", false);
    }
  }
};
</script>
<style>
.dpLogin {
  width: 6.54rem;
  height: 5.44rem;
  background: #fff;
  padding: 0.4rem;
  box-sizing: border-box;
  margin: 15vh auto 0;
  border-radius: 3px;
}
.inHtmlLogin {
  margin: 0 auto;
  padding: 0;
  height: auto;
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
  height: 0.52rem;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.15rem;
}
</style>
