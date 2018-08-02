<template>
  <section class="tomessage">
    <section class="message-content">
      <span>{{ title }}</span>
    </section>
    <section class="input-message">
      <textarea name="textarea" class="mint-field" placeholder="发表你的意见吧～" v-model="textarea"></textarea>
      <mt-button type="primary" @click="toMessage">留 言</mt-button>
    </section>
    <section id="emoji"></section>
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
      let self = this;
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
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        if (JSON.parse(Cookie.get("user")).phones) {
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
      let self = this;
      // 验证code是否存在
      if (self.$route.query.code) {
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
    let s, l;
    l = document.createElement("link");
    l.href =
      "https://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/css/basic/emojify.min.css";
    l.rel = "stylesheet";
    l.type = "text/css";
    document.head.appendChild(l);
    s = document.createElement("script");
    s.src =
      "https://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/js/emojify.min.js";
    document.body.appendChild(s);
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
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        emojify.setConfig({
          tag_type: "section", // Only run emojify.js on this element
          only_crawl_id: null, // Use to restrict where emojify.js applies
          img_dir: "images/emoji", // Directory for emoji images
          ignored_tags: {
            // Ignore the following tags
            SCRIPT: 1,
            TEXTAREA: 1,
            A: 1,
            PRE: 1,
            CODE: 1
          }
        });
        console.log("emojify====", emojify);
        emojify.run();
      }, 1000);
    });
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
