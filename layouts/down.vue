<template>
  <div class="down_app flex flex-v flex-pack-justify">
    <div v-if="$store.state.agent.indexOf('micromessenger') > -1" class="point">
      <img src="~/assets/images/point@2x.png" alt="">
    </div>
    <div v-if="!$store.state.agent.indexOf('micromessenger') > -1" class="noweixin">
      <p>已下载？<a @click="goApp" href="javascript:;">打开应用</a></p>
    </div>
    <div v-else class="downtitle">
      <h3>若已安装了客户端</h3>
      <p class="flex flex-align-center">1. 请先点击右上角更多 <img src="~/assets/images/more@2x.png" alt=""></p>
      <p>2. 然后选择在 浏览器 中打开</p>
    </div>
    <div class="downbody">
      <img src="~/assets/images/downapp@2x.png" alt="">
    </div>
    <div class="downfooter flex flex-align-center flex-pack-justify">
      <img src="~/assets/images/login_logo@2x.png" alt="">
      <div class="downfooter_desc">
        <p>下载 「贴近」 客户端</p>
        <p>贴近一点 看身边</p>
      </div>
      <div>
        <mt-button type="primary" @click="downApp">立即下载</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    downApp() {
      location.href = api.downUrl;
    },
    goApp() {
      if (this.$route.query.downurl) {
        location.href = this.$route.query.downurl;
      } else {
        location.href = api.downUrl;
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    // ...
  },
  beforeMount() {
    console.log(this.$route.query.downurl);
  }
};
</script>
<style lang="less">
.down_app {
  padding: 0.5rem 0;
  box-sizing: border-box;
  height: 100vh;
  .noweixin {
    text-align: center;
    font-size: 16px;
    a {
      color: #94928e;
      text-decoration: underline;
    }
  }
  .point {
    position: fixed;
    right: 0.3rem;
    top: 0.3rem;
    img {
      width: 1.74rem;
      height: 1.3rem;
    }
  }
  .downtitle {
    padding: 0 0.3rem;
    font-size: 16px;
    color: #94928e;
    h3 {
      font-size: 18px;
      color: #4b4945;
      margin-top: 0;
      margin-bottom: 0.4rem;
    }
    p > img {
      width: 0.54rem;
      height: 0.28rem;
      margin-left: 5px;
    }
  }
  .downbody {
    img {
      width: 7.5rem;
      height: 6.76rem;
    }
  }
  .downfooter {
    width: 6.25rem;
    height: 1.6rem;
    box-sizing: border-box;
    margin: 0 auto;
    background: rgb(246, 246, 246);
    border-radius: 6px;
    padding: 0 0.2rem;
    > img {
      width: 0.9rem;
      height: 0.9rem;
    }
    .downfooter_desc {
      p:nth-child(1) {
        color: #4b4945;
      }
      p:nth-child(2) {
        color: #999;
        font-size: 10px;
      }
    }
  }
}
</style>
