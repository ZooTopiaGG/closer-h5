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
        <span>{{ hasInviter.name }}</span>
        <p>你已经领取过了</p>
      </div>
      <!-- <div class="body-money"><span>10</span>元</div> -->
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
      this.$router.push({ path: "/down" });
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
        margin-bottom: 15px;
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

