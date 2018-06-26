<template>
  <div class="default__box" >
    <div v-if="$store.state.exist">
      <nav v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoNav" 
        :class="{
          appnav: $store.state.res.int_type === 2 || $route.path.indexOf('/community')>-1,
          scrollnav: scrollnav,
          webNoNav: !$store.state.webNoNav,
          flex: true,
          'flex-v': true,
          'flex-pack-center': true
        }">
        <div class="feeder-cover flex flex-align-center flex-pack-justify">
          <div class="flex flex-1 flex-align-center" @click="toCommunity">
            <img class="access-not" :src="defaultImg" :data-original="$store.state.res.blogo">
            <span class="communityName ellipsis">{{ $store.state.res.communityName }}</span>
          </div>
          <div class="flex flex-align-center">
            <mt-button  @click="tjFocus" :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn cursor">
              <span v-if="$store.state.is_follow">已关注</span>
              <span v-else>
                <span class="icon-font icon-add" style="font-size:14px; margin-right: 2px;"></span>
                <span>关注</span>
              </span>
            </mt-button>
          </div>
        </div>
      </nav>
      <div v-if="$store.state.res.int_type === 1 && $route.path.indexOf('/feed')>-1" class="feed-h5-videos">
        <video :src="$store.state.content.videos[0].src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true"
          x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-orientation="portraint" x5-playsinline="true" x5-video-player-fullscreen="h5" class="feed-h5-videos-player" :poster="$store.state.content.videos[0].imageUrl" :data-cover="$store.state.content.videos[0].imageUrl">
        </video>
      </div>
      <div id="wrapper" 
      :class="{ 
        'web-class': $store.state.GET_MESSAGE_STATE, 
        nuxts:true, 
        webNoNav: !$store.state.webNoNav,
        appnuxts: !$store.state.GET_MESSAGE_STATE }">
        <keep-alive>
          <nuxt/>
        </keep-alive>
      </div>
      <div v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoFooter" class="open-footer cursor">
        <mt-button type="primary" size="small" @click="downApp" class="circle-btn">
          贴近内打开
        </mt-button>
      </div>
    </div>
    <div class="not-exist flex flex-v flex-align-center" v-else>
      <img src="~/assets/images/home_icon_delete@2x.png" alt="">
      <span>此贴子已被删除</span>
    </div>
    <div class="tj-dialog" @click.self="hiddenLogin" v-if="$store.state.visibleLogin">
      <dp-login></dp-login>
    </div>
    <div v-if="preShow" style="overflow: auto; height: 100vh;">
      <preview-list :preview-list="imgList" :preview-index="preIndex" v-on:preview-show="listenToMyChild"></preview-list>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import previewList from "~/components/preview.vue";
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGeCAMAAAD8CXSkAAADI2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDZCMEUyODM2MEQ4MTFFODhBMUFDMUM4QjcwODkzNzAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDZCMEUyODQ2MEQ4MTFFODhBMUFDMUM4QjcwODkzNzAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NkIwRTI4MTYwRDgxMUU4OEExQUMxQzhCNzA4OTM3MCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0NkIwRTI4MjYwRDgxMUU4OEExQUMxQzhCNzA4OTM3MCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtwP1jAAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAS1BMVEXn5+f19fXu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",
      col: "#333",
      scrollnav: false,
      exist: true,
      imgList: [],
      preIndex: 0,
      preShow: false
    };
  },
  components: {
    previewList
  },
  methods: {
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: "closer-share"
      });
      if (result) {
        if (this.$route.path.indexOf("/community") > -1) {
          location.href = `${api.downHost}?downurl=closer://community/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/feed") > -1) {
          location.href = `${api.downHost}?downurl=closer://feed/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/group") > -1) {
          location.href = `${api.downHost}?downurl=closer://group/${
            this.$route.params.id
          }`;
        } else {
          location.href = `${api.downHost}`;
        }
      }
    },
    leave() {
      this.preshow = false;
    },
    openSrc(e) {
      if (e.target.dataset.index) {
        this.preIndex = e.target.dataset.index;
        this.preShow = true;
      } else {
        return;
      }
    },
    listenToMyChild(somedata) {
      this.preShow = somedata;
    },
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    handleScroll(e) {
      if (
        // 判断是否是长图文或者栏目主页 滚动显示导航背景
        (this.$route.path.indexOf("/feed") > -1 &&
          this.$store.state.res.int_type === 2) ||
        this.$route.path.indexOf("/community") > -1
      ) {
        if (e.target.scrollTop >= 80) {
          this.scrollnav = true;
        } else {
          this.scrollnav = false;
        }
      } else {
        return false;
      }
    },
    // 跳转栏目主页
    toCommunity() {
      location.href = `/community/${this.$store.state.res.communityid}`;
    },
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.res.communityid,
          flag: self.$store.state.is_follow ? 0 : 1
        });
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            url: `${location.protocol}//${location.hostname}${self.$route.path}`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  },
  beforeMount() {
    let self = this;
  },
  mounted() {
    let self = this;
    if (typeof window != "undefined") {
      self.$store.commit("GET_VERSION");
      // 动态添加微信配置文件
      if (self.$store.state.GET_MESSAGE_STATE) {
        let sct = document.createElement("script");
        sct.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
        document.body.appendChild(sct);
      }
    }
    if (self.$store.state.h5Cookies) {
      Cookie.set("h5Cookies", self.$store.state.h5Cookies);
    }
    self.$nextTick(() => {
      let title, pic, desc;
      if (self.$route.path.indexOf("/community") > -1) {
        // 分享栏目主页
        title = self.$store.state.res.name
          ? self.$store.state.res.name
          : "栏目主页";
        desc = self.$store.state.res.description
          ? self.$store.state.res.description
          : "贴近一点看身边";
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
            let description = JSON.parse(
              self.$store.state.group_info.group_info.group.description
            );
            desc = description.content ? description.content : "贴近一点看身边";
          } else {
            desc = "贴近一点看身边";
          }
          pic = group.avatar;
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
          desc = content.summary ? content.summary : "分享文章";
          pic = self.$com.makeFileUrl(self.$store.state.res.cover)
            ? self.$com.makeFileUrl(self.$store.state.res.cover)
            : self.$com.makeFileUrl(self.$store.state.res.bigcover);
        }
      }
      // 微信二次分享
      if (self.$store.state.GET_MESSAGE_STATE) {
        self.$store.dispatch("wx_share", {
          title: title,
          desc: desc,
          pic: pic
        });
      }
      let wrp = document.getElementById("wrapper");
      if (wrp) {
        wrp.addEventListener("scroll", this.handleScroll);
      }
      let tjimg = document.querySelector(".access-not");
      if (tjimg && tjimg.dataset.original) {
        tjimg.src = tjimg.dataset.original;
      }
      // 在浏览器可以点击图片预览
      if (self.$store.state.GET_MESSAGE_STATE) {
        let preimg;
        if (document.querySelector(".feed-1")) {
          preimg = document
            .querySelector(".feed-1")
            .getElementsByTagName("img");
        } else {
          return;
        }
        if (preimg) {
          var imgList = [];
          Array.prototype.forEach.call(preimg, (x, i) => {
            if (x.dataset.index) {
              imgList.push({
                current: {
                  src: x.dataset.src
                },
                index: i
              });
            }
            // 点击
            preimg[i].onclick = (function() {
              return function() {
                self.preIndex = i;
                self.preShow = true;
              };
            })(i);
          });
          self.imgList = imgList;
        }
      }
    });
  }
};
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

nav {
  width: 100%;
  height: 13.07vw;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 100;
}

nav .icon-ios-more {
  color: #495060;
}

nav .communityName {
  color: #495060;
  font-size: 15px;
  height: 19px;
  overflow-y: hidden;
}

.nuxts {
  margin-top: 13.07vw;
  overflow-x: hidden;
}
.webNoNav {
  margin-top: 0;
}
/*app内*/

nav.appnav {
  background: rgba(0, 0, 0, 0);
}

nav.appnav .icon-ios-more {
  color: #fff;
}

nav.appnav .communityName {
  color: #fff;
  max-width: 53.33vw;
}

nav.scrollnav {
  background: #fff;
  /*padding-top: 0;*/
}

nav.scrollnav .icon-ios-more {
  color: #495060;
}

nav.scrollnav .communityName {
  color: #495060;
}

nav.appnav ~ .nuxts {
  margin-top: 0;
  min-height: 100vh;
}

.appnuxts {
  margin-top: 0;
}

.access-not {
  width: 21.87vw;
  height: 8.54vw;
  margin-right: 2.67vw;
  border-radius: 0 3px 3px 0;
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
.tj-focus-btn {
  box-sizing: border-box;
  margin-right: 4vw;
}
.feed-h5-videos {
  width: 100%;
  height: 56.25vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0 1px 5px #efefef;
}
.feed-h5-videos-player {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
  background: #333;
}
</style>
