<template>
  <div id="openbonus" class="flex flex-v">
    <div class="openbonus-head">
      <div class="head-circle"></div>
    </div>
    <div class="openbonus-body flex-1 flex flex-v flex-align-center">
      <div class="body-avatar">
        <img v-lazy="hasInviter.avatar">
      </div>
      <div class="body-desc"><span>{{ hasInviter.name }}</span>给你的现金红包已经到账</div>
      <div class="body-money"><span>10</span>元</div>
    </div>
    <!-- 判断他是否在微信，如果在 则不显示 ，显示按钮 立即下载，提现无门槛，
    不在微信的话 则通过手机号登录，则判断 是否已经登录过，
    如果已经登录过 则显示 立即下载，提现无门槛
    如果已经领取了 则显示给其他好友发红包 -->
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
      // isWeiXin: false,
      hasInviter: {}
    };
  },
  methods: {
    downApp() {
      this.$router.push({ path: "/down" });
    }
  },
  beforeMount() {
    console.log(Cookie.get("inviter"));
    let self = this;
    // // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        $router: self.$router
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
  },
  mounted() {}
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
      height: 3.62rem;
      background: url("~/assets/images/nav@2x.png") no-repeat;
      background-size: cover;
      z-index: 6;
    }
  }
  .openbonus-body {
    padding-top: 2.7rem;
    position: relative;
    z-index: 7;
    .body-avatar img {
      width: 1.42rem;
      height: 1.42rem;
      border-radius: 100%;
      border: 2px solid #fabb7d;
      margin-bottom: 0.36rem;
    }
    .body-desc {
      font-size: 18px;
      line-height: 25px;
      span {
        font-weight: bold;
      }
    }
    .body-money {
      height: 1.4rem;
      line-height: 1.4rem;
      font-size: 18px;
      margin-bottom: 0.3rem;
      span {
        font-weight: bold;
        font-size: 50px;
        margin-right: 3px;
      }
    }
  }
  .hasToken {
    padding: 0 0.5rem;
    margin-bottom: 1.6rem;
    button {
      width: 100%;
    }
  }
}
</style>

