<template>
   <!-- 留言板 -->
  <div
    :class="{
    'feed-2': true,
    'flex-1': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)}" v-if="$store.state.GET_MESSAGE_STATE && $store.state.res.commentNumber > 0">
    <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
    <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
    <div :class="{
      'message-box':!($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
      'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)}" v-if="$store.state.res.int_category != 1 ">
      <div class="message-num">
        {{ $store.state.res.commentNumber }} 条留言
      </div>
      <div :class="{
        'flex-1': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
        }">
        <ul class="feed-messagebord-list" v-if="$store.state.messagelist.data && $store.state.messagelist.data.length > 0">
          <li class="feed-messagebord-list-cell" v-for="(item, index) in $store.state.messagelist.data" :key="index">
            <div class="messager-info flex flex-align-center flex-pack-justify">
              <div class="messager-info-div flex flex-align-center" v-if="item.user">
                <img v-lazy="$com.makeFileUrl(item.user.avatar)">
                <div class="flex flex-v">
                  <span class="messager-name" v-if="item.user.attributes && item.user.attributes.roster">{{ item.user.attributes.roster.name }}</span>
                  <span class="messager-name" v-else>{{ item.user.fullname }}</span>
                  <span class="messager-time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                </div>
              </div>
              <div class="icon-group flex flex-align-center">
                <!-- 留言补丁 -->
                <!-- <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="toMessage(item)"> -->
                <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="downApp">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAADfElEQVRYR+1XXWgcVRT+zp3dTUikwUalIkIeqg+FvjQgIqVds7O7vbO7goXFB/+ebLEUKkJ9kJaCWpAiVBARf0Awvsg+VJmduZnZbRhFqQ9GxD+wULSU1iI1UMmPTXbukYnZdkh2TffnSTJPwz3nfN8337lz5g7h1kVFK3uIgcNgbAeQiMX6datBuAjGh1f/mH19ZmZmeS0wNRcsmX2TgCP9Yr4NnDOOqu1vKUjKzA4B8QOABpN4enh4y6eVSmXpNkA7Skmn04mhodSjxPwJgDvBvM+ZqntxkBWHitI8zKC3GPyRq+rPdsTSRXJBZl8BcBygNxzlH10nqCCzLwM4CdBJR/nHuuDoqKQgcwcAfhfg9xxVP7gpaK19mw5ttKF6cigaCQaJg2A4VVXz42RFaT4HwgO00DhlB8G1mzPNSm+DTh41hPjOdr3JvrasILPfABhnxt9GcnDUtu2FiEBK82EBOvcvGb3jKP9Qk7hgZSfBeAoACy122p73U1xUTw4VpWkzqAjg8vzi8lgQBI0I/LF8fnsodESUIqLjVdd/rUla3GeeYqJoviyQET5YrU5f7pugXC43nBQ632DjnOd5v8eBV9rJYqw6VVORG81YuVw2FueuW5rCX1z37Pm+tmyjDdpNvKeWdUO4Uc2moP+jQ+YLAJ0G6H1H+Qc2esJe45ZlHiOmV0F82nHrL6772pfy+V1a6BkA80xkua7/Ra+k7eoty9xJTNGh7F5i7K9O1c6sExQtFGTuY4CfXA3OArjRAnRZg59Qqv51O8JSKX2XDlMOmO9vkROd0+9eme3A51VVmwCgWwoaHx9Pbrtn9ATAzwPY+h8OzULQXsfxf1ybY5rmyGBSTDN4V9t6xhyIJucXl14KgmBubd7NQ34sIKSUo0RkxJPDMKSE0G8DeByMK0LTbtv3f23mrEz0BPtgPALgPJMuAQN/xTEGGg2dGBn5s1KphO0EtxLU9uGklAMCDQdABuALTI3drhtcja8z8FsjpD2+71/qZh92JCgiSKfTdwwPpc6C+SECfb8UIpsw+AMCSgCuaIR7lJq+0I2Y1b3VeWkmkxkdTInoTdwBIGrLFoCvJZDc+5lSP3eOeKuiY4eapcXixH06NL4kYIwZ142kmLBt79texHTtUJN09UzkaeAZpWpf9SqmZ0ERQLlcTvXzL7frlvXDjVYY/wDEM9MuxdT8/QAAAABJRU5ErkJggg==" alt="">
                </p>
                <!-- 点赞补丁 -->
                <p class="supports cursor" @click="toSupport(item, index)">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC" v-if="!item.isLike">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==" v-else>
                </p>
              </div>
            </div>
            <div class="messager-content">{{ item.content }}</div>
            <div v-if="item.replyNumber > 0">
              <ul class="messager-comments">
                <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" v-if=" commentIndex <= 3" :key="commentIndex">
                  <span>{{ commentItem.user.fullname }}：</span>
                  <span class="messager-comment">{{ commentItem.content }}</span>
                </li>
                <!-- 更多回复补丁 -->
                <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="downApp">
                <!-- <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="morereply(item)"> -->
                  <span>共{{ item.replyNumber }}条回复</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
    tjFocus() {},
    // h5下载补丁
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: window.sessionStorage.getItem("h5Adid") || "closer-share" // 栏目id
      });
      if (result) {
        if (this.$route.path.indexOf("/community") > -1) {
          location.href = `${api.downHost}?downurl=closer://community/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/feed") > -1) {
          location.href = `${api.downHost}?downurl=closer://feed/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/group") > -1) {
          location.href = `${api.downHost}?downurl=closer://group/${
            this.$route.params.id
          }`;
        } else {
          location.href = `${api.downHost}`;
        }
      }
    },
    // 点赞操作
    async toSupport(item, index) {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.support(item);
      } else {
        // 前期仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            //url: location.href
            url: `${location.protocol}//${
              location.hostname
            }/redirect?redirectUrl=${location.href}`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@import "../assets/css/feedid.less";
@textcolor: #495060;
.feeder-cover {
  padding: 5.3vw 4vw;
  width: 100%;
  box-sizing: border-box;
  .access-not {
    width: 13.87vw;
    height: 5.87vw;
    margin-right: 2.67vw;
    border-radius: 5px;
  }
  .communityName {
    max-width: 45vw;
    color: @textcolor;
    font-size: 14px;
    height: 19px;
    overflow-y: hidden;
  }
  .focus {
    color: #507caf;
    font-size: 16px;
    padding-right: 1.35vw;
  }
}
</style>