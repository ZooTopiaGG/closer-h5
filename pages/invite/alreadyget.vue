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
  height: 100vh;
  .openbonus-head {
    position: relative;
    .head-circle {
      position: absolute;
      width: 100%;
      height: 27.1vh;
      background: url("~/assets/images/nav@2x.png") no-repeat;
      background-size: cover;
      z-index: 6;
    }
  }
  .openbonus-body {
    padding-top: 20.24vh;
    position: relative;
    z-index: 7;
    .body-avatar img {
      width: 10.64vh;
      height: 10.64vh;
      max-width: 142px;
      max-height: 142px;
      border-radius: 100%;
      border: 2px solid #fabb7d;
      margin-bottom: 2.7vh;
    }
    .inviterName {
      margin-bottom: 2.25vh;
    }
    .body-desc {
      font-size: 18px;
      line-height: 25px;
      span {
        font-weight: bold;
        margin-bottom: 15px;
      }
    }
    .body-money {
      height: 10.5vh;
      line-height: 10.5vh;
      font-size: 18px;
      margin-bottom: 2.25vh;
      img {
        width: 53.42vh;
        height: 34.5vh;
        margin-top: 4.5vh;
      }
    }
  }
  .hasToken {
    padding: 0 3.75vh;
    margin-bottom: 7.5vh;
    button {
      width: 100%;
    }
  }
}
</style>

