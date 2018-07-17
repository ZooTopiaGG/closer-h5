<template>
  <section id="group" :class="{  
        flex:true,
        'flex-v':true }">
    <section class="community-top flex flex-v flex-align-center flex-pack-justify">
      <section class="commuinty-logo">
        <dp-logo></dp-logo>        
        <section>{{ $store.state.res.name }}</section>
      </section>
      <section class="community-desc">
        <section>用心写出有态度，有深度，有高度的文章</section>
        <section>请关注我们把～</section>
      </section>
      <dp-focus :tjFocus="tjFocus"></dp-focus>
    </section>
    <section class="split-box"></section>    
    <section v-if="group.data && group.data.length>0" class="member">
      <section class="flex flex-align-center flex-pack-justify">
        <span class="title">正在招募的群组</span>
        <span class="more-group">更多群组 ></span>
      </section>
      <ul :class="{
                group: true, 
                flex: true, 
                'flex-v': true
            }">
        <li v-for="(item, index) in group.data" :key="index" @click="downApp" class="flex flex-align-start">
          <img class="avatar" v-lazy="$com.makeFileUrl(item.group.avatar)">
          <section class="info flex flex-v">
            <span class="name">{{ item.group.name }}</span>
            <span class="desc">{{ JSON.parse(item.group.description)[0].content }}</span>
          </section>
        </li>
      </ul>
    </section>
    <section class="nothing-group" v-else>
      <p>本栏目暂不开放招新</p>
      <p>可通过投稿申请建群～</p>
    </section>
    <section class="common-feed">
      <dp-feed v-if="$store.state.feed_list.length > 0"></dp-feed>
      <no-thing v-else></no-thing>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import noThing from "~/components/nothing";
import dpFocus from "~/components/dpfocus";
import dpLogo from "~/components/dplogo";

export default {
  async asyncData({ app, error, params, store, query }) {
    try {
      // 分享后校验adid是否存在
      if (query && query.adid) {
        store.commit("SET_ADID", query.adid);
      } else {
        store.commit("SET_ADID", "");
      }
      let para = {
        communityid: params.communityid
      };
      // 获取栏目详情
      let community = await app.$axios.$get(
        `${api.community.show}?communityid=${params.communityid}`
      );
      if (community.code === 0) {
        // 设置communityid到res状态
        store.commit("SET_RES", community.result);
        // 关注状态
        if (community.result.isFollowed) {
          store.commit("SET_FOCUS_STAT", community.result.isFollowed);
        }
        community.result.communityid = params.communityid;
        return {
          res: {
            community: community.result
          }
        };
      }
    } catch (err) {
      error({ message: `${err}` });
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
    noThing,
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
      id: ""
    };
  },
  methods: {
    // h5下载补丁
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: self.$store.state.h5Adid || "closer-share" // 栏目id
      });
      if (result) {
        if (self.$route.path.indexOf("/community") > -1) {
          location.href = `${api.downHost}?downurl=closer://community/${
            self.$route.params.id
          }`;
        } else if (self.$route.path.indexOf("/feed") > -1) {
          location.href = `${api.downHost}?downurl=closer://feed/${
            self.$route.params.id
          }`;
        } else if (self.$route.path.indexOf("/group") > -1) {
          location.href = `${api.downHost}?downurl=closer://group/${
            self.$route.params.id
          }`;
        } else {
          location.href = `${api.downHost}`;
        }
      }
    },
    // 获取贴子列表
    async getFeedList() {
      let self = this;
      let feed = await self.$axios.$get(
        `${api.community.community_subject_list_index}?communityid=${
          self.$route.params.communityid
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
      }
    },
    // 获取群组列表
    async getGroupList() {
      let self = this;
      let group = await self.$axios.$get(
        `${api.group.recruiting}?communityid=${
          self.$route.params.communityid
        }&pagenum=1&count=5`
      );
      if (group.code === 0) {
        console.log("self.group==", group.result);
        self.group = group.result;
      }
    },
    // 关注
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
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
            // url: `${location.protocol}//${
            //   location.hostname
            // }/redirect?redirectUrl=${location.protocol}//${location.hostname}${
            //   self.$route.path
            // }`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  },
  beforeMount() {
    let self = this;
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
.cover {
  position: relative;
}
.cover-title {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 80%;
  text-align: center;
}
.feeder-img {
  position: relative;
  width: 100%;
  height: 124vw;
  background-size: 100% 100%;
  background-repeat: no-repeat;
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
  color: @textcolor;
  margin-bottom: @m15 * 4;
}
</style>
