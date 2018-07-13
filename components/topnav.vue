<template>
  <mt-swipe :auto="4000" :show-indicators="false" class="top-nav">
    <mt-swipe-item class="flex flex-pack-center">
      <div class="topnav flex flex-align-center flex-pack-justify">
        <div class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName ellipsis">贴近一点 看身边</span>
        </div>
        <div class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn">
            <span>下载贴近</span>
          </mt-button>
        </div>
      </div>
    </mt-swipe-item>
    <mt-swipe-item>
      <div class="topnav flex flex-align-center flex-pack-justify">
        <div class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName ellipsis">能赚稿费的成都资讯社区</span>
        </div>
        <div class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn">
            <span>下载贴近</span>
          </mt-button>
        </div>
      </div>
    </mt-swipe-item>
    <mt-swipe-item>
      <div class="topnav flex flex-align-center flex-pack-justify">
        <div class="flex flex-1 flex-align-center">
          <img class="topnav-logo" src="~/assets/images/login_logo@2x.png">
          <span class="communityName ellipsis">打开贴近看新闻 领10元现金红包</span>
        </div>
        <div class="flex flex-align-center">
          <mt-button type="primary" size="small" class="circle-btn">
            <span>下载贴近</span>
          </mt-button>
        </div>
      </div>
    </mt-swipe-item>
  </mt-swipe>
</template>
<script>
</script>
<style scoped lang="less">
@textcolor: #4b4945;
.top-nav {
  padding: 0 4vw;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: @textcolor;
  .topnav {
    height: 100%;
    .communityName {
      color: @textcolor;
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