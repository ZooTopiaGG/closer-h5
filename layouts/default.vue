<template>
  <div class="default__box">
    <div class="default_init_box" v-if="$store.state.exist">
      <nav v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoNav && !$store.state.isPC" 
        :class="{
          appnav: $store.state.res.int_type === 2 || $route.path.indexOf('/community')>-1,
          scrollnav: scrollnav,
          webNoNav: !$store.state.webNoNav,
          isPC: $store.state.isPC,
          flex: true,
          'flex-v': true,
          'flex-pack-center': true
        }">
        <div class="feeder-cover flex flex-align-center flex-pack-justify">
          <div class="flex flex-1 flex-align-center" @click="toCommunity">
            <img class="access-not" :src="defaultImg" :data-original="$store.state.res.blogo">
            <span class="communityName ellipsis" v-if="$store.state.res.communityName">{{ $store.state.res.communityName }}</span>
            <span class="communityName ellipsis" v-else>{{ $store.state.res.name }}</span>
          </div>
          <div class="flex flex-align-center">
            <!-- 关注补丁 -->
            <mt-button  @click="tjFocus" :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn cursor">
              <span v-if="$store.state.is_follow">已关注</span>
              <span v-else>
                <span>关注</span>
              </span>
            </mt-button>
          </div>
        </div>
      </nav>
      <div class="layer flex flex-v flex-align-center flex-pack-center" v-if="$store.state.GET_MESSAGE_STATE && $store.state.isPC">
        <img src="~/assets/images/1531133203.png" alt="">
        <div>手机扫一扫</div>
        <div>下载贴近App</div>
      </div>
      <div id="wrapper"
      :class="{ 
        'web-class': $store.state.GET_MESSAGE_STATE, 
        nuxts:true, 
        webNoNav: !$store.state.webNoNav,
        isPC: $store.state.isPC,
        appnuxts: !$store.state.GET_MESSAGE_STATE }">
        <keep-alive>
          <nuxt/>
        </keep-alive>
      </div>
      <div v-if="$store.state.res.int_type === 1 && $route.path.indexOf('/feed')>-1" class="feed-h5-videos" id="feed-h5-videos">
        <video :src="$store.state.content.videos[0].src" controls="controls" preload="none" class="feed-h5-videos-player" :poster="$store.state.content.videos[0].imageUrl" :data-cover="$store.state.content.videos[0].imageUrl">
        </video>
      </div>
      <div v-if="$store.state.GET_MESSAGE_STATE && $store.state.webNoFooter && !$store.state.isPC" class="open-footer cursor">
        <mt-button type="primary" size="small" @click="downApp" class="circle-btn">
          下载贴近 更多精彩
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
    <div class="tj-dialog" @click.self="hiddenTextArea" v-if="$store.state.visibleMessage">
      <dp-reply></dp-reply>
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
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      col: "#333",
      scrollnav: false,
      exist: true,
      imgList: [],
      preIndex: 0,
      preShow: false,
      visibleMessage: false,
      scrollTimer: 0
    };
  },
  components: {
    previewList
  },
  methods: {
    // 下载app补丁
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: window.sessionStorage.getItem("h5Adid") || "closer-share" // 栏目id
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
    // 监听图片预览组件的子组件传来的状态 是否关闭预览
    listenToMyChild(somedata) {
      this.preShow = somedata;
    },
    // 隐藏登录组件
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    // 隐藏留言框
    hiddenTextArea() {
      this.$store.commit("SET_VISIBLE_MESSAGE", false);
    },
    // 监听滚动
    handleScroll(e) {
      let self = this;
      // 部分手机不能监听 e.target.scrollingElement
      if (e.target.scrollingElement) {
        if (
          // 判断是否是长图文或者栏目主页 滚动显示导航背景
          (self.$route.path.indexOf("/feed") > -1 &&
            self.$store.state.res.int_type === 2) ||
          self.$route.path.indexOf("/community") > -1
        ) {
          if (e.target.scrollingElement.scrollTop >= 80) {
            self.scrollnav = true;
          } else {
            self.scrollnav = false;
          }
        }
      } else {
        self.scrollnav = true;
      }
    },
    // 视频监听
    videoScroll() {
      let videosbox = document.querySelectorAll(".tiejin-videobox");
      Array.prototype.forEach.call(videosbox, (x, i) => {
        videosbox[i].querySelector("video").style.display = "block";
      });
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
        console.log(
          `${location.protocol}//${location.hostname}/redirect?redirectUrl=${
            location.protocol
          }//${location.hostname}${self.$route.path}`
        );
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // 正式
            // url: `${location.protocol}//${location.hostname}${self.$route.path}`
            url: `${location.protocol}//${
              location.hostname
            }/redirect?redirectUrl=${location.protocol}//${location.hostname}${
              self.$route.path
            }`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    }
  },
  mounted() {
    let self = this;
    // console.log(this.$store.state);
    if (typeof window != "undefined") {
      self.$store.commit("GET_VERSION");
      // 动态添加微信配置文件
      if (self.$store.state.GET_MESSAGE_STATE) {
        let sct = document.createElement("script");
        sct.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
        document.body.appendChild(sct);
      }
    }
    // 存会话 h5Adid
    if (self.$route.query.adid) {
      window.sessionStorage.setItem("h5Adid", self.$route.query.adid);
    }
    // 设置 h5cookie埋点
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
            let description = JSON.parse(
              self.$store.state.group_info.group_info.group.description
            );
            desc = description[0].content
              ? description[0].content
              : "贴近一点 看身边";
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
      // 监听document滚动位置
      document.addEventListener("scroll", this.handleScroll);
      // logo图片预加载
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
          // 遍历查找出来的元素type HTMLCOLLECTION
          Array.prototype.forEach.call(preimg, (x, i) => {
            if (x.dataset.index) {
              imgList.push({
                current: {
                  src: x.dataset.src
                },
                index: i
              });
            }
            // 监听点击图片事件 闭包
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
nav {
  width: 100%;
  height: 13.07vw;
  max-width: 750px;
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
  max-width: 45vw;
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
.isPC {
  margin-top: 0;
  height: 100vh;
}
/* 悬浮层 */
.layer {
  position: fixed;
  top: 20px;
  right: calc((100vw - 750px) / 2 - 140px);
  color: #717375;
  width: 140px;
  height: 180px;
  border: 1px solid #d9dadc;
  padding: 16px;
  box-sizing: border-box;
  opacity: 0;
}
.layer img {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}
@media screen and (min-width: 751px) {
  .layer {
    opacity: 1;
  }
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
.focus-icon {
  font-size: 17px;
  margin-right: 2px;
  position: relative;
  bottom: -1px;
}
</style>
