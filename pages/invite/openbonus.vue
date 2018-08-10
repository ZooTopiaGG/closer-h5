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
    <div class="openbonus-sign">
      <dp-login isAbsolute="inviter"></dp-login>
    </div>
    <!-- <div class="hasToken">
      <mt-button type="primary" class="margin-top-20 tj-btn" @click="downApp">
        <span>立即下载，提现秒到账</span>
      </mt-button>
    </div>  -->
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  async asyncData({ app, store, error, query, redirect, req }) {
    // if (req.headers["user-agent"].indexOf("MicroMessenger") <= -1) {
    //   redirect("/redirect/needwx");
    // }
    // if (query.code) {
    //   let res = await store.dispatch("get_code_by_login", {
    //     code: query.code,
    //     inv_id: query.id,
    //     type: "bonus"
    //   });
    //   if (!res) {
    //     redirect("/invite/alreadyget");
    //   }
    // }
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
      await self.$store.dispatch("down_adcookies");
      let _page = "inviter",
        progress;
      let p1 = {
        objectType: _page || "inviter", //		'统计对象类型（文章 视频 栏目 群组 H5分享的群组，栏目，帖子）,参数取值:article video community group'
        objectId: "", //		'统计对象唯一标识'
        position: "", //		'点击位置，若action为download时必填,参数取值：top bottom'
        progress: progress || 0, //		'浏览进度，文章为阅读的进度，图集为当前阅读的图片/总的图片数，视频为当前播放时间/总时间 小数点两位：0.95'
        recommendId: "" //		'本次推荐的唯一标识 推荐内容ID'
      };
      let res = await self.$store.dispatch("down_statistics", {
        p1
      });
      if (res) {
        location.href = `${location.protocol}//${
          location.hostname
        }?downurl=closer://jump/to/mine`;
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

