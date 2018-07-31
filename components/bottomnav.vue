
<template>
  <section class="open-article flex flex-align-center">
    <mt-button type="primary" size="small" class="open-app" @click="downApp($event,'direct_bottom')" v-if="!($route.path.indexOf('group') > -1)">
      <span v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1"><span>立即投稿，赚取稿费</span><i class="down-arrow"></i></span>      
      <span v-else><span>打开贴近app，查看更多精彩文章</span><i class="down-arrow"></i></span>
    </mt-button>
    <mt-button type="primary" size="small" class="open-app" @click="firstLogin($event)" v-else>
      <section class="flex flex-align-center flex-pack-center">
        <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
        <span>进入群组</span>
      </section>
    </mt-button>
  </section> 
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      loading: 2
    };
  },
  methods: {
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin(e) {
      let self = this;
      self.loading = 1;
      self.$store.commit("SET_EXTENSION_TEXT", "enter_group");
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        let r = await self.$store.dispatch("join_group", {
          classid: self.$route.params.id,
          join_limit: self.$store.state.group_info.group_info.join_limit
        });
        if (r) {
          self.downApp(e, "enter_group");
        }
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${
              location.hostname
            }?from=group&groupid=${self.$route.params.id}&limit=${
              self.$store.state.group_info.group_info.join_limit
            }`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toDown");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
      setTimeout(() => {
        self.loading = 2;
      }, 1500);
    },
    // 纯下载
    async downApp(e, str) {
      let self = this,
        redirectUrl;
      if (str === "enter_group") {
        redirectUrl = `${location.protocol}//${
          location.host
        }?from=group&groupid=${self.$route.params.id}`;
      } else if (str === "direct_bottom") {
        redirectUrl = "closer://jump/to/home";
      }
      self.$com.down_statistics(
        self.$store,
        self.$route,
        str,
        "direct_bottom",
        redirectUrl
      );
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