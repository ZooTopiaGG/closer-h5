<template>
  <section class="top-nav">
    <section class="topnav flex flex-align-center flex-pack-justify">
        <section class="topnav-left flex flex-1 flex-align-center">
          <img class="topnav-logo" :src="defaultImg" v-lazy="require('~/assets/images/login_logo@2x.png')">
          <mt-swipe :auto="2000" :show-indicators="false" class="mtswipe flex-1">
            <mt-swipe-item>
              <section class="communityName flex flex-v flex-pack-center">
                <span>贴近一点 看身边</span>
              </section>
            </mt-swipe-item>
            <mt-swipe-item>
              <section class="communityName flex flex-v flex-pack-center">
                <span>成都人自己的资讯社群</span>
              </section>
            </mt-swipe-item>
            <mt-swipe-item>
              <section class="communityName two-desc flex flex-v flex-pack-center">
                <span>打开贴近看资讯</span>
                <span>领10元红包</span>
              </section>
            </mt-swipe-item>
          </mt-swipe>
        </section>
        <section class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn" @click="downApp">
            <span>下载贴近</span>
          </mt-button>
        </section>
      </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  methods: {
    async downApp(e, str) {
      let self = this,
        redirectUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "direct_top",
        redirectUrl
      });
    }
  }
};
</script>
<style scoped lang="less">
@h100: 100%;
@textcolor: #4b4945;
.top-nav {
  padding: 0 4vw;
  box-sizing: border-box;
  width: @h100;
  height: @h100;
  background: #fff;
  color: @textcolor;
  box-shadow: 0 1px 5px #efefef;
  .topnav {
    height: @h100;
    .topnav-left {
      height: @h100;
    }
    .mtswipe {
      height: @h100;
    }
    .communityName {
      height: @h100;
      color: @textcolor;
    }
    .two-desc {
      font-size: 14px;
    }
    .topnav-logo {
      width: 11.4vw;
      height: 11.4vw;
      max-width: 86px;
      max-height: 86px;
      margin-right: 2.67vw;
      border-radius: 5px;
    }
  }
}
</style>