<template>
  <section id="group" :class="{  
        flex:true,
        groups: true,
        commonbox: true,
        'flex-v':true }">
    <section class="member">
      <section class="group-title">群组成员 {{ $store.state.group_info.group_user_count }}</section>
      <ul :class="{
                group: true, 
                flex: true, 
                'flex-align-center': true
            }">
        <li v-if="$store.state.group_info.group_info.group" style="position:relative;" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl($store.state.group_info.group_info.group.attributes.monitor.user.avatar)">
          <p class="group-master flex flex-align-center flex-pack-center">
            <span>群主</span>
          </p>
          <span class="ellipsis">{{ $store.state.group_info.group_info.group.attributes.monitor.user.fullname }}</span>
        </li>
        <li v-for="(item, index) in $store.state.group_info.group_user_info" :key="index" v-if="index < 4" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.props.roster.avatar)">
          <span class="ellipsis">{{ item.props.roster.name }}</span>
        </li>
      </ul>
      <section class="more-member" v-if="$store.state.group_info.group_user_count > 5" @click="firstLogin">查看更多群成员 <i class="down-arrow"></i></section>
    </section>
    <section class="intro" v-if="$store.state.group_info.group_info && description">
      <section class="group-title flex flex-align-center flex-pack-justify">
        <span>群简介</span>
        <i class="right-arrow"></i>
      </section>
      <section class="content">
        <p class="text-ellipse" :style="$store.state.text_overflow_3">{{ description }}</p>
      </section>
    </section>
    <section class="intro" v-if="$store.state.group_info.group_info && announcement">
      <section class="group-title flex flex-align-center flex-pack-justify">
        <span>当前话题</span>
        <i class="right-arrow"></i>
      </section>
      <section class="content">
        <p class="text-ellipse" :style="$store.state.text_overflow_3">{{ announcement }}</p>
      </section>
    </section>
    <section class="split-box"></section>
    <section class="group-title group-community flex flex-pack-justify flex-align-center" v-if="$store.state.feed_list.length > 0 && $store.state.feed_list[0].blogo && $store.state.feed_list[0].communityName">
      <span>所属贴近号</span>
      <section class="group-logo flex flex-align-center" @click="toCommunity">
        <img v-lazy="$store.state.feed_list[0].slogo">
        <span>{{ $store.state.feed_list[0].communityName }}</span>
        <i class="right-arrow"></i>
      </section>
    </section>    
    <section class="works flex-1">
      <dp-feed v-if="$store.state.feed_list.length > 0" :title="title" :feed-list="group_feed_list"></dp-feed>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  head() {
    return {
      title: `贴近 - TieJin.cn - ${this.$store.state.group_info.group_info
        .name || ""}`
    };
  },
  async fetch({ app, error, params, store }) {
    let para2 = {
      groupId: params.id
    };
    try {
      // 获取群组信息
      let data2 = await app.$axios.$post(`${api.group.share_group}`, para2);
      if (data2.code === 0) {
        let monitor_uid = data2.result.group_info
          ? data2.result.group_info.group.attributes.monitor.uid
          : "";
        store.commit("SET_GROUP_INFO", data2.result);
        store.commit("SET_RES", {
          communityid: data2.result.group_info.communityid
        });
      } else {
        error({
          message: `错误代码:${data2.code}, ${data2.result}`
        });
      }
    } catch (err) {
      error({
        message: `${err}`
      });
    }
  },
  computed: {
    description() {
      try {
        return JSON.parse(
          this.$store.state.group_info.group_info.group.description
        )[0].content;
      } catch (e) {
        return this.$store.state.group_info.group_info.group.description;
      }
    },
    announcement() {
      try {
        return JSON.parse(
          this.$store.state.group_info.group_info.announcement
        )[0].content;
      } catch (e) {
        return this.$store.state.group_info.group_info.announcement;
      }
    }
  },
  data() {
    return {
      id: "",
      group_feed_list: [],
      title: "群作品"
    };
  },
  methods: {
    toCommunity() {
      this.$router.push({
        path: `/community/${this.$store.state.res.communityid}`
      });
    },
    async getGroupFeedList() {
      let self = this;
      let para = {
        flag: 1,
        classid: self.$route.params.id,
        index: "",
        pagesize: 5
      };
      // 获取 feed列表
      let data = await self.$axios.$post(
        `${api.group.group_subject_list}`,
        para
      );
      if (data.code === 0) {
        let arr = await data.result.data.map(x => {
          x.content = JSON.parse(x.content);
          return x;
        });
        // 没有群作品 则显示栏目贴子
        if (arr.length > 0) {
          self.$store.commit("SET_FEED_LIST", arr);
          self.group_feed_list = arr;
          self.title = "群作品";
        } else {
          self.getFeedList();
        }
      }
    },
    // 获取贴子列表
    async getFeedList() {
      let self = this;
      let feed = await self.$axios.$get(
        `${api.community.community_subject_list_index}?communityid=${
          self.$store.state.res.communityid
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
        self.group_feed_list = arr;
        self.title = "热门文章";
      }
    },
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
      self.$store.commit("SET_EXTENSION_TEXT", "more_group_member");
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
    // h5下载补丁
    async downApp(e, str) {
      let self = this;
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "more_group_member"
      });
    },
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
        self.$store.dispatch("get_code_by_login", {
          code: self.$route.query.code,
          type: "else"
        });
      }
    }
  },
  beforeMount() {
    this.focusWxLogin();
    this.getGroupFeedList();
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      if (self.$store.state.not_closer_app) {
        let title, pic, desc;
        // 分享群组
        if (
          self.$store.state.group_info.group_info &&
          self.$store.state.group_info.group_info.group
        ) {
          let group = self.$store.state.group_info.group_info.group;
          title = group.name ? group.name : "贴近群组";
          if (group.description) {
            let description;
            try {
              description = JSON.parse(
                self.$store.state.group_info.group_info.group.description
              );
              desc = description[0].content
                ? description[0].content
                : "贴近一点 看身边";
            } catch (e) {
              desc = self.$store.state.group_info.group_info.group.description;
            }
          } else {
            desc = "贴近一点 看身边";
          }
          pic = self.$com.makeFileUrl(group.avatar);
        }
        // 微信二次分享
        self.$store.dispatch("wx_share", {
          title: title,
          desc: desc,
          pic:
            pic ||
            "https://file.tiejin.cn/public/aoBcuPCJ98/login_logo%402x.png"
        });
      }
    });
  }
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@m15: 1.6vw;
.groups {
  overflow-x: hidden;
  .member,
  .intro {
    padding: 0 @m20 @m20;
    padding-top: @m20 * 2;
  }
  .group-title {
    margin-bottom: @m20;
    font-size: 16px;
    margin-left: @m15;
    position: relative;
  }
  .content {
    padding: 0 @m15 @m15;
    text-align: justify;
    font-size: 14px;
    color: #808080;
    p {
      margin-bottom: 0;
      line-height: 1.6;
    }
  }
  .works {
    position: relative;
    padding-bottom: 14.4vw;
    .title {
      margin-left: 4.67vw;
    }
  }

  .group {
    flex-wrap: wrap;
    max-height: @m20 * 20;
    overflow: hidden;
    li {
      width: 20%;
      margin-bottom: @m15;
      height: @m20 * 10;
      box-sizing: border-box;
      > span {
        font-size: 13px;
        text-align: center;
        width: 18.67vw;
        height: 24px;
        line-height: 24px;
        overflow: hidden;
      }
      > img {
        width: 13.35vw;
        height: 13.35vw;
        display: block;
        border-radius: 100%;
        margin-bottom: @m20 / 2;
      }
    }
  }
  .more {
    margin: @m15*2 0 @m20;
  }
  .down-arrow {
    display: inline-block;
    width: 2.4vw;
    height: 2.4vw;
    background: url("../../assets/images/Shape2@2x.png") no-repeat;
    background-size: cover;
    margin-left: @m20 / 2;
  }
  .right-arrow {
    width: 1.8666vw;
    height: 0.9333vw;
    min-width: 7px;
    min-height: 14px;
    background: url("../../assets/images/back5@2x.png") no-repeat;
    background-size: cover;
    margin-left: @m20;
  }
  .group-master {
    width: 11.2vw;
    height: 11.2vw;
    max-width: 84px;
    max-height: 84px;
    position: absolute;
    left: 0;
    top: 0;
    background: url("../../assets/images/group_icon_tags_n@2x.png") no-repeat;
    background-size: cover;
    margin-left: -2px;
    margin-top: -2px;
    span {
      font-size: 10px;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      color: #fff;
      display: block;
      margin-left: 2px;
    }
  }
  .group-community {
    height: 18.67vw;
    margin: 0;
    padding: 0 @m20;
    box-sizing: border-box;
    > span {
      width: 30vw;
      min-width: 30vw;
    }
  }
  .more-member {
    text-align: center;
    color: #507caf;
    font-size: 14px;
  }
  .group-logo {
    font-size: 14px;
  }
  .group-logo > img {
    width: 10vw;
    height: 10vw;
    border-radius: 5px;
    margin-right: @m20;
  }
}
</style>
