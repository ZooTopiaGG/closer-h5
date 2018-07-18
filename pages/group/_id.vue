<template>
  <section id="group" :class="{  
        flex:true,
        groups: true,
        commonbox: true,
        'flex-v':true }">
    <section class="member">
      <section class="title">群组成员 {{ $store.state.group_info.group_user_info.length + 1 }}</section>
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
      <section class="more-member" @click="firstLogin">查看更多群成员 <i class="down-arrow"></i></section>
    </section>
    <section class="intro" v-if="$store.state.group_info.group_info && JSON.parse($store.state.group_info.group_info.group.description)[0].content">
      <section class="title flex flex-align-center flex-pack-justify">
        <span>群简介</span>
        <i class="right-arrow"></i>
      </section>
      <section class="content">
        <p class="text-ellipse">{{ JSON.parse($store.state.group_info.group_info.group.description)[0].content }}</p>
      </section>
    </section>
    <section class="intro" v-if="$store.state.group_info.group_info && JSON.parse($store.state.group_info.group_info.announcement)[0].content">
      <section class="title flex flex-align-center flex-pack-justify">
        <span>当前话题</span>
        <i class="right-arrow"></i>
      </section>
      <section class="content">
        <p class="text-ellipse">{{ JSON.parse($store.state.group_info.group_info.announcement)[0].content }}</p>
      </section>
    </section>
    <section class="split-box"></section>
    <section class="title group-community flex flex-pack-justify flex-align-center" v-if="$store.state.feed_list.length > 0 && $store.state.feed_list[0].blogo && $store.state.feed_list[0].communityName">
      <span>所属贴近号</span>
      <section class="group-logo flex flex-align-center">
        <img :src="$store.state.feed_list[0].blogo">
        <span>{{ $store.state.feed_list[0].communityName }}</span>
        <i class="right-arrow"></i>
      </section>
    </section>    
    <section class="works flex-1">
      <dp-feed v-if="$store.state.feed_list.length > 0"></dp-feed>
      <no-thing v-else></no-thing>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import noThing from "~/components/nothing";
export default {
  middleware: "group",
  components: {
    noThing
  },
  data() {
    return {
      id: ""
    };
  },
  methods: {
    tofeeddetails(item) {
      location.href = `/feed/${item.subjectid}`;
    },
    // 先登录 再下载流程
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
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
    }
  },
  beforeMount() {
    let self = this;
    // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        type: "else"
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@m15: 2vw;
.groups {
  overflow-x: hidden;
  .member,
  .intro {
    padding: 0 @m20 @m20;
    padding-top: @m20 * 2;
  }
  .title {
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
  .lookGroup {
    height: auto;
    overflow-y: auto;
  }
  .more {
    margin: @m15*2 0 @m20;
  }
  .down-arrow {
    display: inline-block;
    width: 2.4vw;
    height: 2.4vw;
    background: url("~/assets/images/Shape2@2x.png") no-repeat;
    background-size: cover;
    margin-left: @m20 / 2;
  }
  .right-arrow {
    width: 1.8666vw;
    height: 0.9333vw;
    min-width: 7px;
    min-height: 14px;
    background: url("~/assets/images/back5@2x.png") no-repeat;
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
    background: url("~/assets/images/group_icon_tags_n@2x.png") no-repeat;
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
    padding: 0 @m20 * 2;
    box-sizing: border-box;
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
    width: 18.9vw;
    height: @m15 * 4;
    border-radius: 5px;
    margin-right: @m20;
  }
}
</style>
