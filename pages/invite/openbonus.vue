<template>
  <div id="openbonus" class="flex flex-v">
    <div class="openbonus-head">
      <div class="head-circle"></div>
    </div>
    <div class="openbonus-body flex flex-v flex-align-center ">
      <div class="body-avatar">
        <img v-lazy="hasInviter.avatar">
      </div>
      <div class="body-desc flex flex-v flex-align-center"><span class="inviterName">{{ hasInviter.name }}</span>给你的现金红包已经到账</div>
      <div class="body-money"><span>10</span>元</div>
    </div>
    <div class="hasToken">
      <mt-button type="primary" class="margin-top-20 tj-btn" @click="downApp">
        <span>立即下载，提现秒到账</span>
      </mt-button>
    </div> 
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  head() {
    return {
      title: "关注身边事，开心拿红包"
    };
  },
  data() {
    return {
      hasInviter: {}
    };
  },
  methods: {
    downApp() {
      location.href = api.downUrl;
      // location.href = `${location.protocol}//${location.host}/down.html`;
    }
  },
  beforeMount() {
    // console.log(Cookie.get("inviter"));
    let self = this;
    // // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        $router: self.$router,
        type: "bonus"
      });
    } else if (Cookie.get("token")) {
      // 进行其他 ajax 操作
      console.log(Cookie.get("user"));
    } else {
      // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
      if ($async.isWeiXin()) {
        // 通过微信授权 获取code
        self.$toast({
          message: "没有token",
          position: "top"
        });
        self.$store.dispatch("get_wx_auth", {
          url: `${location.protocol}//${location.hostname}/invite/openbonus`
        });
        return;
      } else {
        // bilibili不是微信浏览器
        self.$store.commit("SET_VISIBLE_LOGIN", true);
      }
    }
  }
};
</script>
<style lang='less'>
#openbonus {
  height: 100vh;
  .openbonus-head {
    position: relative;
    .head-circle {
      position: absolute;
      width: 100%;
      height: 27.14vh;
      background: url("~/assets/images/nav@2x.png") no-repeat;
      background-size: cover;
      z-index: 6;
    }
  }
  .openbonus-body {
    padding-top: 20.24vh;
    position: relative;
    z-index: 7;
    margin-bottom: 4.5vh;
    .body-avatar img {
      width: 10.64vh;
      height: 10.64vh;
      max-width: 142px;
      max-height: 142px;
      border-radius: 100%;
      border: 2px solid #fabb7d;
      margin-bottom: 2.7vh;
    }
    .body-desc {
      font-size: 18px;
      line-height: 25px;
      span {
        font-weight: bold;
      }
    }
    .body-money {
      height: 10.49vh;
      line-height: 10.49vh;
      font-size: 18px;
      margin-bottom: 2.25vh;
      span {
        font-weight: bold;
        font-size: 50px;
        margin-right: 3px;
      }
    }
  }
  .hasToken {
    padding: 0 6.67vw;
    button {
      width: 100%;
    }
  }
}
</style>

