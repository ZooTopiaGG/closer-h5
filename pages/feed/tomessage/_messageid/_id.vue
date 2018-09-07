<template>
  <section class="tomessage">
    <section class="message-content">
      <span>{{ title }}</span>
    </section>
    <section class="input-message">
      <textarea name="textarea" class="mint-field" placeholder="发表你的意见吧～" v-model="textarea"></textarea>
      <mt-button type="primary" @click="toMessage">留 言</mt-button>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
export default {
  head() {
    return {
      title: `贴近 - TieJin.cn`
    };
  },
  data() {
    return {
      textarea: "",
      title: ""
    };
  },
  methods: {
    // 留言操作
    async toMessage() {
      let self = this,
        tk,
        user,
        s = JSON.parse;
      self.$store.commit("SET_EXTENSION_TEXT", "message");
      if (self.textarea) {
        window.sessionStorage.setItem("textarea", self.textarea);
      } else {
        self.$toast({
          message: "内容不能为空！",
          position: "top"
        });
        return false;
      }
      try {
        tk = Cookie.get("token") || self.$store.state.token;
        user = Cookie.get("user") || self.$store.state.auth;
      } catch (e) {
        tk = "";
        user = "";
      }
      // 渲染页面前 先判断cookies token是否存在
      if (tk) {
        if (s(user).phones) {
          let para;
          if (self.$route.params.id) {
            para = {
              subjectid: self.$route.params.messageid,
              content: self.textarea,
              lastid: self.$route.params.id
            };
          } else {
            para = {
              subjectid: self.$route.params.messageid,
              content: self.textarea
            };
          }
          self.$store.dispatch("sure_message", para);
        } else {
          // 唤起绑定手机流程
          self.$store.commit("GET_LOGIN_TYPE", "toMessageBind");
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      } else {
        self.$store.commit("GET_LOGIN_TYPE", "toMessage");
        // 显示登录弹窗
        self.$store.commit("SET_VISIBLE_LOGIN", true);
      }
    },
    // 登录
    async beforeWxLogin() {
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
          let para;
          if (self.$route.params.id) {
            para = {
              subjectid: self.$route.params.messageid,
              content: window.sessionStorage.getItem("textarea"),
              lastid: self.$route.params.id
            };
          } else {
            para = {
              subjectid: self.$route.params.messageid,
              content: window.sessionStorage.getItem("textarea")
            };
          }
          // await self.$store.dispatch("sure_message", para);
        }
      }
    }
  },
  beforeMount() {
    if (window.sessionStorage.getItem("title")) {
      this.title = window.sessionStorage.getItem("title");
    } else {
      this.title =
        this.$store.state.res.int_type === 2
          ? this.$store.state.res.title
          : this.$store.state.content.text;
    }
    if (window.sessionStorage.getItem("textarea")) {
      this.textarea = window.sessionStorage.getItem("textarea");
    }
    this.beforeWxLogin();
  }
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@textcolor: #4b4945;
.tomessage {
  padding: @m20 * 2;
  .message-content {
    margin-bottom: @m20 * 2;
    font-size: 18px;
    text-align: justify;
  }
  .input-message {
    .mint-field {
      margin-bottom: @m20 * 2;
      height: 35.73vw;
      background: #f8f8f8;
      box-sizing: border-box;
      width: 100%;
      border: 0;
      outline: 0;
      padding: @m20;
      line-height: 1.6;
      font-size: 14px;
      color: @textcolor;
    }
    .mint-button {
      width: 100%;
    }
  }
}
</style>
