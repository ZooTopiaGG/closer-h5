
<template>
  <section :class="{
    'open-article': true, flex: true, 'flex-align-center': true
  }">
    <section v-if="!($route.path.indexOf('group') > -1)">
      <mt-button type="primary" size="small" class="open-app" @click="downApp($event,'direct_bottom')">
        <span v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1"><span>立即投稿，赚取稿费</span><i class="down-arrow"></i></span>      
        <span v-else><span>打开贴近app，查看更多精彩文章</span><i class="down-arrow"></i></span>
      </mt-button>
    </section>
    <section v-else>
      <mt-button type="primary" size="small" class="open-app" @click="firstLogin">
        <section class="flex flex-align-center flex-pack-center">
          <mt-spinner v-if="loading === 1" :size="16" type="fading-circle" color="#495060" style="margin-right:5px"></mt-spinner>
          <span>进入群组</span>
        </section>
      </mt-button>
    </section>
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
  created() {
    let self = this;
    self.$store.commit(
      "Set_Fixed_Footer",
      self.$store.state.res.int_type === 2 &&
        self.$store.state.res.int_category === 1
    );
  },
  methods: {
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
      self.loading = 1;
      await self.$store.commit("SET_EXTENSION_TEXT", "enter_group");
      // 渲染页面前 先判断cookies token是否存在
      let t = self.$store.state.token
        ? self.$store.state.token
        : Cookie.get("token");
      if (t) {
        let res = await self.$store.dispatch("join_group", {
          classid: self.$route.params.id,
          join_limit: self.$store.state.group_info.group_info.join_limit
        });
        if (res) {
          self.downApp("", "enter_group");
        }
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          await self.$com.down_statistics({
            store: self.$store,
            route: self.$route,
            str: "",
            defaultStr: "direct_bottom",
            redirectUrl: "wx"
          });
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
      if (str == "enter_group") {
        redirectUrl = `${location.protocol}//${
          location.host
        }?from=group&groupid=${self.$route.params.id}&tk=1`;
      } else if (str === "direct_bottom") {
        redirectUrl = "closer://jump/to/home";
      }
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "direct_bottom",
        redirectUrl
      });
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #4b4945;
.open-article {
  width: 100%;
  height: 14.4vw;
  padding: 0 3.2vw;
  box-sizing: border-box;
  background: #fff;
  transition: 600ms cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 999;
  > section {
    width: 100%;
  }
}
.open-app {
  width: 100%;
  border-radius: 5px;
  height: 10.67vw;
}
.down-arrow {
  width: 2.4vw;
  height: 2.4vw;
  background: url("../assets/images/1@2x.png") no-repeat;
  background-size: cover;
  display: inline-block;
  margin-left: 1.335vw;
}
</style>