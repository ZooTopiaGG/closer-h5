<template>
  <div id="signin" :class="{ 
        flex:true,
        commonbox: true,
        'flex-v':true }">
    <div class="logo text-align">
      <img src="~/assets/images/login_logo@2x.png" alt="logo">
    </div>
    <div class="form">
      <mt-field placeholder="手机号" type="tel" v-model="phone" class="margin-bottom-80"></mt-field>
      <div class="tj-code">
        <mt-field placeholder="验证码" type="tel" v-model="code" class="margin-bottom-80">
          <mt-button type="default" class="tj-code-btn">发送验证码</mt-button>
        </mt-field>
      </div>
      <mt-button type="primary" class="margin-bottom-80 tj-btn">登 录</mt-button>
      <p class="text-align">登录/注册即同意
        <a href="javascript:;">贴近用户服务协议</a>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "signin",
  data() {
    return {
      captcha: "",
      phone: "",
      code: ""
    };
  }
};
</script>
<style scoped>
.logo {
  margin-top: 15vh;
  margin-bottom: 10vh;
}

.logo img {
  width: 2rem;
  height: 2rem;
}

.form {
  padding: 0 0.8rem;
  box-sizing: border-box;
}

.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 0.52rem;
  margin: 0 2px 0 5px;
  font-size: 14px;
}
</style>
