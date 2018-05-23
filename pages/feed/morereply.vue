<template>
  <div id="comment" class="flex flex-v">
    <div class="comment-head">
      <div class="messager-info flex flex-align-center flex-pack-justify">
        <div class="messager-info-div flex flex-align-center">
          <img src="~/assets/images/default.jpeg">
          <div class="flex flex-v">
            <span class="messager-name">Scott</span>
            <span class="messager-time">2010.10.10 10:10</span>
          </div>
        </div>
        <div class="icon-group flex flex-align-center">
          <p class="supports">
            <img src="~/assets/images/home_btn_like_n@2x.png" v-if="true">
            <img src="~/assets/images/home_btn_like_pre@2x.png" v-else>
          </p>
        </div>
      </div>
      <div class="messager-content">hehhehehehehe</div>
    </div>
    <div class="split-box"></div>
    <div class="comment-list">
      <div class="message-num">13条回复</div>
      <ul class="feed-messagebord-list">
        <li class="feed-messagebord-list-cell" v-for="item in 5" :key="item">
          <div class="messager-info flex flex-align-center flex-pack-justify">
            <div class="messager-info-div flex flex-align-center">
              <img src="~/assets/images/default.jpeg">
              <div class="flex flex-v">
                <span class="messager-name">Scott</span>
                <span class="messager-time">2010.10.10 10:10</span>
              </div>
            </div>
            <div class="icon-group flex flex-align-center">
              <p class="supports">
                <img src="~/assets/images/home_btn_like_n@2x.png" v-if="true">
                <img src="~/assets/images/home_btn_like_pre@2x.png" v-else>
              </p>
            </div>
          </div>
          <div class="messager-content">hehhehehehehe</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ req, store, app, error }) {
    if (req && req.originalUrl) {
      if (req.originalUrl === "/feed/morereply") {
        store.commit("SET_NO_NAV", false);
      }
    }
  },
  head() {
    return {
      title: "更多回复"
    };
  },
  data() {
    return {};
  },
  beforeRouteUpdate(to, from, next) {
    console.log("morereply", to);
    console.log("morereply", from);
    next();
  },
  mounted() {}
};
</script>
<style lang='less'>
#comment {
  min-height: 100vh;
  .feed-messagebord-list {
    padding: 0 0.3rem;
  }
  .comment-head {
    padding: 0.4rem 0.3rem 0.2rem;
  }
  .feed-messagebord-list-cell {
    border-bottom: 1px solid #eee;
    padding: 0.3rem 0 0;
  }
  .messager-info-div > img {
    width: 0.68rem;
    height: 0.68rem;
    border-radius: 100%;
    margin-right: 0.1rem;
    margin-bottom: 3px;
  }
  .messager-name {
    font-size: 14px;
  }
  .messager-time {
    font-size: 12px;
    color: #999;
  }
  .supports > img {
    width: 16px;
    height: 14px;
  }
  .messager-content {
    margin: 0.2rem 0;
    line-height: 1.6;
    text-align: justify;
  }
  .message-num {
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    font-size: 16px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 0.2rem;
    font-weight: bold;
  }
}
</style>
