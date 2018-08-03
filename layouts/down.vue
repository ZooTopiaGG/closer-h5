<template>
  <section class="down_app">
    <section class="point">
      <img src="~/assets/images/point@2x.png" alt="">
    </section>
    <section class="noweixin">
      <p>已下载？
        <a class="goApp" @click="goApp" href="javascript:;">打开应用</a>
      </p>
    </section>
    <section :class="{
      downtitle: true,
      groupdowntitle: $route.query.from === 'group'
    }">
      <h3 v-if="$route.query.from === 'group'">只需两步，马上开聊～</h3>
      <h3 v-else>若已安装了客户端</h3>
      <p class="flex flex-align-center">1. 请先点击右上角更多
        <img src="~/assets/images/more@2x.png" alt="">
      </p>
      <p class="flex flex-align-center">2. 然后选择在  <span class="browser browser_ios">Safari</span>  <span class="browser browser_other">浏览器</span> 中打开</p>
    </section>
    <section class="downbody">
      <img v-if="$route.query.from != 'group'" class="body-image" src="~/assets/images/downapp@2x.png" alt="">
      <section v-else class="flex flex-v flex-align-center">
        <section class="split-dotted"></section>
        <section class="body-status flex flex-v flex-align-center">
          <i class="body-middle-icon"></i>
          <section>恭喜，您已成功入群</section>
        </section>
        <section class="body-bottom flex flex-v flex-align-center">
          <i class="body-bottom-icom"></i>
          <section>新用户请下载App，并以微信登录</section>
        </section>
      </section>
    </section>
    <section class="downfooter flex flex-align-center flex-pack-justify">
      <section class="flex flex-align-center">
        <img class="down-logo" src="~/assets/images/login_logo@2x.png" alt="">
      <section class="downfooter_desc">
        <p>下载 「贴近」 客户端</p>
        <p>贴近一点 看身边</p>
      </section>
      </section>
      <section>
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer" class="downApp">立即下载</a>
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      downUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer"
    };
  },
  methods: {
    initLoad() {
      let self = this;
      if (self.isWeiXin()) {
        document.querySelector(".downtitle").style.display = "block";
        document.querySelector(".point").style.display = "block";
      } else {
        document.querySelector(".noweixin").style.display = "block";
        setTimeout(() => {
          if (self.$com.getParam("downurl", location.href)) {
            location.href = self.$com.getParam("downurl", location.href);
            setTimeout(() => {
              location.href = self.downUrl;
            }, 1000);
            return;
          } else if (self.$com.getParam("group", location.href)) {
            location.href = `closer://jump/to/group`;
            setTimeout(() => {
              location.href = self.downUrl;
            }, 1000);
            return;
          } else {
            location.href = self.downUrl;
          }
        }, 1500);
      }
    },
    goApp() {
      if (this.$com.getParam("downurl", location.href)) {
        location.href = this.$com.getParam("downurl", location.href);
      } else {
        location.href = self.downUrl;
        return;
      }
    },
    isWeiXin() {
      let ua = navigator.userAgent.toLowerCase();
      var iswx = false,
        isqq = false,
        iswb = false;
      // 微信内置浏览器
      iswx = /micromessenger/i.test(ua);

      // QQ内置浏览器
      isqq = /qq/i.test(ua);
      if (/mqqbrowser/i.test(ua)) {
        isqq = false;
      }
      // 微博内置浏览器
      iswb = /weibo/i.test(ua);
      return iswx || isqq || iswb;
    },
    async join_group() {
      let self = this;
      let res = await self.$store.dispatch("join_group", {
        classid: self.$route.query.groupid,
        join_limit: self.$route.query.limit
      });
      return res;
    },
    async login() {
      let self = this;
      let res = await self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        type: "else"
      });
      if (res) {
        if (self.$route.query.from === "group" && self.$route.query.tk != "1") {
          self.join_group();
        }
      }
    }
  },
  beforeMount() {
    let self = this;
    // 验证code是否存在 并 返回待办事项
    self.login();
  },
  mounted() {
    let self = this;
    if (self.$com.isIOS()) {
      document.querySelector(".browser_ios").style.display = "block";
    } else {
      document.querySelector(".browser_other").style.display = "block";
    }
    self.$nextTick(() => {
      self.initLoad();
    });
  }
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@color: #4b4945;
@primarycolor: #fddb00;
@mcolor: #94928e;
body,
html {
  margin: 0;
  overflow-x: hidden;
}

.down_app {
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-around;
  -ms-flex-pack: justify;
  justify-content: space-around;
  .downfooter {
    width: calc(100% - @m20 * 2);
    height: 21.33vw;
    box-sizing: border-box;
    margin: 0 auto;
    background: rgb(246, 246, 246);
    border-radius: 5px;
    padding: 0 @m20;
    img.down-logo {
      width: 12vw;
      height: 12vw;
      max-width: 90px;
      max-height: 90px;
      margin-right: @m20;
    }
    .downfooter_desc {
      p:nth-child(1) {
        color: @color;
      }
      p:nth-child(2) {
        color: #999;
        font-size: 10px;
      }
    }
    .downApp {
      padding: 5px 8px;
      background: @primarycolor;
      color: @color;
      outline: none;
      text-decoration: none;
      border: 0;
      border-radius: 4px;
      line-height: 1.6;
      box-sizing: border-box;
    }
  }
  .downbody {
    img.body-image {
      width: 100%;
      height: 90.125vw;
    }
    .body-status {
      font-size: 18px;
      .body-middle-icon {
        width: 20.8vw;
        height: 20.8vw;
        background-image: url("~/assets/images/Page1@2x.png");
        background-repeat: no-repeat;
        background-size: cover;
        margin-bottom: 7.467vw;
      }
    }
    .body-bottom {
      .body-bottom-icom {
        width: 89.33vw;
        height: 20.26vw;
        background-image: url("~/assets/images/Group79.png");
        background-repeat: no-repeat;
        background-size: cover;
        margin-top: @m20 * 4;
        margin-bottom: @m20;
      }
    }
  }
  .downtitle {
    padding: 8vw 4vw 0;
    font-size: 16px;
    color: @mcolor;
    display: none;
    h3 {
      font-size: 18px;
      color: @color;
      margin-top: 0;
      margin-bottom: @m20 * 2;
    }
    p:nth-child(2) {
      margin-bottom: @m20;
    }
    p {
      > img {
        width: 7.2vw;
        height: 3.74vw;
        margin-left: 5px;
      }
      > span {
        color: @color;
      }
    }
    .browser {
      display: none;
      margin: 0 @m20;
    }
  }

  .groupdowntitle {
    padding: @m20;
    margin: 6vw 4.67vw 0;
    background: rgba(253, 219, 0, 0.2);
    border-radius: 5px;
  }
  .point {
    position: fixed;
    right: 5vw;
    top: 4vw;
    display: none;
    img {
      width: 23.2vw;
      height: 17.34vw;
    }
  }
  .noweixin {
    text-align: center;
    font-size: 16px;
    display: none;
    a {
      color: @mcolor;
      text-decoration: underline;
    }
  }
}
</style>
