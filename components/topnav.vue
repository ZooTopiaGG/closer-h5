<template>
  <mt-swipe :auto="4000" :show-indicators="false" class="top-nav">
    <mt-swipe-item class="flex flex-pack-center">
      <section class="topnav flex flex-align-center flex-pack-justify">
        <section class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName ellipsis">贴近一点 看身边</span>
        </section>
        <section class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn" @click="downApp">
            <span>下载贴近</span>
          </mt-button>
        </section>
      </section>
    </mt-swipe-item>
    <mt-swipe-item>
      <section class="topnav flex flex-align-center flex-pack-justify">
        <section class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName ellipsis">成都本地资讯</span>
        </section>
        <section class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn"  @click="downApp">
            <span>下载贴近</span>
          </mt-button>
        </section>
      </section>
    </mt-swipe-item>
    <mt-swipe-item>
      <section class="topnav flex flex-align-center flex-pack-justify">
        <section class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName two-desc flex flex-v">
            <span>打开贴近看新闻</span>
            <span>领10元现金红包</span>
          </span>
        </section>
        <section class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn"  @click="downApp">
            <span>下载贴近</span>
          </mt-button>
        </section>
      </section>
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    downApp() {
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #4b4945;
.top-nav {
  padding: 0 4vw;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: @textcolor;
  box-shadow: 0 1px 5px #efefef;
  .topnav {
    height: 100%;
    .communityName {
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
    }
  }
}
</style>