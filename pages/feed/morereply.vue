<template>
  <div id="comment" class="flex flex-v">
    <div class="comment-head">
      <div v-if="item.user" class="messager-info flex flex-align-center flex-pack-justify">
        <div class="messager-info-div flex flex-align-center">
          <img v-lazy="$com.makeFileUrl(item.user.avatar)">
          <div class="flex flex-v">
            <span class="messager-name">{{ item.user.fullname }}</span>
            <span class="messager-time">{{ $com.getCommonTime(item.long_create_time, "yy-mm-dd hh:MM") }}</span>
          </div>
        </div>
        <div class="icon-group flex flex-align-center">
          <p class="supports" @click="toSupport(item)">
            <img src="~/assets/images/home_btn_like_n@2x.png" v-if="!item.isLike">
            <img src="~/assets/images/home_btn_like_pre@2x.png" v-else>
          </p>
        </div>
      </div>
      <div class="messager-content">{{ item.content }}</div>
    </div>
    <div class="split-box"></div>
    <div class="comment-list">
      <div class="message-num">{{ res.count }}条回复</div>
      <ul class="feed-messagebord-list">
        <li v-if="items.user" class="feed-messagebord-list-cell" v-for="(items, index) in res.data" :key="index">
          <div class="messager-info flex flex-align-center flex-pack-justify">
            <div class="messager-info-div flex flex-align-center">
              <img v-lazy="$com.makeFileUrl(items.user.avatar)">
              <div class="flex flex-v">
                <span class="messager-name">{{ items.user.fullname }}</span>
                <span class="messager-time">{{ items.long_create_time }}</span>
              </div>
            </div>
            <div class="icon-group flex flex-align-center">
              <p class="supports" @click="toSupport(items)">
                <img src="~/assets/images/home_btn_like_n@2x.png" v-if="!items.isLike">
                <img src="~/assets/images/home_btn_like_pre@2x.png" v-else>
              </p>
            </div>
          </div>
          <div class="messager-content">{{ items.content }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  async asyncData({ req, query, store, app, error }) {
    if (req) {
      store.commit("SET_NO_NAV", false);
    }
    try {
      let para = {
        subjectid: query.sid,
        commentid: query.cid,
        pagenum: 1,
        pagesize: 10
      };
      let data = await app.$axios.$post(`${api.command.replys}`, para);
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          x.long_create_time = $async.getCommonTime(
            x.long_create_time,
            "yy-mm-dd hh:MM"
          );
          return x;
        });
        return {
          res: {
            data: arr,
            count: data.result.count
          }
        };
      } else {
        error({ message: `${data.result}` });
      }
    } catch (err) {
      error({ message: `${err}` });
    }
  },
  head() {
    return {
      title: "更多回复"
    };
  },
  data() {
    return {
      item: {}
    };
  },
  methods: {
    // 去点赞
    async toSupport(items) {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.support(items);
        return;
      } else {
        // 前期仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          self.$toast({
            message: "没有token",
            position: "top"
          });
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
          return;
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 点赞接口 closer_reply.like
    async support(items) {
      let self = this;
      try {
        let para = {
          subjectid: items.subjectid,
          commentid: items.commentid,
          flag: items.isLike ? 0 : 1
        };
        let data = await self.$axios.$post(`${api.admin.like}`, para);
        if (data.code === 0) {
          self.$set(items, "isLike", !items.isLike);
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("/feed/morereply") > -1) {
      this.$store.commit("SET_NO_NAV", false);
    } else {
      this.$store.commit("SET_NO_NAV", true);
    }
    next();
  },
  beforeMount() {
    this.$store.commit("SET_NO_NAV", false);
    this.item = JSON.parse(sessionStorage.getItem("item"));
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
