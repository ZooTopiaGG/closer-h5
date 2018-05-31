<template>
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
</template>
<script>
export default {
  name: "signin",
  data() {
    return {
      captcha: "",
      phone: "",
      code: "",
      data: [
        {
          value: 1,
          name: "哈哈哈哈哈",
          key: "12"
        },
        {
          value: 2,
          name: "呃呃呃呃呃呃呃",
          key: "11"
        },
        {
          value: 4,
          name: "呃呃呃呃呃d呃呃",
          key: "11"
        },
        {
          value: 5,
          name: "a",
          key: "11"
        },
        {
          value: 6,
          name: "c",
          key: "11"
        },
        {
          value: 8,
          name: "q",
          key: "11"
        },
        {
          value: 9,
          name: "r",
          key: "11"
        }
      ]
    };
  }
};
</script>
<style scoped>
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
