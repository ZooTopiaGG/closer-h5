<template>
  <div id="openbonus" class="flex flex-v">
    <div class="openbonus-head">
      <div class="head-circle"></div>
    </div>
    <div class="openbonus-body flex flex-v flex-align-center ">
      <div class="body-avatar">
        <img v-lazy="$com.makeFileUrl(hasInviter.avatar)">
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
  async asyncData({ app, store, error, query, redirect }) {
    if (query.code) {
      let res = await store.dispatch("get_code_by_login", {
        code: query.code,
        inv_id: query.id,
        type: "bonus"
      });
      if (!res) {
        redirect("/invite/alreadyget");
      }
    }
  },
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
    async downApp() {
      let self = this;
      await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: "closer-invitenew"
      });
      let res = await self.$store.dispatch("down_statistics", {
        dataId: "",
        page: "inviter",
        action: "download",
        extension: ""
      });
      if (res) {
        location.href = `${api.downHost}?downurl=closer://jump/to/mine`;
      }
      // location.href = api.downUrl;
    }
  },
  beforeMount() {
    let self = this;
    if (Cookie.get("inviter")) {
      self.hasInviter = JSON.parse(Cookie.get("inviter"));
    }
  }
};
</script>
<style lang='less'>
#openbonus {
  min-height: 100vh;
  .openbonus-head {
    position: relative;
    .head-circle {
      position: absolute;
      width: 100%;
      height: 48.27vw;
      background: url("~/assets/images/nav@2x.png") no-repeat;
      background-size: cover;
      z-index: 6;
      top: -50px;
    }
  }
  .openbonus-body {
    padding-top: calc(36vw - 50px);
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
  .hasToken {
    padding: 0 6.67vw;
    button {
      width: 100%;
    }
  }
}
</style>

