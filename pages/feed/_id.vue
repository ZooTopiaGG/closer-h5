<template>
  <div id="feed">
    <lg-preview></lg-preview>
    <div>
      <div class="feed-1">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <div class="feed-doc" v-if="$store.state.res.int_type === 0">
          <div class="feeder-title">{{ $store.state.content.text }}</div>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <div v-if="$store.state.GET_MESSAGE_STATE">
            <div class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images.length == 1">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" style="width: 100%;height:100%;" :key="index">
                <img class="feed-cover-list" v-lazy="$com.makeFileUrl(img.link)" v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images.length == 2">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :style="{width: '50%',height:'0',paddingBottom:'50%',  backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                :key="index">
                <img class="feeder-cover-list " v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex" v-else-if="$store.state.content.images.length == 3 || $store.state.content.images.length > 4">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                :key="index">
                <img class="feeder-cover-list" v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images.length == 4">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                :key="index">
                <img class="feeder-cover-list" v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 视频 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 1">
          <div class="feeder-title">{{ $store.state.content.text }}</div>
          <div class="prism-player" id="J_prismPlayer" :vid="$store.state.content.videos[0].vid" :cover="$store.state.content.videos[0].cover"></div>
        </div>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <!-- <div v-if="$store.state.GET_MESSAGE_STATE" class="feeder-title" >{{ res.title }}</div> -->
          <div class="feeder-img" style="position:relative; width:7.5rem; height: 9.3rem;" v-if="$store.state.res.bigcover">
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover" :style="{ 
                        display:'block',
                        position:'relative', 
                        width: $deviceWidth+'px',
                        height: ($deviceWidth * 465 / 375 )+'px'}" v-lazy="$com.makeFileUrl($store.state.res.bigcover)"
              :onerror="defaultErrorImg">
            <div class="hide-over"></div>
          </div>
          <div class="feeder-img" style="position:relative; width:100%; width:7.5rem; height: 4.18rem;" v-else>
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover" :style="{ 
                        display:'block',
                        position:'relative', 
                        width: $deviceWidth+'px',
                        height: ($deviceWidth * 209 / 375 )+'px'}" v-lazy="$com.makeFileUrl($store.state.res.cover)" :onerror="defaultErrorImg">
            <div class="hide-over"></div>
          </div>
          <div class="feeder-content">
            <!-- 标题 -->
            <div class="feeder-title"> {{ $store.state.res.title }} </div>
            <!-- 阅读量 -->
            <div class="read-num">阅读  1929</div>
            <div class="summary" id="summary" v-html="htmls">
            </div>
            <!-- 神议论列表 -->
            <ul class="feeder-comments" v-if="$store.state.res.int_category === 3">
              <li class="feeder-comments-cell flex flex-align-start" v-for="(item, index) in $store.state.discuss" :key="index">
                <div class="feeder-comment-info flex flex-align-center flex-pack-end">
                  <i v-lazy:background-image="$com.makeFileUrl(item.avatar)" :style="{ backgroundSize: 'cover' }"></i>
                </div>
                <div class="flex-1">
                  <div class="feeder-comment-nickname flex flex-pack-justify">
                    <span>{{ item.nickname }}</span>
                    <span>{{ $com.getCommonTime(item.createTime, 'yy/mm/dd') }}</span>
                  </div>
                  <!-- 纯文本 link text-->
                  <div v-if="item.type === 0" class="feeder-comment">
                    <span v-if="item.weblink" v-html="item.newText"></span>
                    <span v-else>{{ item.text }}</span>
                  </div>
                  <!-- 包含图片 -->
                  <div v-else-if="item.type === 1" class="feeder-comment">
                    <div v-if="$store.state.GET_MESSAGE_STATE" style="position:relative;">
                      <img class="feeder-comment-img" v-preview="$com.makeFileUrl(item.image.link)" v-lazy="$com.makeFileUrl(item.image.link)"
                        :onerror="defaultErrorImg">
                      <span class="gif" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span>
                    </div>
                    <img v-else class="feeder-comment-img" v-lazy="$com.makeFileUrl(item.image.link)" :originSrc="$com.makeFileUrl(item.image.link)" :onerror="defaultErrorImg">
                  </div>
                  <!-- 包含贴子 -->
                  <div v-else-if="item.type === 3" class="feeder-comment flex flex-align-center feeder-comment-3">
                    <div class="feeder-comment-3-cover flex">
                      <i v-if="item.feed.imageUrl" v-lazy:background-image="$com.makeFileUrl(item.feed.imageUrl)" :style="{backgroundSize: 'cover', backgroundPosition: 'center center' }"></i>
                    </div>
                    <div>
                      <div class="feeder-comment-3-title">{{ item.feed.title }}</div>
                      <div class="feeder-comment-3-summary">{{ item.feed.summary }}</div>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </div>
        <!-- 发帖者信息 -->
        <div v-if="$store.state.GET_MESSAGE_STATE" class="feeder-info flex flex-pack-justify flex-align-center">
          <span>
            <!-- <span v-if="$store.state.res.double_latitude != -999">{{ $store.state.res.className }}</span>
                        <span v-else>官方出品 </span> -->
            <span>@{{ $store.state.res.username }} 出品</span>
          </span>
          <span>{{ $com.getCommonTime($store.state.res.long_update_time, 'yy-mm-dd hh:MM') }}</span>
        </div>
      </div>
      <!-- 分割线 -->
      <div v-if="$store.state.GET_MESSAGE_STATE" class="split-box"></div>
      <!-- 留言板 -->
      <div class="feed-2" v-if="$store.state.GET_MESSAGE_STATE">
        <div>
          <div class="feed-messagebord-type flex flex-align-center" v-if="$store.state.res.int_category === 1">
            <span>投稿类型：</span>
            <span>
              <span>{{ $store.state.postType }} </span>
              <span class="dp-text-color">/</span>
              <span> {{ $com.createTime($store.state.res.long_update_time, '年/月/日') }}截止</span>
            </span>
          </div>
          <div class="feed-messagebord flex flex-align-center flex-pack-justify">
            <span class="feed-messagebord-left" v-if="$store.state.res.int_category === 1">投稿 {{ $store.state.res.commentNumber }}</span>
            <!-- <span class="feed-messagebord-left" v-else-if="res.int_category === 0 || res.int_category === 5|| res.int_category === 3">留言 {{ res.commentNumber }}</span> -->
            <span class="feed-messagebord-left" v-else>{{ $store.state.res.commentNumber || 0 }}条留言</span>
          </div>
        </div>
        <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
        <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
        <div v-if="$store.state.res.int_category != 1 ">
          <ul class="feed-messagebord-list">
            <li class="feed-messagebord-list-cell" v-for="(item, index) in $store.state.messagelist.data" :key="index">
              <div class="messager-info flex flex-align-center flex-pack-justify">
                <div class="messager-info-div flex flex-align-center">
                  <img v-lazy="$com.makeFileUrl(item.user.avatar)" :onerror="defaultErrorImg">
                  <div class="flex flex-v">
                    <span class="messager-name">{{ item.user.fullname }}</span>
                    <span class="messager-time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</span>
                  </div>
                </div>
                <div class="icon-group flex">
                  <p class="flex flex-align-center" style="margin-right:5px" @click="toMessage">
                    <span class="icon-font icon-message"></span>
                    <span>{{ item.replyNumber }}</span>
                  </p>
                  <p class="flex flex-align-center" @click="toSupport">
                    <span class="icon-font icon-dianzan2"></span>
                    <span v-if="item.like>0">{{ item.like }}</span>
                  </p>
                </div>
              </div>
              <div class="messager-content">{{ item.content }}</div>
              <!-- 评论列表 -->
              <div v-if="item.replyNumber > 0">
                <ul class="messager-comments" v-if="item.replyNumber <=3">
                  <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" :key="commentIndex">
                    <span>{{ commentItem.user.fullname }}：</span>
                    <span class="messager-comment">{{ commentItem.content }}</span>
                  </li>
                </ul>
                <ul class="messager-comments" v-else>
                  <li class="messager-comments-cell" style="color: #5E97CD">{{ item.replyNumber }}条回复</li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="learn-more" v-if="$store.state.messagelist.count>1">
            <span @click="learnMore" class="flex flex-align-center flex-pack-center">
              <span v-if="loading === 1">查看更多留言</span>
              <span v-else-if="loading===2" class="flex flex-align-center">
                <span>正在加载</span>
                <mt-spinner :size="16" type="triple-bounce" color="#495060" style="margin-left:5px"></mt-spinner>
              </span>
              <span v-else>到底了，没有更多了</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="tj-dialog" @click.self="hiddenLogin" v-if="$store.state.visibleLogin">
      <dp-login></dp-login>
    </div>
    <div class="tj-dialog" @click.self="hiddenTextArea" v-if="$store.state.visibleMessage">
      <dp-text-area></dp-text-area>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "Feed",
  middleware: "get_feed_details",
  async asyncData({ store }) {
    let htmls = store.state.options ? "" : store.state.content.html;
    return {
      htmls: htmls
    };
  },
  head() {
    return {
      // 可以使用this
      title: this.$store.state.res.title
    };
  },
  data() {
    return {
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      clientWidth: "",
      visibleLogin: false,
      loading: 1, // 按钮执行状态
      disabled: false, // 按钮可用状态
      res: {},
      content: {},
      messagelist: {},
      isActive: true,
      exist: true,
      htmls: {},
      // 投稿类型
      postType: "",
      options: {}
    };
  },
  methods: {
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    learnMore() {
      this.loading = 2;
      setTimeout(() => {
        this.loading = 3;
        this.isActive = false;
      }, 3000);
    },
    // 点击单选按钮时变化
    reportChange() {
      // 监听按钮状态
      this.disabled = false;
      this.loading = 1;
    },
    // 替换文本中图片和视频字符串
    async parseLongGraphic() {
      let self = this;
      // self.$store.state.content.html 复制到self.content.html
      self.content.html = self.$store.state.content.html;
      const regexImg = /<img.*?(?:>|\/>)/gi;
      let pImg = self.content.html.match(regexImg);
      if (pImg) {
        const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let size, flag;
        // console.log("pImg===", pImg);
        pImg.forEach((x, i) => {
          // console.log(`第${i}个x====`, x)
          let srcArray = x.match(regexSrc);
          let widthArray = x.match(regexWidth);
          let heightArray = x.match(regexHeight);
          // console.log(`${widthArray} ---- ${heightArray}`)
          if (widthArray && heightArray) {
            if (parseInt(widthArray[1]) >= parseInt(heightArray[1])) {
              size = self.$deviceWidth;
            } else {
              size = parseInt(
                self.$deviceWidth * heightArray[1] / widthArray[1]
              );
            }
            let nH = parseInt(
              self.$deviceWidth * heightArray[1] / widthArray[1]
            );
            flag = `<div class="imgbox" width="${
              self.$deviceWidth
            }" height="${nH}">
                    <img src="${srcArray[1]}?s=${size}" originSrc="${
              srcArray[1]
            }?s=${size}" width="${self.$deviceWidth}" height="${nH}"/>
                    </div>`;
          } else {
            size = "500";
            flag = `<div class="imgbox" width="7.5rem" height="4.18rem" style="background-color: #eee">
                    <img src="${srcArray[1]}?s=${size}" originSrc="${
              srcArray[1]
            }?s=${size}" width="${self.$deviceWidth}" height="auto"/>
                    </div>`;
          }
          // 替换插入需要的值
          // 正则替换富文本内的img标签
          // 替换不同文本
          const regexPImg = new RegExp(x);
          self.content.html = self.content.html.replace(regexPImg, flag);
        });
        // console.log('sssss=====', self.content.html)
      }
      const regexVideo = /<video.*?(?:>|\/>|<\/video>)/gi;
      var pVideo = await self.content.html.match(regexVideo);
      if (pVideo) {
        // 正则替换富文本内 img标签 待发布（npm）
        const regexUrl = /imageurl=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexVid = /vid=[\'\"]?([^\'\"]*)[\'\"]?/i;
        // console.log('pVideo=', pVideo)
        for (let i = 0; i < pVideo.length; i++) {
          // 匹配imageurl属性下的值
          let urlArray = pVideo[i].match(regexUrl);
          // 匹配vid属性下的值
          let vidArray = pVideo[i].match(regexVid);
          // // 替换插入需要的值flg
          // let temp = pVideo[i].split('<p>');
          let flg = `<div id="J_prismPlayer_${
            vidArray[1]
          }" class="prism-player video-player" vid="${vidArray[1]}" cover="${
            urlArray[1]
          }"></div>`;
          let v = `<p> ${flg}</p>`;
          // console.log('v=', v)
          self.htmls = await self.content.html.replace(regexVideo, v);
          let res = await this.$axios.$get(`${api.command.videos}`);
          console.log("res====", res);
          let player = new Aliplayer(
            {
              id: `J_prismPlayer_${vidArray[1]}`,
              width: "100%",
              autoplay: false,
              prismType: 2,
              playsinline: true, //app内播放设置
              qualitySort: "desc", //清晰度切换
              vid: vidArray[1],
              playauth: "",
              cover: urlArray[1],
              accessKeyId: res.result.accessKeyId,
              securityToken: res.result.securityToken,
              accessKeySecret: res.result.accessKeySecret
            },
            function(player) {
              console.log("播放器创建好了。");
            }
          );
        }
      } else {
        self.htmls = self.content.html;
      }
    },
    // 去留言
    async toMessage() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // self.$store.dispatch("get_token_by_login", {
        //   paras: Cookie.get("user")
        // });
        console.log(Cookie.get("user"));
        self.$store.commit("SET_VISIBLE_MESSAGE", true);
        // self.$toast({
        //   message: "有t-oken",
        //   position: "top"
        // });
        // 进行其他 ajax 操作
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          self.$toast({
            message: "没有token",
            position: "top"
          });
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
          return;
        } else {
          // 显示登录弹窗
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 去点赞
    async toSupport() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // self.$store.dispatch("get_token_by_login", {
        //   paras: Cookie.get("user")
        // });
        // 进行其他 ajax 操作
        console.log(Cookie.get("user"));
        // self.support();
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          self.$toast({
            message: "没有token",
            position: "top"
          });
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
          return;
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // async suport() {
    //   let self = this;
    //   try {
    //     let para = {
    //       subjectid: "",
    //       commentid: "",
    //       flag: ""
    //     };
    //     let data = await self.$axios.$post(`${api.command.like}`, para);
    //   } catch (err) {}
    // },
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    hiddenTextArea() {
      this.$store.commit("SET_VISIBLE_MESSAGE", false);
    }
  },
  beforeMount() {
    let self = this;
    // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code
      });
    }
  },
  mounted() {
    // console.log("$deviceWidth===", this.$deviceWidth);
    console.log("messagelist===", this.$store.state);
    // 在前端执行播放视频 先判断 只能在mounted中执行;
    if (this.$store.state.res.int_type === 1) {
      let res = this.$axios
        .$get(`${api.command.videos}`)
        .then(res => {
          // console.log('ressss===', this.$store.state.content.videos[0].vid)
          let player = new Aliplayer(
            {
              id: "J_prismPlayer",
              width: "100%",
              autoplay: false,
              prismType: 2,
              vid: this.$store.state.content.videos[0].vid,
              playauth: "",
              playsinline: true, //app内播放设置
              qualitySort: "desc", //清晰度切换
              cover: this.$store.state.content.videos[0].imageUrl,
              accessKeyId: res.result.accessKeyId,
              securityToken: res.result.securityToken,
              accessKeySecret: res.result.accessKeySecret
            },
            function(player) {
              console.log("播放器创建好了。");
            }
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
    // 判断是否是长图文
    if (this.$store.state.res.int_type === 2) {
      if (this.$store.state.options) {
        this.parseLongGraphic();
      }
    }
  }
};
</script>
<style>
.prism-volume {
  margin-left: 10px;
}

.prism-player .prism-controlbar {
  height: 40px;
}

.prism-player .prism-big-play-btn {
  width: 48px;
  height: 48px;
}

.prism-player .prism-liveshift-progress,
.prism-player .prism-progress {
  height: 2px;
}

.prism-player .prism-progress:hover {
  height: 2px;
}

.prism-player .prism-liveshift-progress .prism-progress-cursor,
.prism-player .prism-progress .prism-progress-cursor {
  top: -4px;
  border: 6px solid #00c1de;
}

.prism-player .prism-controlbar .prism-controlbar-bg {
  height: 36px;
}

.prism-progress {
  bottom: 36px !important;
}

.prism-player .prism-play-btn {
  height: 24px;
  line-height: 24px;
}

.prism-player .prism-time-display {
  height: 32px;
  line-height: 32px;
}

.prism-player .prism-fullscreen-btn {
  height: 24px;
  width: 24px;
}

.prism-player .prism-volume .volume-control-icon,
.prism-player .prism-volume .volume-icon {
  height: 24px;
}

.prism-player .prism-volume .volume-control {
  bottom: 32px;
  left: -9px;
  width: 34px;
}

.prism-player .prism-volume .hover .volume-range {
  width: 2px;
}

.prism-player .prism-volume .hover .volume-cursor {
  left: -6px;
}

.prism-stream-selector,
.prism-speed-selector {
  font-size: 13px;
  line-height: 24px;
}

.learn-more {
  margin-top: 8px;
  height: 36px;
  line-height: 36px;
}

.lg-preview-nav-arrow {
  border-top: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
}

.prism-stream-selector .current-stream-selector {
  width: 45px;
}

.feeder-comments .dp-border-show {
  border-left: 1px solid #fddb00;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
}

.video-player {
  margin: 0.2rem 0;
}
</style>
<style scoped>
#feed {
  padding: 0 0 0.3rem;
  box-sizing: border-box;
  font-size: 13px;
}

.feed-doc {
  padding-bottom: 0.3rem;
}

.feeder-info,
.feed-messagebord-type,
.feed-messagebord,
.feed-messagebord-list,
.feeder-title,
.read-num,
.feeder-comments {
  padding: 0 0.3rem;
}
.read-num {
  margin-bottom: 0.2rem;
  color: #888;
}
.feeder-title {
  font-size: 18px;
  margin-bottom: 0.2rem;
  font-weight: bold;
}

.summary {
  text-align: justify;
}

.feeder-cover {
  padding: 0.3rem 0.3rem 0;
}

.feeder-cover > img {
  width: 1.64rem;
  height: 0.64rem;
}

.feeder-content {
  margin-top: 0.4rem;
}

.feeder-img {
  width: 100%;
  flex-wrap: wrap;
}

.hide-over {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  z-index: 99;
}

.messager-info-div > img {
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 100%;
  margin-right: 0.1rem;
  margin-bottom: 3px;
}

.feeder-info,
.prism-player {
  margin: 0.2rem 0;
}

.feed-messagebord {
  height: 0.8rem;
  border-bottom: 1px solid #eee;
}

.feed-messagebord-type {
  height: 0.8rem;
  color: #444;
  font-weight: bold;
}

.feed-messagebord-left {
  font-size: 15px;
  color: #444;
  font-weight: 600;
}

.messager-comment {
  color: #444;
  font-weight: 600;
}
.messager-name {
  font-size: 14px;
}
.feed-messagebord-list-cell {
  border-bottom: 1px solid #eee;
  padding: 0.2rem 0 0;
}

.messager-content {
  margin: 0.2rem 0;
  line-height: 1.6;
  text-align: justify;
}

.messager-time {
  font-size: 12px;
  color: #999;
}

.feeder-img-list {
  position: relative;
  overflow: hidden;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}

.feed-cover-list {
  width: 100%;
  display: block;
}

.feeder-cover-list {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: block;
}

.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
}

.feeder-comments {
  margin-top: 0.25rem;
}

.feeder-comments-cell {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(243, 243, 243);
  margin-bottom: 0.2rem;
  padding: 0.2rem;
}

.feeder-comment-info {
  margin-top: 0.05rem;
}

.feeder-comment-info > i {
  margin-right: 0.2rem;
  width: 0.68rem;
  height: 0.68rem;
  border-radius: 100%;
}

.feeder-comment-3 {
  height: 1.24rem;
  box-sizing: border-box;
  padding: 0.2rem;
  border-radius: 0.1rem;
  border: 1px solid #d7d7d9;
  background: #f6f6f6;
}

.feeder-comment-3-cover > i {
  display: block;
  margin-right: 0.2rem;
  width: 0.86rem;
  height: 0.86rem;
  border-radius: 0.1rem;
}

.feeder-comment-3-title {
  font-size: 15px;
  height: 22px;
  overflow: hidden;
  margin-bottom: 5px;
}

.feeder-comment-3-summary {
  font-size: 12px;
  color: rgba(148, 146, 142, 1);
  height: 20px;
  overflow: hidden;
}

.feeder-comment-nickname {
  font-size: 12px;
  color: rgba(148, 146, 142, 1);
  margin-bottom: 0.18rem;
  line-height: 1;
}

.feeder-comment-img {
  width: 100%;
  border-radius: 0.06rem;
}

.messager-comments {
  padding: 0.1rem 0.2rem;
  background-color: #f4f4f4;
  margin-bottom: 0.2rem;
}

.messager-comments-cell {
  box-sizing: border-box;
  padding: 0.05rem 0;
}
</style>
