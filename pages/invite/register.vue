<template>
  <div id="openbonus" class="flex flex-v">
    <div class="openbonus-head">
      <div class="head-circle"></div>
    </div>
    <div class="openbonus-body flex flex-v flex-align-center">
      <div class="body-avatar">
        <img v-lazy="$com.makeFileUrl(hasInviter.avatar)">
      </div>
      <div class="body-desc flex flex-v flex-align-center"><span>{{ hasInviter.name }}</span>给你发了</div>
      <div class="body-money"><span>10</span>元</div>
    </div>
    <!-- 判断他是否在微信，如果在 则不显示 ，显示按钮 立即下载，提现无门槛，
    不在微信的话 则通过手机号登录，则判断 是否已经登录过，
    如果已经登录过 则显示 立即下载，提现无门槛
    如果已经领取了 则显示给其他好友发红包 -->
    <div class="openbonus-sign">
      <dp-login :isAbsolute="false"></dp-login>
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
  beforeMount() {
    if (Cookie.get("inviter")) {
      this.hasInviter = JSON.parse(Cookie.get("inviter"));
    }
  }
};
</script>
<style lang='less'>
#openbonus {
  height: 177.87vw;
  .openbonus-head {
    position: relative;
    .head-circle {
      position: absolute;
      width: 100%;
      height: 48.27vw;
      background: url("~/assets/images/nav@2x.png") no-repeat;
      background-size: cover;
      z-index: 6;
    }
  }
  .openbonus-body {
    padding-top: 36vw;
    position: relative;
    z-index: 7;
    margin-bottom: 8vw;
    .body-avatar img {
      width: 18.93vw;
      height: 18.93vw;
      max-width: 142px;
      max-height: 142px;
      border-radius: 100%;
      border: 2px solid #fabb7d;
      margin-bottom: 5.16vw;
    }
    .body-desc {
      font-size: 18px;
      line-height: 25px;
      span {
        font-weight: bold;
      }
    }
    .body-money {
      height: 18.66vw;
      line-height: 18.66vw;
      font-size: 18px;
      margin-bottom: 4vw;
      span {
        font-weight: bold;
        font-size: 50px;
        margin-right: 3px;
      }
    }
  }
}
</style>

