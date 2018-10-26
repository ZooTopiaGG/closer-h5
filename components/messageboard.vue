<template>
   <!-- 留言板 --> 
   <section class="feed-2" id="messageboard" v-if="!$store.state.isPre">
     <section v-if="$store.state.not_closer_app && messagelist.data.length > 0">
      <section class="split-box"></section>
      <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
      <!-- <section v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
      <section v-if="$store.state.res.int_category != 1 ">
        <section class="message-num flex flex-pack-justify">
          <span>精彩留言</span>
          <span class="writeMessage" @click="writeMessage('comment', $route.params.id)">写留言</span>
        </section>
        <section>
          <ul class="feed-messagebord-list">
            <li class="feed-messagebord-list-cell" v-for="(item, index) in messagelist.data" :key="index">
              <section class="messager-info flex flex-align-center flex-pack-justify">
                <section class="messager-info-div flex flex-align-center" v-if="item.user">
                  <img v-if="item.user.attributes && item.user.attributes.roster" v-lazy="$com.makeFileUrl(item.user.attributes.roster.avatar)">
                  <img v-else v-lazy="$com.makeFileUrl(item.user.avatar)">
                  <section class="flex flex-v">
                    <span v-if="item.user.attributes && item.user.attributes.roster" class="messager-name">{{ item.user.attributes.roster.name }}</span>
                    <span v-else class="messager-name">{{ item.user.fullname }}</span>
                    <span class="messager-time">{{ $com.createTime(item.long_create_time, 'yy-mm-dd hh:MM') }}</span>
                  </section>
                </section>
                <section class="icon-group flex flex-align-center">
                  <!-- 留言补丁 -->
                  <!-- <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="toMessage(item)"> -->
                  <p class="flex flex-align-center cursor messages" style="padding-right:10px; padding-top: 1px;" @click="writeMessage('reply', item.commentid)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAADfElEQVRYR+1XXWgcVRT+zp3dTUikwUalIkIeqg+FvjQgIqVds7O7vbO7goXFB/+ebLEUKkJ9kJaCWpAiVBARf0Awvsg+VJmduZnZbRhFqQ9GxD+wULSU1iI1UMmPTXbukYnZdkh2TffnSTJPwz3nfN8337lz5g7h1kVFK3uIgcNgbAeQiMX6datBuAjGh1f/mH19ZmZmeS0wNRcsmX2TgCP9Yr4NnDOOqu1vKUjKzA4B8QOABpN4enh4y6eVSmXpNkA7Skmn04mhodSjxPwJgDvBvM+ZqntxkBWHitI8zKC3GPyRq+rPdsTSRXJBZl8BcBygNxzlH10nqCCzLwM4CdBJR/nHuuDoqKQgcwcAfhfg9xxVP7gpaK19mw5ttKF6cigaCQaJg2A4VVXz42RFaT4HwgO00DhlB8G1mzPNSm+DTh41hPjOdr3JvrasILPfABhnxt9GcnDUtu2FiEBK82EBOvcvGb3jKP9Qk7hgZSfBeAoACy122p73U1xUTw4VpWkzqAjg8vzi8lgQBI0I/LF8fnsodESUIqLjVdd/rUla3GeeYqJoviyQET5YrU5f7pugXC43nBQ632DjnOd5v8eBV9rJYqw6VVORG81YuVw2FueuW5rCX1z37Pm+tmyjDdpNvKeWdUO4Uc2moP+jQ+YLAJ0G6H1H+Qc2esJe45ZlHiOmV0F82nHrL6772pfy+V1a6BkA80xkua7/Ra+k7eoty9xJTNGh7F5i7K9O1c6sExQtFGTuY4CfXA3OArjRAnRZg59Qqv51O8JSKX2XDlMOmO9vkROd0+9eme3A51VVmwCgWwoaHx9Pbrtn9ATAzwPY+h8OzULQXsfxf1ybY5rmyGBSTDN4V9t6xhyIJucXl14KgmBubd7NQ34sIKSUo0RkxJPDMKSE0G8DeByMK0LTbtv3f23mrEz0BPtgPALgPJMuAQN/xTEGGg2dGBn5s1KphO0EtxLU9uGklAMCDQdABuALTI3drhtcja8z8FsjpD2+71/qZh92JCgiSKfTdwwPpc6C+SECfb8UIpsw+AMCSgCuaIR7lJq+0I2Y1b3VeWkmkxkdTInoTdwBIGrLFoCvJZDc+5lSP3eOeKuiY4eapcXixH06NL4kYIwZ142kmLBt79texHTtUJN09UzkaeAZpWpf9SqmZ0ERQLlcTvXzL7frlvXDjVYY/wDEM9MuxdT8/QAAAABJRU5ErkJggg==" alt="">
                    <span>{{ item.replyNumber }}</span>
                  </p>
                  <!-- 点赞补丁 -->
                  <p class="supports cursor flex flex-align-center" @click="toSupport($event)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC">
                  </p>
                </section>
              </section>
              <section class="messager-content">
                <section class="messager-content-1">{{ item.content }}</section>
                <section v-if="item.replyNumber > 0">
                  <ul class="messager-comments">
                    <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" v-if=" commentIndex <= 3" :key="commentIndex">
                      <span>{{ commentItem.user.fullname }}：</span>
                      <span class="messager-comment">{{ commentItem.content }}</span>
                    </li>
                    <!-- 更多回复补丁 -->
                    <li class="messager-comments-cell" v-if="item.replyNumber > 3" @click="downApp($event, 'more_reply')">
                    <!-- <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="morereply(item)"> -->
                      <span class="reply-number">共{{ item.replyNumber }}条回复</span>
                    </li>
                  </ul>
                </section>
              </section>
            </li>
          </ul>
        </section>
        <section class="look-more flex flex-align-center flex-pack-center" @click="firstLogin">
          点击查看更多评论 <i class="right-arrow"></i>
        </section>    
      </section>
    </section>
    <section v-else>
      <section class="split-box"></section>
        <section class="nomessage flex flex-align-center flex-pack-justify">
        <span class="prompt">暂无留言，赶紧留言吧～</span>
        <span class="write flex flex-align-center" @click="writeMessage('comment', $route.params.id)">写留言</span>
      </section>
    </section> 
   </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  data() {
    return {
      isLike: false,
      b: [],
      messagelist: {
        data: []
      },
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  methods: {
    async getMessageList() {
      let self = this;
      let data = await self.$axios.$get(
        `${api.command.comments}?pagesize=5&pagenum=1&subjectid=${
          self.$route.params.id
        }`
      );
      if (data.code === 0) {
        self.messagelist = data.result;
        self.$store.commit("SET_MESSAGE_LIET", data.result);
      } else {
        self.$toast({
          message: data.result,
          position: "top"
        });
      }
      return true;
    },
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "more_message");
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.downApp();
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toDown");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    async writeMessage(type, id) {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "message");
      if (this.$store.state.res.int_type === 2) {
        window.sessionStorage.setItem("title", this.$store.state.res.title);
      } else {
        window.sessionStorage.setItem("title", this.$store.state.content.text);
      }
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.gotoMessage(type, id);
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          let url;
          if (type === "comment") {
            url = `${location.protocol}//${
              location.hostname
            }/feed/tomessage/${id}`;
          } else {
            url = `${location.protocol}//${location.hostname}/feed/tomessage/${
              this.$route.params.id
            }/${id}`;
          }
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url
          });
        } else {
          self.gotoMessage(type, id);
        }
      }
    },
    // h5下载补丁
    async downApp(e, str) {
      let self = this;
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: self.$store.state.extension_text
      });
    },
    // 点赞操作
    async toSupport(e) {
      e.target.src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==";
    },
    // 前往写留言
    gotoMessage(type, id) {
      if (type === "comment") {
        this.$router.push({ path: `/feed/tomessage/${id}` });
      } else {
        this.$router.push({
          path: `/feed/tomessage/${this.$route.params.id}/${id}`
        });
      }
    }
  },
  beforeMount() {
    this.getMessageList();
  }
};
</script>
<style scoped lang="less">
@import "../assets/css/feedid.less";
@textcolor: #495060;
@focuscolor: #507caf;
@bottomcolor: #eaeaea;
@m20: 2.667vw;
@basefont: 16px;
@height: 11.47vw;
.feed-2 {
  display: block;
  .message-num {
    height: @height;
    line-height: @height;
    padding: 0 3.2vw;
    font-size: @basefont;
    box-sizing: border-box;
    margin-bottom: @m20;
    // font-weight: bold;
    .writeMessage {
      color: @focuscolor;
      font-size: 16px;
    }
  }
  .feed-messagebord-list-cell {
    padding: @m20 0 0;
    .messager-info-div {
      img {
        width: 9.6vw;
        height: 9.6vw;
        max-width: 72px;
        max-height: 72px;
        border-radius: 100%;
        margin-right: @m20;
      }
      .messager-name {
        margin-bottom: 2px;
      }
    }
    .messager-content {
      margin-left: 12.267vw;
      line-height: 1.6;
      text-align: justify;
      font-size: @basefont - 1;
      box-sizing: border-box;
      border-bottom: 1px solid @bottomcolor;
      .messager-content-1 {
        margin-bottom: @m20;
      }
      .messager-comments {
        padding: @m20 / 2 @m20;
        background-color: #f4f4f4;
        margin: 0 0 @m20 * 2;
        .messager-comments-cell {
          box-sizing: border-box;
          padding: 0.67vw 0;
          .reply-number {
            color: @focuscolor;
          }
        }
      }
    }
  }
  .feed-messagebord-list-cell:last-child {
    .messager-content {
      border-bottom: 0;
    }
  }
  .look-more {
    height: @height;
    font-size: @basefont;
    color: @focuscolor;
    border-top: 1px solid @bottomcolor;
    .right-arrow {
      width: 2.4vw;
      height: 2.4vw;
      background: url("../assets/images/Shape2@2x.png") no-repeat;
      background-size: cover;
      margin-left: @m20;
    }
  }
  .messages {
    img {
      margin-right: @m20 / 2;
    }
  }
}
.nomessage {
  height: 13.34vw;
  box-sizing: border-box;
  padding: @m20 / 2 @m20;
  background: #fff;
  color: @focuscolor;
  font-size: @basefont;
  .prompt {
    color: @textcolor;
  }
  .write {
    height: 13.34vw;
    padding-left: @m20;
  }
}
@media screen and (min-width: 681px) {
  .feed-2 {
    display: none;
  }
}
</style>