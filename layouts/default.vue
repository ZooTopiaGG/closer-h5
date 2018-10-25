<template>
  <section class="default__box">
    <section :class="{
      default_init_box: true,
      hasControlVideo: !$store.state.isPre
    }" v-if="$store.state.exist">
      <nav v-if="$store.state.not_closer_app && $store.state.webNoNav && !($route.path.indexOf('feed/tomessage') > -1)" 
        :class="{
          webNoNav: !$store.state.webNoNav,
          flex: true,
          'flex-v': true,
          'flex-pack-center': true
        }">
        <top-nav></top-nav>
      </nav>
      <section class="layer" v-if="$store.state.not_closer_app">
        <img :src="defaultImg" v-lazy="require('~/assets/images/1531133203.png')" alt="">
        <section>手机扫一扫</section>
        <section>下载贴近App</section>
      </section>
      <section id="wrapper"
        :class="{ 
        'web-class': $store.state.not_closer_app, 
        isLongVideo: $store.state.isLongVideo,
        nuxts:true, 
        webNoNav: !$store.state.webNoNav || ($route.path.indexOf('feed/tomessage') > -1),
        appnuxts: !$store.state.not_closer_app }">
        <keep-alive>
          <nuxt/>
        </keep-alive>
      </section>
      <footer class="footer-group">
        <bottom-nav v-if="$route.path.indexOf('group') > -1"></bottom-nav>
      </footer>
    </section>
    <section v-else>
      <not-find></not-find>
    </section>
    <section class="tj-dialog" @click.self="hiddenLogin" v-if="$store.state.visibleLogin">
      <dp-login :isAbsolute="$store.state.get_login_type"></dp-login>
    </section>
    <section class="tj-dialog" @click.self="hiddenConfirm" v-if="$store.state.confirm_stat">
      <dp-confirm></dp-confirm>
    </section>
    <section class="tj-dialog" @click.self="hiddenAlert" v-if="$store.state.alert_stat">
      <dp-alert></dp-alert>
    </section>
    <section v-if="preShow" style="overflow: auto; height: 100vh;">
      <preview-list :preview-list="imgList" :preview-index="preIndex" v-on:preview-show="listenToMyChild"></preview-list>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import previewList from "~/components/preview.vue";
import topNav from "~/components/topnav.vue";
import dpConfirm from "~/components/dpconfirm.vue";
import dpAlert from "~/components/dpalert.vue";
import bottomNav from "~/components/bottomnav.vue";
import notFind from "~/components/notfind.vue";

export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      col: "#333",
      scrollnav: false,
      exist: true,
      imgList: [],
      preIndex: 0,
      preShow: false,
      scrollTimer: 0,
      feedType: "read",
      progress: 0,
      objectType: "article",
      oldScrollY: 0,
      scrollDirection: "",
      scrollAction: {}
    };
  },
  components: {
    previewList,
    topNav,
    dpConfirm,
    dpAlert,
    bottomNav,
    notFind
  },
  methods: {
    // 监听图片预览组件的子组件传来的状态 是否关闭预览
    listenToMyChild(somedata) {
      this.preShow = somedata;
    },
    // 隐藏登录组件
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    // 隐藏alert组件
    hiddenAlert() {
      this.$store.commit("SHOW_ALERT", false);
    },
    // 隐藏confirm组件
    hiddenConfirm() {
      this.$store.commit("SHOW_CONFIRM", false);
    }
  },
  beforeMount() {
    let self = this;
    this.$store.commit("SET_ENTER_TIME", Date.now());
    if (typeof window != "undefined") {
      self.$store.commit("GET_VERSION");
      if (
        self.$store.state.not_closer_app ||
        self.$route.path.indexOf("/invite") > -1
      ) {
        // 网易e盾验证
        self.$com.createScript("https://cstaticdun.126.net/load.min.js", "");
        // 动态添加微信配置文件
        self.$com.createScript(
          "https://res.wx.qq.com/open/js/jweixin-1.2.0.js",
          "defer"
        );
        // 存会话 h5Adid
        if (self.$store.state.h5Adid) {
          Cookie.set("h5Adid", self.$store.state.h5Adid, {
            expires: 30
          });
        } else {
          Cookie.set("h5Adid", "");
        }
        // 设置 h5cookie埋点
        if (self.$store.state.h5Cookies) {
          Cookie.set("h5Cookies", self.$store.state.h5Cookies, {
            expires: 30
          });
        }
        // 如果用户已经登录，则异步刷新用户信息
        if (Cookie.get("user") && Cookie.get("token")) {
          self.$store.dispatch("refresh_user_info");
        }
      }
    }
  },
  mounted() {
    let self = this;
    if (self.$store.state.not_closer_app) {
      try {
        // 会影响性能～
        if (self.$store.state.res.int_type === 1) {
          self.feedType = "play";
          self.objectType = "video";
        } else {
          self.feedType = "read";
          self.objectType = "article";
        }
        let userId, h5cookie, title;
        if (Cookie.get("user")) {
          userId = JSON.parse(Cookie.get("user")).objectID;
        } else if (self.$store.state.auth) {
          userId = self.$store.state.auth.objectID;
        } else {
          userId = null;
        }
        if (Cookie.get("h5Cookies")) {
          h5cookie = Cookie.get("h5Cookies");
        } else if (self.$store.state.h5Cookies) {
          h5cookie = self.$store.state.h5Cookies;
        } else {
          h5cookie = null;
        }
        title =
          self.$store.state.res.title && self.$store.state.res.title != "title"
            ? self.$store.state.res.title
            : null;
        window.addEventListener("unload", function(event) {
          if (self.$store.state.res.int_type === 0) {
            self.progress = 1;
          } else if (self.$store.state.res.int_type === 1) {
            let progress2 =
              self.$store.state.current_time /
              self.$store.state.duration_time *
              1000;
            self.progress = progress2.toFixed(2) > 1 ? 1 : progress2.toFixed(2);
          } else {
            // 计算进度
            var sy =
              window.scrollY == 0
                ? window.scrollY
                : window.scrollY + window.innerHeight;
            if (document.querySelector(".feed-1")) {
              var dh = document.querySelector(".feed-1").offsetHeight;
            } else {
              return;
            }
            // 监听滚动最大值 如果比他小则是回滚 无需计算进度 否则计算进度
            if (self.oldScrollY < window.scrollY) {
              self.oldScrollY = window.scrollY;
              var sb = (sy / dh).toFixed(2);
              self.progress = sb > 1 ? 1 : sb;
            }
          }
          let data = {
            userId: userId,
            action: self.feedType,
            objectType: self.objectType,
            objectId: self.$store.state.res.subjectid || null,
            position: "detail",
            progress: self.progress,
            cookie: h5cookie,
            platform: "H5",
            attachPlatform: self.$store.state.nvgTypeToPowerCase,
            communityId: self.$store.state.res.communityid || null,
            title: title,
            time: Date.now(),
            cost: Date.now() - self.$store.state.enter_time || 0,
            totalTime: self.$store.state.duration_time || 0
          };
          let url = `${api.baseUrl}/closer_statistics.user_action_v2`;
          navigator.sendBeacon(url, JSON.stringify(data));
        });
      } catch (e) {}
    }
    self.$store.commit("GET_USER_AGENT", {
      nvg: navigator.userAgent,
      ref: location.href
    });
    self.$nextTick(() => {
      if (self.$store.state.not_closer_app) {
        let title, pic, desc, author;
        if (self.$route.path.indexOf("/community") > -1) {
          // 分享栏目主页
          title = self.$store.state.res.name
            ? self.$store.state.res.name
            : "栏目主页";
          desc = self.$store.state.res.description
            ? self.$store.state.res.description
            : "贴近一点 看身边";
          pic = self.$store.state.res.slogo
            ? self.$store.state.res.slogo
            : self.$store.state.res.blogo;
        } else if (self.$route.path.indexOf("/group") > -1) {
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
                desc =
                  self.$store.state.group_info.group_info.group.description;
              }
            } else {
              desc = "贴近一点 看身边";
            }
            pic = self.$com.makeFileUrl(group.avatar);
          }
        } else {
          let content = self.$store.state.content;
          // 分享长图文
          if (self.$store.state.res.int_type === 0) {
            // 图集
            if (content.text) {
              title = content.text;
            } else {
              title = "分享图片";
            }
            if (content.images && content.images.length > 0) {
              let d = content.images.map(x => {
                x = "[图片]";
                return x;
              });
              desc = d.join(" ");
              pic = self.$com.makeFileUrl(content.images[0].link);
            } else {
              desc = "[图片]";
              pic = "";
            }
          } else if (self.$store.state.res.int_type === 1) {
            // 视频
            if (content.text) {
              title = content.text;
            } else {
              title = "分享视频";
            }
            if (content.videos && content.videos.length > 0) {
              let d = content.videos.map(x => {
                x = "[视频]";
                return x;
              });
              desc = d.join(" ");
              pic = self.$com.makeFileUrl(content.videos[0].imageUrl);
            } else {
              desc = "[视频]";
              pic = "";
            }
          } else {
            // 长图文
            if (self.$store.state.res.title) {
              title = self.$store.state.res.title;
            } else if (content.text) {
              title = content.text;
            } else {
              title = content.summary;
            }
            pic = self.$com.makeFileUrl(self.$store.state.res.cover)
              ? self.$com.makeFileUrl(self.$store.state.res.cover)
              : self.$com.makeFileUrl(self.$store.state.res.bigcover);
            // 征稿
            if (self.$store.state.res.int_category === 1) {
              desc =
                self.$store.state.res.commentNumber > 0
                  ? `贴近号：${self.$store.state.res.communityName.substring(
                      0,
                      10
                    )}\n${self.$store.state.res.commentNumber} 参与`
                  : `贴近号：${self.$store.state.res.communityName.substring(
                      0,
                      10
                    )}`;
            } else {
              desc = content.summary
                ? content.summary.substring(0, 24)
                : "分享文章";
            }
          }
          author = `贴近 @${self.$store.state.res.user.attributes.roster.name ||
            self.$store.state.res.user.fullname.substring(0, 6)} 出品`;
          desc = `${desc}\n${author}`;
        }
        // 微信二次分享
        self.$store.dispatch("wx_share", {
          title: title,
          desc: desc,
          pic: pic
        });
        // 在浏览器可以点击图片预览
        let preimg;
        if (document.querySelector(".feed-1")) {
          preimg = document
            .querySelector(".feed-1")
            .querySelectorAll("img[data-index]");
        } else {
          return;
        }
        if (preimg) {
          var imgList = [];
          // 遍历查找出来的元素type HTMLCOLLECTION
          Array.prototype.forEach.call(preimg, (x, i) => {
            if (x.dataset.index && x.dataset.src) {
              imgList.push({
                current: {
                  src: x.dataset.src
                },
                index: i
              });
              // 监听点击图片事件 闭包
              preimg[i].onclick = (function() {
                return function() {
                  self.preIndex = i;
                  self.preShow = true;
                };
              })(i);
            }
          });
          self.imgList = imgList;
        }
      }
    });
  }
};
</script>
<style>
nav {
  width: 100%;
  height: 13.07vw;
  max-width: 680px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
}

nav .icon-ios-more {
  color: #495060;
}

nav .communityName {
  color: #495060;
  font-size: 15px;
  margin-right: 5px;
  overflow-y: hidden;
}
.footer-group {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 100;
}
.nuxts {
  margin-top: 13.07vw;
  overflow-x: hidden;
}
.webNoNav {
  margin-top: 0;
}
.isLongVideo {
  margin-top: 0;
  background: #fff;
}
.isLongVideo .feeder-cover {
  margin-top: -16.67vw;
  position: relative;
  z-index: 9;
  background: #fff;
}

.isLongVideo .feeder-type-1 {
  position: relative;
  z-index: 9;
  background: #fff;
}

.appnuxts {
  margin-top: 0;
}

.icon-ios-more {
  font-size: 28px;
  margin-left: 5.33vw;
  margin-right: 2.67vw;
}

.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.not-exist img {
  width: 21.6vw;
  height: 21.07vw;
  margin-bottom: 1.6vw;
}
.feed-h5-videos {
  width: 100%;
  height: 56.25vw;
  box-shadow: 0 1px 5px #efefef;
}
.feed-h5-videos-player {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
  background: #333;
}
.focus-icon {
  font-size: 17px;
  margin-right: 2px;
  position: relative;
  bottom: -1px;
}
.layer {
  display: none;
}
@media screen and (min-width: 681px) {
  .circle-btn,
  .default__box nav {
    display: none;
  }
  .nuxts {
    margin-top: 0;
  }
  /* 悬浮层 */
  .layer {
    position: fixed;
    top: 20px;
    right: calc((100vw - 680px) / 2 - 160px);
    color: #717375;
    width: 140px;
    height: 180px;
    border: 1px solid #d9dadc;
    padding: 16px;
    box-sizing: border-box;
    text-align: center;
    display: block;
  }
  .layer img {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
}
</style>

