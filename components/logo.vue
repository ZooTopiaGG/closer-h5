<template>
  <section :class="{
    'feeder-cover': true, flex: true, 'flex-align-center': true, 'flex-pack-justify': true,
    frompaper: $route.query.from === 'paper' || ($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
    fromVideo: $store.state.res.int_type === 1
  }" v-if="$store.state.not_closer_app">
    <section class="flex flex-1 flex-align-center" @click="toCommunity">
      <dp-logo class="feed-logo"></dp-logo>
      <section class="feed-title flex flex-v flex-pack-center">
        <span class="communityName ellipsis">{{ $store.state.res.communityName || $store.state.res.name }}</span>
        <span class="publish_time" v-if="$route.query.from != 'paper'"> {{ $com.getCommonTime($store.state.res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
      </section>
    </section>
    <dp-focus :tjFocus="tjFocus"></dp-focus>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import dpFocus from "~/components/dpfocus";
import dpLogo from "~/components/dplogo";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  components: {
    dpFocus,
    dpLogo
  },
  methods: {
    toCommunity() {
      this.$router.push({
        path: `/community/${this.$store.state.res.communityid}`
      });
    },
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "follow");
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        let result = await self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.res.communityid,
          flag: self.$store.state.is_follow ? 0 : 1
        });
        if (result) {
          self.$store.commit("SHOW_ALERT", true);
        }
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}${
              self.$route.fullPath
            }`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toFocus");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
@textcolor: #495060;
.feeder-cover {
  padding: 0 3.2vw;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: -1px;
  .access-not {
    width: 10vw;
    height: 10vw;
    margin-right: 2.67vw;
    border-radius: 5px;
  }
  .feed-title {
    height: 10vw;
    .communityName {
      max-width: 45vw;
      color: @textcolor;
      font-size: 14px;
      height: 19px;
      overflow-y: hidden;
    }
    .publish_time {
      font-size: 12px;
      color: #aaaaaa;
    }
  }
  .focus {
    color: #507caf;
    font-size: 16px;
    padding-right: 1.35vw;
  }
}
.fromVideo {
  padding-top: 3.2vw;
}
.frompaper {
  padding-top: 0;
}
@media screen and (min-width: 681px) {
  .feeder-cover {
    display: none;
  }
}
</style>