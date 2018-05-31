<template>
  <div>
    <div v-if="$store.state.exist">
      <nav v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoNav" 
      :class="{
        appnav: $store.state.res.int_type === 2 || $route.path.indexOf('/community')>-1,
        scrollnav: scrollnav,
        webNoNav: !$store.state.webNoNav,
        flex: true,
        'flex-v': true,
        'flex-pack-center': true
      }">
        <div class="feeder-cover flex flex-align-center flex-pack-justify">
          <div class="flex flex-align-center">
            <!-- <img v-if="!$store.state.res.blogo" class="access-not" src="http://file-sandbox.tiejin.cn/public/93hJ39k8JZ/1524902685000.jpg" :onerror="defaultErrorImg">
              <img v-else class="access-not" :src="$store.state.res.blogo" :onerror="defaultErrorImg"> -->
            <img class="access-not" v-lazy="$store.state.res.blogo">
            <span class="communityName ellipsis">{{ $store.state.res.communityName }}</span>
          </div>
          <div class="flex flex-align-center">
            <mt-button :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn" @click="tjFocus">
              <span v-if="$store.state.is_follow">已关注</span>
              <span v-else>
                <span class="icon-font icon-add" style="font-size:14px; margin-right: 2px;"></span>
                <span>关注</span>
              </span>
            </mt-button>
          </div>
        </div>
      </nav>
      <div id="wrapper" 
      :class="{ 
        'web-class': $store.state.GET_MESSAGE_STATE, 
        nuxts:true, 
        webNoNav: !$store.state.webNoNav,
        appnuxts: !$store.state.GET_MESSAGE_STATE }">
        <keep-alive>
          <nuxt/>
        </keep-alive>
      </div>
      <div v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoFooter" class="footer">
        <mt-button type="primary" size="small" @click="downApp" class="circle-btn">
          App内打开
        </mt-button>
      </div>
    </div>
    <div class="not-exist" v-else>
      <span>贴子已经被删除</span>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      col: "#333",
      scrollnav: false,
      exist: true
    };
  },
  methods: {
    downApp() {
      if (this.$route.path.indexOf("/community") > -1) {
        location.href = `${location.protocol}//${
          location.host
        }/down.html?downurl=closer://community/${this.$route.params.id}`;
        // this.$router.push({
        //   path: `/down?downurl=closer://community/${this.$route.params.id}`
        // });
      } else if (this.$route.path.indexOf("/feed") > -1) {
        location.href = `${location.protocol}//${
          location.host
        }/down.html?downurl=closer://feed/${this.$route.params.id}`;
      }
    },
    handleScroll(e) {
      if (
        // 判断是否是长图文或者栏目主页 滚动显示导航背景
        (this.$route.path.indexOf("/feed") > -1 &&
          this.$store.state.res.int_type === 2) ||
        this.$route.path.indexOf("/community") > -1
      ) {
        if (e.target.scrollTop >= 80) {
          this.scrollnav = true;
        } else {
          this.scrollnav = false;
        }
      } else {
        // console.log("不是长图文类型")
        return false;
      }
    },
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.res.communityid,
          flag: self.$store.state.is_follow ? 0 : 1
        });
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
          return;
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let wrp = document.getElementById("wrapper");
      if (wrp) {
        wrp.addEventListener("scroll", this.handleScroll);
      }
    });
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

nav {
  width: 100%;
  height: 7.35vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 100;
}

nav .icon-ios-more {
  color: #495060;
}

nav .communityName {
  color: #495060;
  font-size: 15px;
  height: 19px;
  overflow-y: hidden;
}

.nuxts {
  margin-top: 7.35vh;
  overflow-x: hidden;
  /*height: calc(100vh-0.98rem);*/
}
.webNoNav {
  margin-top: 0;
}
/*app内*/

nav.appnav {
  background: rgba(0, 0, 0, 0);
}

nav.appnav .icon-ios-more {
  color: #fff;
}

nav.appnav .communityName {
  color: #fff;
  max-width: 53.33vw;
}

nav.scrollnav {
  background: #fff;
  /*padding-top: 0;*/
}

nav.scrollnav .icon-ios-more {
  color: #495060;
}

nav.scrollnav .communityName {
  color: #495060;
}

nav.appnav ~ .nuxts {
  margin-top: 0;
  height: 100vh;
}

.appnuxts {
  margin-top: 0;
  /*height: 100vh;*/
}

.access-not {
  width: 21.87vw;
  height: 4.8vh;
  margin-right: 2.67vw;
  border-radius: 0 3px 3px 0;
}

.icon-ios-more {
  font-size: 28px;
  margin-left: 5.33vw;
  margin-right: 2.67vw;
}

.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.tj-focus-btn {
  box-sizing: border-box;
  margin-right: 4vw;
}
</style>
