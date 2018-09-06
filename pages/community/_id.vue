<template>
  <section id="group" :class="{  
        flex:true,
        'flex-v':true }">
    <section class="community-top flex flex-v flex-align-center flex-pack-justify">
      <section class="commuinty-logo">
        <dp-logo></dp-logo>    
        <section>{{ $store.state.res.name }}</section>
      </section>
      <section class="community-desc" v-if="!res.community.description">
        <section>用心写出有态度，有深度，有高度的文章</section>
        <section>请关注我们吧～</section>
      </section>
      <section class="community-desc" v-else>
        <section>{{ res.community.description }}</section>
      </section>
      <dp-focus :tjFocus="tjFocus"></dp-focus>
    </section>
    <section class="split-box"></section>    
    <section v-if="group.data && group.data.length>0" class="member">
      <section class="flex flex-align-center flex-pack-justify">
        <span class="title">正在招募的群组</span>
        <span class="more-group flex flex-align-center" @click="downApp('more_group')">更多群组 <i class="right-arrow"></i></span>
      </section>
      <ul :class="{
                group: true, 
                flex: true, 
                'flex-v': true
            }">
        <li v-for="(item, index) in group.data" :key="index" @click="toGroup(item.id)" class="flex flex-align-start">
          <img class="avatar" v-lazy="$com.makeFileUrl(item.group.avatar)">
          <section class="info flex flex-v">
            <span class="name">{{ item.group.name }}</span>
            <span class="desc text-ellipse">{{ JSON.parse(item.group.description)[0].content }}</span>
          </section>
        </li>
      </ul>
    </section>
    <section class="nothing-group" v-else>
      <p>本栏目暂不开放招新</p>
      <p>可通过投稿申请建群～</p>
    </section>
    <section class="common-feed">
      <dp-feed v-if="$store.state.feed_list.length > 0" title="热门文章" :feed-list="community_list"></dp-feed>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import dpFocus from "~/components/dpfocus";
import dpLogo from "~/components/dplogo";

export default {
  head() {
    return {
      title: `贴近 - TieJin.cn - ${this.$store.state.res.name || ""}`
    };
  },
  async fetch({ app, error, params, store, query }) {
    // 分享后校验adid是否存在
    if (query && query.adid) {
      store.commit("SET_ADID", query.adid);
    } else {
      store.commit("SET_ADID", "");
    }
  },
  header() {
    return {
      title: this.res.community.description
        ? this.res.community.description
        : this.res.community.name
    };
  },
  components: {
    dpFocus,
    dpLogo
  },
  data() {
    return {
      res: {
        community: {}
      },
      group: {},
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      id: "",
      community_list: []
    };
  },
  methods: {
    // 跳转到群组
    toGroup(id) {
      this.$router.push({ path: `/group/${id}` });
    },
    // h5下载补丁
    async downApp(str) {
      let self = this;
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "more_group"
      });
    },
    async communityDetails() {
      let app = this,
        store = app.$store,
        query = app.$route.query,
        params = app.$route.params;
      if (query && query.adid) {
        store.commit("SET_ADID", query.adid);
      } else {
        store.commit("SET_ADID", "");
      }
      // 获取栏目详情
      let community = await app.$axios.$get(
        `${api.community.show}?communityid=${params.id}`
      );
      if (community.code === 0) {
        // 设置communityid到res状态
        store.commit("SET_RES", community.result);
        // 关注状态
        if (community.result.isFollowed) {
          store.commit("SET_FOCUS_STAT", community.result.isFollowed);
        }
        community.result.communityid = params.id;
        app.res.community = community.result;
      }
    },
    // 获取贴子列表
    async getFeedList() {
      let self = this;
      let feed = await self.$axios.$get(
        `${api.community.community_subject_list_index}?communityid=${
          self.$route.params.id
        }`
      );
      if (feed.code === 0) {
        let arr = await feed.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        });
        self.$store.commit("SET_FEED_LIST", arr);
        self.community_list = arr;
      }
    },
    // 获取群组列表
    async getGroupList() {
      let self = this;
      let group = await self.$axios.$get(
        `${api.group.recruiting}?communityid=${
          self.$route.params.id
        }&pagenum=1&count=3`
      );
      if (group.code === 0) {
        self.group = group.result;
      }
    },
    // 关注
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
    },
    // 微信登录关注
    async focusWxLogin() {
      let self = this,
        tokenStatus,
        userStatus;
      // 验证token he user 是否存在 避免重复调用 login_with_wechat
      try {
        tokenStatus = Cookie.get("token") || self.$store.state.token;
        userStatus = Cookie.get("user") || self.$store.state.auth;
      } catch (e) {
        tokenStatus = self.$store.state.token ? true : false;
        userStatus = self.$store.state.auth ? true : false;
      }
      // 验证code是否存在
      if (self.$route.query.code && !tokenStatus && !userStatus) {
        let res = await self.$store.dispatch("get_code_by_login", {
          code: self.$route.query.code,
          type: "else"
        });
        if (res) {
          let result = await self.$store.dispatch("get_focus_stat", {
            communityid: self.$store.state.res.communityid,
            flag: self.$store.state.is_follow ? 0 : 1
          });
          if (result) {
            self.$store.commit("SHOW_ALERT", true);
          }
        }
      }
    }
  },
  beforeMount() {
    let self = this;
    self.focusWxLogin();
    self.communityDetails();
    self.getFeedList();
    self.getGroupList();
  }
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@m15: 2vw;
@textcolor: #4b4945;
@scolor: #94928e;
#group {
  overflow-x: hidden;
}
.member {
  padding: 0 @m20 @m20;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
.more-group {
  color: @scolor;
}
.content {
  padding: 0 @m15 @m15;
  text-align: justify;
  font-size: 14px;
  color: #808080;
}

.member {
  padding-top: @m20 * 2;
}

.common-feed {
  position: relative;
}

.works .title {
  margin-left: 4.67vw;
}

.group {
  padding: @m15 * 2 0;
  li {
    width: 100%;
    margin-bottom: @m15 * 4;
    box-sizing: border-box;
    section.info {
      max-width: 77.6vw;
      text-align: justify;
      .name {
        font-size: 16px;
        color: @textcolor;
        margin-bottom: @m20;
      }
      .desc {
        font-size: 14px;
        color: @scolor;
        max-height: @m15 * 8;
        overflow: hidden;
        -webkit-line-clamp: 3;
      }
    }
    img.avatar {
      width: 14.4vw;
      height: 14.4vw;
      max-width: 108px;
      max-height: 108px;
      display: block;
      border-radius: 5px;
      margin-right: @m20;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
}

/* 调整的 */
.right-arrow {
  width: 1.8666vw;
  height: 0.9333vw;
  min-width: 7px;
  min-height: 14px;
  background: url("~/assets/images/back5@2x.png") no-repeat;
  background-size: cover;
  margin-left: @m20;
}

.nothing-group {
  padding: @m15 * 2;
  color: #808080;
}
.community-top {
  padding: @m15 * 4 0;
  text-align: center;
}
.commuinty-logo {
  margin-bottom: @m20 * 2;
  font-size: 18px;
  > img {
    width: 18.93vw;
    height: @m15 * 4;
    border-radius: 5px;
    margin-bottom: @m20;
  }
}
.community-desc {
  font-size: 16px;
  line-height: 1.6;
  color: @scolor;
  margin-bottom: @m15 * 4;
}
</style>
