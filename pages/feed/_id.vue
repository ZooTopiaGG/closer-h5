<template>
  <section id="feed" :class="{ 
    feed2: !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
    }">
    <section :class="{ 
      box: true,
      'feed-box': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
      'feed-box-0': $store.state.res.int_type === 0,
      'feed-box-1': $store.state.res.int_type === 1
     }">
      <section :class="{
        'feed-1': true,
        'feed-padding': $store.state.GET_MESSAGE_STATE && $store.state.res.commentNumber == 0 && !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
      }">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <section class="feed-doc" id="imgListFeed" v-if="$store.state.res.int_type === 0">
          <logo-tab></logo-tab>
          <section class="feeder-title feeder-title-2 feeder-type-0">{{ $store.state.content.text }}</section>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <section v-if="$store.state.GET_MESSAGE_STATE">
            <section class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images && $store.state.content.images.length == 1">
              <section class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)" :key="index">
                <!-- <img class="feed-cover-list" v-lazy="$com.makeFileUrl(img.link)" v-preview="$com.makeFileUrl(img.link)"> -->
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <section class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">                
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <section class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
              <section class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
          </section>
        </section>
        <!-- 视频 -->
        <section class="feed-doc" v-else-if="$store.state.res.int_type === 1">
          <section class="video-doc">
            <!-- 恒视频 -->
            <section v-if="$store.state.content.videos[0].width >= $store.state.content.videos[0].height">
              <section 
                v-if="$store.state.res.int_type === 1 && ($route.path.indexOf('/feed')>-1 || $route.path.indexOf('/preview')>-1)" 
                class="feed-h5-videos feed-h5-videos-horizontal"
                :style="{
                  width: '100vw',
                  height: $store.state.content.videos[0].height * 100 / $store.state.content.videos[0].width + 'vw'
                }">
                <video 
                  id="feed-h5-videos-horizontal"
                  :src="$store.state.content.videos[0].src" 
                  preload="auto" 
                  webkit-playsinline="true" 
                  x-webkit-airplay="true"  
                  playsinline="true" 
                  x5-video-player-type="h5" 
                  x5-video-orientation="portrait"
                  x5-video-player-fullscreen="true"
                  :style="{
                    'object-fit': 'fill',
                    width: '100vw',
                    height: $store.state.content.videos[0].height * 100 / $store.state.content.videos[0].width + 'vw'
                  }"
                  :data-cover="$store.state.content.videos[0].imageUrl">
                </video>
                <dp-video elem="feed-h5-videos-horizontal"></dp-video>
                <section class="feed-h5-bottom"></section>
              </section>
              <logo-tab></logo-tab>
            </section>
            <!-- 竖视频 -->
            <section v-else>
              <section 
                v-if="$store.state.res.int_type === 1 && ($route.path.indexOf('/feed')>-1 || $route.path.indexOf('/preview')>-1)" 
                class="feed-h5-videos feed-h5-videos-vertical"
                v-lazy:background-image="$store.state.content.videos[0].imageUrl"
                :style="{
                  width: '100vw',
                  height: $store.state.content.videos[0].height * 100 / $store.state.content.videos[0].width + 'vw',
                  overflow: 'hidden'
                }">
                <video 
                  :src="$store.state.content.videos[0].src" 
                  preload="auto"
                  webkit-playsinline="true" 
                  x-webkit-airplay="true"  
                  playsinline="true" 
                  x5-video-player-type="h5" 
                  x5-video-orientation="portrait"
                  x5-video-player-fullscreen="true"
                  :style="{
                    'object-fit': 'fill',
                    width: '100%',
                    height: 'auto'
                  }"
                  id="feed-h5-videos-vertical"                  
                  :data-cover="$store.state.content.videos[0].imageUrl">
                </video>
                <dp-video elem="feed-h5-videos-vertical"></dp-video>
                <section class="feed-h5-bottom"></section>
              </section>
              <logo-tab></logo-tab>
            </section>
            <section class="feeder-title feeder-title-2 feeder-type-1">{{ $store.state.content.text }}</section>
          </section>
        </section>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <section class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <section v-if="!$store.state.version_1_2">
            <section class="feeder-img feeder-img-bgcover" v-if="$store.state.res.bigcover">
              <!-- 大封面 -->
              <img class="feed-cover feed-cover-bgcover" :src="defaultImg" v-lazy="$com.makeFileUrl($store.state.res.bigcover)" data-index= "0" 
              >
              <section class="hide-over"></section>
            </section>
            <section class="feeder-img feeder-img-cover" v-else>
              <!-- 小封面 -->
              <img class="feed-cover feed-cover-cover" :src="defaultImg" v-lazy="$com.makeFileUrl($store.state.res.cover)" data-index= "0">
              <section class="hide-over"></section>
            </section>
          </section>
          <section class="feeder-content" id="tjimg" >
            <!-- 标题 -->
            <section class="feeder-title feeder-title-2 feeder-title-3"> {{ $store.state.res.title }} </section>
            <!-- 征稿 截止时间 -->            
            <section class="feed-messagebord-type flex flex-align-center flex-pack-justify" v-if="$store.state.res.int_category === 1">
              <span> {{ $com.createTime($store.state.res.long_time_line, 'yy.mm.dd') }}前截止</span>
              <span>
                <span class="feed-publication-number">投稿 {{$store.state.res.collectionTotalCount}}</span>
              </span>
            </section>
            <!-- logo -->
            <logo-tab></logo-tab>
            <section class="summary tj-sum" v-html="$store.state.content.html" v-lazy-container="{ selector: 'img' }" @click="openClick($event)">
            </section>
            <!-- 神议论列表 -->
            <section v-if="$store.state.res.int_category === 3">
              <ul class="feeder-comments">
                <li class="feeder-comments-cell flex flex-align-start" v-for="(item, index) in $store.state.discuss" :key="index">
                  <section class="feeder-comment-info flex flex-align-center flex-pack-end">
                    <i v-lazy:background-image="$com.makeFileUrl(item.avatar)"></i>
                  </section>
                  <section class="flex-1">
                    <section class="feeder-comment-nickname flex flex-pack-justify">
                      <span>{{ item.nickname }}</span>
                      <!-- <span>{{ $com.getCommonTime(item.createTime, 'yy/mm/dd') }}</span> -->
                      <span>{{ item.message_time }}</span>
                    </section>
                    <!-- 纯文本 link text-->
                    <section v-if="item.type === 0" class="feeder-comment">
                      <span v-if="item.weblink" v-html="item.newText"></span>
                      <span v-else>{{ item.text }}</span>
                    </section>
                    <!-- 包含图片 -->
                    <section v-else-if="item.type === 1" class="feeder-comment" v-lazy-container="{ selector: 'img' }">
                      <section v-if="$store.state.GET_MESSAGE_STATE" style="position:relative;">
                        <img class="feeder-comment-img" data-index="99" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="defaultImg" :data-src="$com.makeFileUrl(item.image.link)"
                        >
                        <!-- <span class="cover_img_type" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span> -->
                      </section>
                      <section  v-else>
                        <img class="feeder-comment-img" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="defaultImg" :data-src="$com.makeFileUrl(item.image.link)">
                      </section>
                    </section>
                    <!-- 包含贴子 -->
                    <section v-else-if="item.type === 3" @click="tofeed(item.feed.feedId)" class="feeder-comment flex flex-align-center feeder-comment-3">
                      <section class="feeder-comment-3-cover flex">
                        <i v-if="item.feed.imageUrl" v-lazy:background-image="$com.makeFileUrl(item.feed.imageUrl)"></i>
                      </section>
                      <section>
                        <section class="feeder-comment-3-title">{{ item.feed.title }}</section>
                        <section class="feeder-comment-3-summary">{{ item.feed.summary }}</section>
                      </section>
                    </section>
                    <!-- 包含视频 -->
                    <section v-else-if="item.type === 2">
                      <section v-if="$store.state.GET_MESSAGE_STATE">
                        <section class="imgbox feed-imgbox">
                          <video :src="item.video.src" controls="controls" preload="none" 
                            :poster="item.video.imageUrl" :data-cover="item.video.imageUrl">
                          </video>
                        </section>
                      </section>
                      <section v-else class="imgbox feed-imgbox-else feed-video-bg" 
                      @click="showVid2(item.video.vid)" 
                      :data-vid="item.video.vid" :data-bg="item.video.imageUrl" :style="{
                          backgroundImage: 'url('+defaultImg+')',
                          }">
                        <section class="flex flex-align-center flex-pack-center feed-imgbox-else-child" :data-vid="item.video.vid">
                          <span class="icon-shipin-2" :data-vid="item.video.vid"></span>
                        </section>
                      </section>
                    </section>
                  </section>
                </li>
              </ul>
              <section v-if="$store.state.content.end_html" class="god-discuss-end-tag summary" v-lazy-container="{ selector: 'img' }" v-html="$store.state.content.end_html" @click="openClick($event)"></section>
            </section>
          </section>
        </section>
        <!-- 发帖者信息 神议论和长图文区别 -->
        <section v-if="!$store.state.version_1_2">
          <section class="author-list" v-if="$store.state.res.int_category != 3">
            <p>小编：<span>张山</span></p>
            <p>作者：<span>历史书</span> <span>历史书</span> </p>
          </section>
          <section v-else class="author-list">
            <p>来自 <span>{{ $store.state.res.className }}</span></p>
          </section>
        </section>
        <!-- 阅读量 点赞数 -->
        <section class="end-data flex flex-align-center flex-pack-justify" v-if="!$store.state.version_1_2">
          <section class="read-num">阅读 <span class="incrviewnum">{{ $store.state.incr_view }}</span></section>
          <section class="flex flex-align-center">
            <span class="sup-icon"></span>
            <span> {{ $store.state.res.like }}</span>
          </section>
        </section> 
      </section>
      <!-- 精彩留言 -->
      <message-board v-if="$store.state.GET_MESSAGE_STATE"></message-board>
      <section v-if="$store.state.GET_MESSAGE_STATE">
        <!-- 征稿列表 -->
        <section v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1">
          <dp-feed title="精彩投稿" :feed-list="paper_list"></dp-feed>
        </section>
        <!-- 热门文章 -->
        <dp-feed v-if="hot_list.length > 0" title="热门文章" :feed-list="hot_list"></dp-feed>
        <no-thing v-else></no-thing>
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import noThing from "~/components/nothing";
import logoTab from "~/components/logo";
import messageBoard from "~/components/messageboard";
import dpVideo from "~/components/dpvideo";
export default {
  name: "Feed",
  async asyncData({ params, store, app, query }) {
    try {
      let para = {
        subjectid: params.id
      };
      // 获取贴子详情
      let res = await app.$axios.$get(
        `${api.command.show}?subjectid=${params.id}`
      );
      if (res.code != 0) {
        // 贴子被删除状态
        store.commit("GET_EXIST_STATUS", false);
      } else {
        // 在外部浏览器时 不可看的状态
        // 在PC预览 可看的状态
        if (store.state.GET_MESSAGE_STATE) {
          // pc端的状态
          if (query.view && query.view === "pre") {
            store.commit("GET_EXIST_STATUS", true);
          } else if (
            res.result.int_verify === 0 ||
            ((res.result.int_verify === -1 &&
              res.result.int_category != 4 &&
              res.result.int_category != 6) ||
              res.result.bool_delete)
          ) {
            store.commit("GET_EXIST_STATUS", false);
          } else {
            store.commit("GET_EXIST_STATUS", true);
          }
        }
        // 验证content
        if (res.result.content) {
          var content = JSON.parse(res.result.content);
          // 视频贴 特殊处理
          if (res.result.int_type === 1) {
            if (content.videos[0].height > content.videos[0].width) {
              store.commit("ITS_LONG_VIDEO", true);
            }
          }
          // 解析长图文html
          if (res.result.int_type === 2) {
            let _html = await $async.makeHtmlContent(
              content.html,
              store.state.GET_MESSAGE_STATE
            );
            if (_html) {
              content.html = _html;
            }
            if (res.result.int_category === 3 && content.end_html) {
              let end_html = await $async.makeHtmlContent(
                content.end_html,
                store.state.GET_MESSAGE_STATE
              );
              if (end_html) {
                content.end_html = end_html;
              }
            }
          }
          if (content.discuss) {
            var discuss = await content.discuss.map(x => {
              if (x.text) {
                let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
                let res = x.text.match(reg);
                if (res) {
                  x.weblink = true;
                  res.map(y => {
                    // 正则替换文本
                    let tag = `<a href="${y}" target="_blank">${y}</a>`;
                    let newtag = x.text.replace(reg, tag);
                    x.newText = newtag;
                  });
                } else {
                  x.weblink = false;
                }
              }
              return x;
            });
            store.commit("SET_DISSCUSS", discuss);
          }
          // 返回在渲染页面之前得结果
          store.commit("SET_CONTENT", content);
        }
        store.commit("SET_RES", res.result);
      }
    } catch (err) {
      store.commit("GET_EXIST_STATUS", false);
      throw err;
    }
  },
  head() {
    var _title = () => {
      if (this.$store.state.res.int_type === 2 && this.$store.state.res.title) {
        return `贴近 - TieJin.cn - ${this.$store.state.res.title}`;
      } else {
        if (this.$store.state.content.text) {
          let t = this.$store.state.content.text.substring(0, 10);
          return `贴近 - TieJin.cn - ${t}`;
        }
      }
    };
    return {
      title: _title()
    };
  },
  components: {
    noThing,
    logoTab,
    messageBoard,
    dpVideo
  },
  data() {
    return {
      textarea: "",
      item: {},
      visibleMessage: false,
      isLike: false,
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      res: {},
      content: {
        html: ""
      },
      // 投稿类型
      vid: "",
      showMore: false,
      // 征稿列表
      paper_list: [],
      // 热门文章列表:
      hot_list: [],
      video: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window != "undefined") {
      if (document.getElementById("wrapper")) {
        document.getElementById("wrapper").scrollTop = 0;
      }
    }
    next();
  },
  methods: {
    // 跳转栏目主页
    toCommunity() {
      location.href = `/community/${this.$store.state.res.communityid}`;
    },
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    // 在app端 神议论贴子 打开原生视频
    showVid2(vid) {
      location.href = `/?vid=${vid}`;
    },
    // 在app端 长图文贴子 打开原生视频
    openClick(event) {
      if (!this.$store.state.GET_MESSAGE_STATE && event.target.dataset.vid) {
        location.href = `/?vid=${event.target.dataset.vid}`;
      }
    },
    // 打开 神议论里的贴子
    tofeed(fid) {
      if (this.$store.state.GET_MESSAGE_STATE) {
        this.$router.push({ path: `/feed/${fid}` });
      } else {
        location.href = `closer://feed/${fid}`;
      }
    },
    // 社区信息
    // 外部分享时调用
    async communityFocusStat() {
      let self = this;
      let communityFocusStat = await self.$axios.$get(
        `${api.community.show}?communityid=${self.$store.state.res.communityid}`
      );
      if (communityFocusStat.code === 0) {
        // 获取关注状态
        if (communityFocusStat.result.isFollowed) {
          self.$store.commit(
            "SET_FOCUS_STAT",
            communityFocusStat.result.isFollowed
          );
        }
      }
    },
    // 征稿时，显示征稿列表
    async paperList() {
      let self = this;
      let feeds = await self.$axios.$get(
        `${api.command.collections}?subjectid=${self.$route.params.id}`
      );
      if (feeds.code === 0) {
        let arr = await feeds.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        });
        self.$store.commit("SET_FEED_LIST", arr);
        self.paper_list = arr;
      }
    },
    // 热门文章 推荐文章
    async hotList() {
      let self = this;
      let feeds = await self.$axios.$get(`${api.command.hot_subjects}`);
      if (feeds.code === 0) {
        let arr = await feeds.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        });
        self.$store.commit("SET_FEED_LIST", arr);
        self.hot_list = arr;
      }
    },
    // 阅读数量
    async incrView() {
      let self = this;
      try {
        let para = {
          subjectid: self.$route.params.id
        };
        let view = await self.$axios.$get(
          `${api.command.incr_view}?subjectid=${
            self.$route.params.id
          }&timestamp=${Date.now()}`
        );
        // 静态增加 阅读量
        if (view.code === 0) {
          self.$store.commit("GET_INCR_VIEW", view.result);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 微信登录关注
    async focusWxLogin() {
      let self = this;
      // 验证code是否存在
      if (self.$route.query.code) {
        let res = await self.$store.dispatch("get_code_by_login", {
          code: self.$route.query.code,
          type: "else"
        });
        if (res) {
          let result = await self.$store.dispatch("get_focus_stat", {
            communityid: self.$store.state.res.communityid,
            flag: self.$store.state.is_follow ? 0 : 1
          });
          if (result) {
            self.$store.commit("SHOW_ALERT", true);
          }
        }
      }
    }
  },
  beforeMount() {
    this.focusWxLogin();
  },
  mounted() {
    let self = this;

    self.$nextTick(() => {
      // 清除留言时保存的数据
      window.sessionStorage.clear();
      // 获取阅读量
      self.incrView();
      if (self.$store.state.GET_MESSAGE_STATE) {
        // 栏目关注状态
        self.communityFocusStat();
        // 获取留言列表
        self.$store.dispatch("message_list", {
          subjectid: self.$route.params.id
        });
        if (
          self.$store.state.res.int_type === 2 &&
          self.$store.state.res.int_category === 1
        ) {
          // 征稿列表
          self.paperList();
        }
        // 热门文章列表
        self.hotList();
        self.showMore = true;
      }
      if (typeof window != "undefined") {
        // 视频封面异步加载
        let videobg = document.querySelectorAll(".feed-video-bg");
        if (videobg) {
          Array.prototype.forEach.call(videobg, function(x, i) {
            if (x.dataset.bg) {
              setTimeout(() => {
                x.style.backgroundImage = `url('${x.dataset.bg}')`;
              }, 500);
            }
          });
        }
      }
    });
  }
};
</script>
<style>
.feed2,
.feed-box,
.message-box {
  height: 100%;
}
.feed-box-0 {
  min-height: calc(100vh - 13.07vw);
}

.feed-box-1 {
  min-height: calc(100vh - 56.25vw);
}

.learn-more {
  margin-top: 8px;
  line-height: 49px;
  font-size: 16px;
  color: #409eff;
  padding-top: 44px;
  height: 49px;
}
.more-img {
  width: 6.75px;
  height: 10.5px;
  margin-left: 5px;
}
.lg-preview-nav-arrow {
  border-top: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
}
.feeder-comments .dp-border-show {
  border-left: 1px solid #fddb00;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
}
.tiejin-imgbox {
  background: #fff;
  width: 100%;
  min-height: 28.27vw;
  position: relative;
}
.tiejin-imgbox > span {
  color: #fff;
  font-size: 14vw;
  position: absolute;
  height: 28vw;
  width: 56vw;
  text-align: center;
  line-height: 1.5;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.tiejin-imgbox > img {
  width: 100%;
  height: auto;
}
.tiejin-videobox {
  width: 100%;
  height: 56.25vw;
  position: relative;
  background: #333;
}
.tiejin-videobox > video {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
}
.tiejin-videobox-native {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 56.25vw;
  position: relative;
}
.tiejin-videobox-native > div {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
}
.tiejin-iframe {
  width: 100%;
  min-height: 212px;
}
.icon-shipin-2 {
  background: url("data:image/png;base64,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");
  background-size: cover;
  width: 13vw;
  height: 13vw;
}
@media screen and (min-width: 680px) {
  .imgbox,
  .imgbox img {
    height: auto !important;
  }
}
</style>
<style scoped lang="less">
@import "../../assets/css/feedid.less";
</style>
