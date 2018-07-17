
<template>
  <section class="open-article flex flex-align-center">
    <mt-button type="primary" size="small" class="open-app" @click="downApp" v-if="!($route.path.indexOf('group') > -1)">
      <span v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1"><span>立即投稿，赚取稿费</span><i class="down-arrow"></i></span>      
      <span v-else><span>打开贴近app，查看更多精彩文章</span><i class="down-arrow"></i></span>
    </mt-button>
    <mt-button type="primary" size="small" class="open-app" @click="firstLogin" v-else>
      <span>进入群组</span>
    </mt-button>
  </section> 
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {};
  },
  methods: {
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.downApp();
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 纯下载
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: self.$store.state.h5Adid || "closer-share" // 栏目id
      });
      if (result) {
        if (self.$route.path.indexOf("/community") > -1) {
          location.href = `${api.downHost}?downurl=closer://community/${
            self.$route.params.id
          }`;
        } else if (self.$route.path.indexOf("/feed") > -1) {
          location.href = `${api.downHost}?downurl=closer://feed/${
            self.$route.params.id
          }`;
        } else if (self.$route.path.indexOf("/group") > -1) {
          location.href = `${api.downHost}?downurl=closer://group/${
            self.$route.params.id
          }`;
        } else {
          location.href = `${api.downHost}`;
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #4b4945;
.open-article {
  height: 14.4vw;
  padding: 0 4vw;
}
.open-app {
  width: 100%;
  border-radius: 5px;
  height: 10.67vw;
}
.down-arrow {
  width: 2.4vw;
  height: 2.4vw;
  background: url("~/assets/images/1@2x.png") no-repeat;
  background-size: cover;
  display: inline-block;
  margin-left: 1.335vw;
}
</style>