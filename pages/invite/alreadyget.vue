<template>
  <div id="openbonus" class="flex flex-v">
    <div class="openbonus-head">
      <div class="head-circle"></div>
    </div>
    <div class="openbonus-body flex-1 flex flex-v flex-align-center">
      <div class="body-avatar">
        <img v-lazy="$com.makeFileUrl(hasInviter.avatar)">
      </div>
      <div class="body-desc flex flex-v flex-align-center">
        <p> 邀请好友赚现金</p>
        <p>各自获得10元钱</p>
      </div>
      <div class="body-money">
        <img src="~/assets/images/2201527733118_.pic.jpg" alt="">
      </div>
    </div>
    <div class="hasToken">
      <mt-button type="primary" @click="downApp" class="margin-top-20 tj-btn">
        <span>给其他好友发红包</span>
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
  methods: {
    downApp() {
      location.href = api.downUrl;
      // location.href = `${location.protocol}//${location.host}/down.html`;
    }
  },
  data() {
    return {
      // isWeiXin: false
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
  min-height: 177.87vw;
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
      margin-bottom: 4.8vw;
    }
    .body-desc {
      font-size: 18px;
      line-height: 25px;
      span {
        font-weight: bold;
      }
    }
    .body-money {
      height: 18.676vw;
      line-height: 18, 676vw;
      font-size: 18px;
      margin-bottom: 4vw;
      img {
        width: 95.02vw;
        height: 61.36vw;
        margin-top: 8vw;
      }
    }
  }
  .hasToken {
    padding: 0 6.67vw;
    margin-bottom: 13.34vw;
    button {
      width: 100%;
    }
  }
}
</style>

