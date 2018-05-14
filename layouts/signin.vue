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
    <!-- <div>
            <dp-button type="primary">button</dp-button>
            <div v-for="(item, index) in data" :key="index">
                <dp-radio 
                :on-change="handleSelect"
                :radioValue="item.value" 
                :bname="item.name"></dp-radio>
            </div>
        </div> -->
  </div>
</template>
<script>
// import dpButton from '~/components/button/dpButton'
// import dpRadio from '~/components/radio/dpRadio'
export default {
  name: "signin",
  // components: {
  //     dpButton,
  //     dpRadio
  // },
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
  },
  methods: {
    handleSelect(e) {
      console.log(e.target.value);
    }
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
