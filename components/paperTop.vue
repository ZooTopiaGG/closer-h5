<template>
  <section class="paper" v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 2">
    <section  class="paper_con" v-if="$store.state.not_closer_app">
      <section v-if="!$store.state.version_1_3" class="feeder-title feeder-title-2 feeder-title-3">
        <span class="call_papers_1_4" v-if="$store.state.version_1_4 || $store.state.not_closer_app">
          <span>话题</span>
        </span>
        <span class="call_papers_title_1_4">{{ $store.state.res.releaseSubjectTitle }}</span>
      </section>
      <section class="flex flex-align-center flex-pack-justify">
        <section class="paper-add flex flex-align-center" @click="firstLogin">
          <i></i><span>参与</span>
        </section>
        <section class="paper-look flex flex-align-center" @click="backToPaper">
          <span>查看话题全部内容</span><i></i>
        </section>
      </section>
      <section class="split-line"></section>
    </section>
    <section class="content flex flex-align-center flex-pack-justify">
      <section class="content-info flex flex-align-center">
        <i class="avatar" v-if="$store.state.res.user.attributes && $store.state.res.user.attributes.roster" v-lazy:backgroundImage="$com.makeFileUrl($store.state.res.user.attributes.roster.avatar)"></i>
        <i class="avatar" v-else v-lazy:backgroundImage="$com.makeFileUrl($store.state.res.user.avatar)"></i>
        <span v-if="$store.state.res.user.attributes && $store.state.res.user.attributes.roster">{{ $store.state.res.user.attributes.roster.name }}</span>
        <span v-else>{{ $store.state.res.user.fullname }}</span>
      </section>
      <section class="content-time">
        {{ $com.getCommonTime($store.state.res.long_publish_time, 'yy-mm-dd hh:MM') }} 
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    backToPaper() {
      this.$router.push({
        path: `/feed/${this.$store.state.res.release_subjectid}`
      });
    },
    // 需要登录的操作 先判断后执行
    async firstLogin() {
      let self = this;
      await self.$store.commit(
        "SET_EXTENSION_TEXT",
        "participate_papers_topic"
      );
      // 渲染页面前 先判断cookies token是否存在
      let t = self.$store.state.token
        ? self.$store.state.token
        : Cookie.get("token");
      if (t) {
        self.downApp("", "participate_papers_topic");
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          await self.$com.down_statistics({
            store: self.$store,
            route: self.$route,
            str: "",
            defaultStr: "papers_topic",
            redirectUrl: "wx"
          });
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${
              location.hostname
            }?from=paper&articleid=${self.$route.params.id}`
          });
        } else {
          self.$store.commit("GET_LOGIN_TYPE", "toDown");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 纯下载
    async downApp(e, str) {
      let self = this,
        redirectUrl;
      if (str == "participate_papers_topic") {
        redirectUrl = `${location.protocol}//${location.host}?from=paper`;
      } else if (str === "papers_topic") {
        redirectUrl = `closer://feed/${self.$route.params.id}?from=paper`;
      }
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "papers_topic",
        redirectUrl
      });
    }
  }
};
</script>
<style scoped lang="less">
@m3: 3vw;
@m32: 3.2vw;
@br: 5px;
@newBase: 2vw;
.paper {
  padding: 0 @m32;
  position: relative;
  z-index: 99;
  background: #fff;
  .feeder-title {
    font-size: 19px;
    font-weight: bold;
    margin-bottom: @m32;
    position: relative;
    .call_papers_1_4 {
      display: inline-block;
      padding: 0 10px;
      line-height: 38px;
      background: #e9e9e9;
      font-size: 20px;
      border-radius: @br;
      position: absolute;
      left: -14px;
      top: -6px;
      transform: scale(0.5);
    }
    .call_papers_title_1_4 {
      margin-left: 40px;
    }
  }
  .paper-add {
    font-size: 14px;
    padding: @m32 / 2 @m32;
    border: 1px solid #dedede;
    border-radius: @br;
    i {
      width: @m3;
      height: @m3;
      background: url("../assets/images/Write_Message@2x.png") no-repeat;
      background-size: cover;
      margin-right: 1vw;
    }
  }
  .paper-look {
    font-size: 14px;
    i {
      width: 1.6vw;
      height: 2.93vw;
      background: url("../assets/images/right-arrow@2x.png") no-repeat;
      background-size: cover;
      margin-left: 1vw;
    }
  }
  .split-line {
    border: 1px solid #f5f5f5;
    margin-top: 4.26vw;
  }
  .content {
    padding: @m32 0 @m32 / 2;
    font-size: 14px;
    .content-info {
      i {
        width: @newBase * 4;
        height: @newBase * 4;
        border-radius: 100%;
        margin-right: @newBase;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .content-time {
      color: #94928e;
    }
  }
}
@media screen and (min-width: 681px) {
  @p16: 16px;
  .paper {
    padding: 0 @p16;
    .paper_con {
      .feeder-title {
        margin-bottom: @p16;
      }
      .paper-add {
        padding: @p16 / 2 @p16;
        i {
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
      .paper-look {
        i {
          width: 8px;
          height: 14px;
          margin-left: 5px;
        }
      }
      .split-line {
        margin-top: 20px;
      }
    }
    .content {
      padding: @p16 0 @p16 / 2;
      .content-info {
        i {
          width: 60px;
          height: 60px;
          margin-right: @p16 - 6px;
        }
      }
    }
  }
}
</style>

