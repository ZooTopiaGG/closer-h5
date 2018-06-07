<template>
  <div id="feed" :class="{ videofeed: $store.state.res.int_type === 1}">
    <lg-preview></lg-preview>
    <div  v-if="$store.state.res.int_type === 1" style="width:100%;height: 200px;position: fixed; top: 0;left: 0;z-index: 999; background: #222;box-shadow: 0 1px 5px #efefef;">
      <video :src="$store.state.content.videos[0].src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true"
        x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-orientation="portraint"
        style="width: 100%; height: 200px; overflow:hidden;object-fit: fill;" :poster="$store.state.content.videos[0].imageUrl" :data-cover="$store.state.content.videos[0].imageUrl">
        
      </video>
    </div>
    <div class="box">
      <div class="feed-1">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <div class="feed-doc" v-if="$store.state.res.int_type === 0">
          <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <div v-if="$store.state.GET_MESSAGE_STATE">
            <div class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images && $store.state.content.images.length == 1">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" style="width: 100%;height:100%;" :key="index">
                <img class="feed-cover-list" v-lazy="$com.makeFileUrl(img.link)" v-preview="$com.makeFileUrl(img.link)">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :style="{width: '50%',height:'0',paddingBottom:'50%',  backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                :key="index">
                <img class="feeder-cover-list " v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <div class="feeder-img-list" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                :key="index">
                <img class="feeder-cover-list" v-preview="$com.makeFileUrl(img.link)" :onerror="defaultErrorImg">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
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
          <div class="video-doc">
            <div class="videoNav flex flex-align-center">
              <img class="access-not" v-lazy="$store.state.res.blogo">
              <span class="communityName flex-1">{{ $store.state.res.communityName }}</span>
              <div>
                <!-- <a href="javasript:;">已关注</a> -->
                <mt-button :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn" @click="tjFocus">
                  <span v-if="$store.state.is_follow">已关注</span>
                  <span v-else>
                    <span class="icon-font icon-add" style="font-size:14px; margin-right: 2px;"></span>
                    <span>关注</span>
                  </span>
                </mt-button>
              </div>
            </div>
            <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          </div>
        </div>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <!-- <div v-if="$store.state.GET_MESSAGE_STATE" class="feeder-title" >{{ res.title }}</div> -->
          <div class="feeder-img" style="position:relative; width:100%; height: 124vw;" v-if="$store.state.res.bigcover">
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover" :style="{ 
                        display:'block',
                        position:'relative', 
                        width: '100%',
                        height: '124vw'}" :src="defaultImg2" :data-original="$com.makeFileUrl($store.state.res.bigcover)" 
            >
            <div class="hide-over"></div>
          </div>
          <div class="feeder-img" style="position:relative; width:100%; width:100%; height: 57vw;" v-else>
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover" :style="{ 
                        display:'block',
                        position:'relative', 
                        width: '100%',
                        height: '57vw'}" :src="defaultImg" :data-original="$com.makeFileUrl($store.state.res.cover)">
            <div class="hide-over"></div>
          </div>
          <div class="feeder-content">
            <!-- 标题 -->
            <div class="feeder-title feeder-title-2 feeder-title-3"> {{ $store.state.res.title }} </div>
            <!-- 阅读量 -->
            <div class="feed-messagebord-type flex flex-align-center flex-pack-justify" v-if="$store.state.res.int_category === 1">
              <span> {{ $com.createTime($store.state.res.long_time_line, 'yy.mm.dd') }}前截止</span>
              <span>
                <span class="feed-publication-number">投稿 {{$store.state.res.collectionTotalCount}}</span>
                <span>赞 {{ $store.state.res.like }}</span>
              </span>
            </div>
            <div class="read-num" v-else>阅读 {{ $store.state.res.view }}</div>
            <div v-if="$store.state.res.int_category != 1" class="summary" ref="markedContent" id="tjimg">
            </div>
            <div v-else :class="{
                summary2: !$store.state.GET_MESSAGE_STATE && lessContent,
                category1: category1
              }">
              <div class="summary" id="tjimg" ref="markedContent">
              </div>
              <div class="feeder-info flex flex-pack-justify flex-align-center">
                <span>
                  <span>阅读 {{ $store.state.res.view }}</span>
                </span>
                <span>
                  <span style="margin-right: 10px;">
                    <span v-if="$store.state.res.isOffical">官方出品</span>
                    <span v-else>{{ $store.state.res.communityName }} @{{ $store.state.res.username }}</span>
                  </span>
                  <span>{{ $com.getCommonTime($store.state.res.long_publish_time, 'yy.mm.dd') }}</span>
                </span>
              </div>
              <div @click="collapses" v-if="!$store.state.GET_MESSAGE_STATE && lessContent" :class="{
                collapse:true, 
                flex:true, 
                'flex-align-end':true, 
                'flex-pack-center':true,
                collapse2: category1
              }">
                <span v-if="!category1">展开全文</span>
                <span v-else>收起全文</span>
              </div>
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
                    <!-- <span>{{ $com.getCommonTime(item.createTime, 'yy/mm/dd') }}</span> -->
                    <span>{{ item.message_time }}</span>
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
                      >
                      <span class="gif" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span>
                    </div>
                    <img v-else class="feeder-comment-img" v-lazy="$com.makeFileUrl(item.image.link)">
                  </div>
                  <!-- 包含贴子 -->
                  <div v-else-if="item.type === 3" @click="tofeed(item.feed.feedId)" class="feeder-comment flex flex-align-center feeder-comment-3">
                    <div class="feeder-comment-3-cover flex">
                      <i v-if="item.feed.imageUrl" v-lazy:background-image="$com.makeFileUrl(item.feed.imageUrl)" :style="{backgroundSize: 'cover', backgroundPosition: 'center center' }"></i>
                    </div>
                    <div>
                      <div class="feeder-comment-3-title">{{ item.feed.title }}</div>
                      <div class="feeder-comment-3-summary">{{ item.feed.summary }}</div>
                    </div>
                  </div>
                  <!-- 包含视频 -->
                  <div v-else-if="item.type === 2">
                    <div v-if="$store.state.GET_MESSAGE_STATE">
                      <div class="imgbox" style="background-color: rgba(0,0,0,1); width: 100%; height: 48vw; position:relative; border-radius: 3px;">
                        <video :src="item.video.src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow"
                          x5-video-player-type="h5" x5-video-orientation="portraint" style="width: 100%; height: 48vw; overflow:hidden; object-fit: fill;"
                          :poster="item.video.imageUrl" :data-cover="item.video.imageUrl">
                        </video>
                      </div>
                    </div>
                    <div v-else class="imgbox" 
                    @click="showVid2(item.video.vid)" 
                    :data-vid="item.video.vid" :style="{
                        backgroundImage: 'url('+item.video.imageUrl+')',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        width: '100%',
                        height:'48vw', 
                        position:'relative',
                        borderRadius: '3px'}">
                      <div class="flex flex-align-center flex-pack-center" :data-vid="item.video.vid" style="position:absolute;left:0;top:0;bottom:0;right:0;background:rgba(0,0,0,.3);border-radius:3px;">
                        <span class="icon-font icon-shipin" :data-vid="item.video.vid" style="font-size: 60px; color: #ddd;"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 发帖者信息 -->
        <div v-if="$store.state.res.int_category != 1" class="feeder-info flex flex-pack-justify flex-align-center">
          <span class="flex-1 ellipsis" v-if="$store.state.res.int_category === 3">
            <span>
              <!-- <span v-if="$store.state.res.isOffical">官方出品</span> -->
              <span>{{ $store.state.res.className }} @{{ $store.state.res.user.attributes.roster.name }}</span>
            </span>
          </span>
          <span class="flex-1 ellipsis" v-else>
            <span>
              <span v-if="$store.state.res.isOffical">官方出品</span>
              <span v-else>{{ $store.state.res.communityName }} @{{ $store.state.res.username }}</span>
            </span>
          </span>
          <span style="margin-left: 10px">{{ $com.getCommonTime($store.state.res.long_publish_time, 'yy.mm.dd hh:MM') }}</span>
        </div>
      </div>
      <!-- 分割线 -->
      <div v-if="$store.state.GET_MESSAGE_STATE" class="split-box"></div>
      <!-- 留言板 -->
      <div class="feed-2" v-if="$store.state.GET_MESSAGE_STATE">
        <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
        <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
        <div v-if="$store.state.res.int_category != 1 ">
          <div class="message-num">
            {{ $store.state.res.commentNumber }} 条留言
          </div>
          <ul class="feed-messagebord-list" v-if="messagelist.data && messagelist.data.length > 0">
            <li class="feed-messagebord-list-cell" v-for="(item, index) in messagelist.data" :key="index">
              <div class="messager-info flex flex-align-center flex-pack-justify">
                <div class="messager-info-div flex flex-align-center">
                  <img v-lazy="$com.makeFileUrl(item.user.avatar)">
                  <div class="flex flex-v">
                    <span class="messager-name">{{ item.user.fullname }}</span>
                    <span class="messager-time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                  </div>
                </div>
                <div class="icon-group flex flex-align-center">
                  <p class="flex flex-align-center" style="margin-right:10px" @click="toMessage(item)">
                    <span class="icon-font icon-message"></span>
                    <span>{{ item.replyNumber }}</span>
                  </p>
                  <p class="supports" @click="toSupport(item, index)">
                    <img src="~/assets/images/home_btn_like_n@2x.png" v-if="!item.isLike">
                    <img src="~/assets/images/home_btn_like_pre@2x.png" v-else>
                  </p>
                </div>
              </div>
              <div class="messager-content">{{ item.content }}</div>
              <div v-if="item.replyNumber > 0">
                <ul class="messager-comments">
                  <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" v-if=" commentIndex <= 3" :key="commentIndex">
                    <span>{{ commentItem.user.fullname }}：</span>
                    <span class="messager-comment">{{ commentItem.content }}</span>
                  </li>
                  <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="morereply(item)">
                    <span>共{{ item.replyNumber }}条回复</span>
                  </li>
                </ul>
                <!-- <ul class="messager-comments" v-if="item.replyNumber <=3">
                  <li class="messager-comments-cell" v-if="item.replyNumber <=3" style="color: #5E97CD">
                    <nuxt-link to="/feed/morereply">{{ item.replyNumber }}条回复</nuxt-link>
                  </li>
                </ul> -->
              </div>
            </li>
          </ul>
          <div class="learn-more" v-if="messagelist.count && messagelist.count>1">
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
    <div class="tj-dialog" @click.self="hiddenTextArea" v-if="visibleMessage">
      <div class="dpTextArea flex flex-v">
        <mt-field placeholder="写下你的评论" type="textarea" v-model="textarea" rows="5" class="tj-textarea flex-1"></mt-field>
        <div class="flex flex-align-end flex-pack-end">
          <mt-button type="default" size="small" class="cancel" @click="cancel">取 消</mt-button>
          <mt-button type="primary" size="small" class="" @click="sure">确 定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import Vue from "vue/dist/vue.js";
export default {
  name: "Feed",
  // middleware: "get_feed_details",
  scrollToTop: true,
  async asyncData({ params, store, app }) {
    try {
      let para = {
        subjectid: params.id
      };
      let [res, incr_view] = await Promise.all([
        app.$axios.$post(`${api.command.show}`, para),
        app.$axios.$post(
          `${api.command.incr_view}?timestamps=${new Date().getTime()}`,
          para
        )
      ]);
      // 获取迷药
      if (res.code != 0) {
        store.commit("GET_EXIST_STATUS", false);
      } else {
        if (res.result.int_type === 1) {
          store.commit("SET_NO_NAV", false);
        }
        // 外部分享时调用
        if (store.state.GET_MESSAGE_STATE) {
          let communityFocusStat = await app.$axios.$get(
            `${api.community.show}?communityid=${res.result.communityid}`
          );
          if (communityFocusStat.code === 0) {
            // 获取关注状态
            if (communityFocusStat.result.isFollowed) {
              store.commit(
                "SET_FOCUS_STAT",
                communityFocusStat.result.isFollowed
              );
            }
          }
        }
        // 静态增加阅读量
        if (res.result.content) {
          var content = JSON.parse(res.result.content);
          if (content.discuss) {
            // var discuss = content.discuss
            var discuss = await content.discuss.map(x => {
              if (x.text) {
                let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
                let res = x.text.match(reg);
                if (res) {
                  x.weblink = true;
                  // this.$set(x, 'weblink', true)
                  res.map(y => {
                    // 正则替换文本
                    let tag = `<a href="${y}" target="_blank">${y}</a>`;
                    let newtag = x.text.replace(reg, tag);
                    // this.$set(x, 'newText', newtag)
                    x.newText = newtag;
                  });
                } else {
                  x.weblink = false;
                  // this.$set(x, 'weblink', false)
                }
              }
              return x;
            });
          }
          // 投稿类型
          var postType = "";
          switch (res.result.int_post_limit) {
            case 0:
              postType = "图片";
              break;
            case 1:
              postType = "视频";
              break;
            case 2:
              postType = "长图文";
              break;
            case 3:
              postType = "全部";
              break;
            default:
              postType = "全部";
          }
          // 返回在渲染页面之前得结果
          store.commit("SET_CONTENT", content);
          store.commit("SET_RES", res.result);
          store.commit("SET_POSTTYPE", postType);
          store.commit("SET_DISSCUSS", discuss);
          // let htmls = store.state.options ? "" : store.state.content.html;
          return {
            htmls: res.result.content
          };
        }
      }
    } catch (err) {
      store.commit("GET_EXIST_STATUS", false);
      throw err;
    }
  },
  head() {
    return {
      // 可以使用this
      title:
        this.$store.state.res.int_type === 2
          ? this.$store.state.res.title
          : this.$store.state.content.text &&
            this.$store.state.content.text.substring(0, 10)
    };
  },
  data() {
    return {
      textarea: "",
      item: {},
      lessContent: true,
      visibleMessage: false,
      isLike: false,
      isIndex: 0,
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      defaultImg: require("~/assets/images/default2.png"),
      defaultImg2: require("~/assets/images/default.jpeg"),
      clientWidth: "",
      visibleLogin: false,
      loading: 1, // 按钮执行状态
      disabled: false, // 按钮可用状态
      res: {},
      content: {
        html: ""
      },
      messagelist: {},
      isActive: true,
      exist: true,
      htmls: null,
      // 投稿类型
      postType: "",
      options: {},
      vid: "",
      category1: false
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("/feed/morereply") > -1) {
      this.$store.commit("SET_NO_NAV", false);
    } else {
      this.$store.commit("SET_NO_NAV", true);
    }
    next();
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
    morereply(item) {
      sessionStorage.setItem("item", JSON.stringify(item));
      this.$router.push({
        path: "/feed/morereply?sid=" + item.subjectid + "&cid=" + item.commentid
      });
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
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
          return;
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    collapses() {
      this.category1 = !this.category1;
    },
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
      self.content.html = self.$store.state.content.html;
      const regexImg = /<img.*?(?:>|\/>)/gi;
      let pImg = await self.content.html.match(regexImg);
      if (pImg) {
        const regexSrc = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        // const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
        // const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let size, flag;
        pImg.forEach((x, i) => {
          let srcArray = x.match(regexSrc);
          flag = `<div class='imgbox' style='background: #fff; width: 100%; min-height:212px'>
                    <img src='${self.defaultImg}' data-src='${
            srcArray[1]
          }' width='${self.$deviceWidth}' height='auto'/>
                    </div>`;
          // 替换插入需要的值
          // 正则替换富文本内的img标签
          // 替换不同文本
          const regexPImg1 = new RegExp(x);
          self.content.html = self.content.html.replace(regexPImg1, flag);
        });
      }
      const regexVideo = /<video.*?(?:>|\/>|<\/video>)/gi;
      var pVideo = await self.content.html.match(regexVideo);
      if (pVideo) {
        // 正则替换富文本内 img标签 待发布（npm）
        const regexUrl = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexVid = /vid=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexCover = /imageUrl=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let flg;
        pVideo.forEach((x, i) => {
          // 匹配imageurl属性下的值
          let urlArray = x.match(regexUrl);
          // 匹配vid属性下的值
          let vidArray = x.match(regexVid);
          let coverArray = x.match(regexCover);
          // // 替换插入需要的值flg
          // let temp = pVideo[i].split('<p>');
          if (self.$store.state.GET_MESSAGE_STATE) {
            flg = `<div 
              class='imgbox'
              data-vid='${vidArray[1]}' 
              style='background-color: rgba(0,0,0,1); width: 100%; min-height:212px; position:relative;'>
              <video src='${urlArray[1]}'
                controls='controls' 
                preload='none' 
                webkit-playsinline='true'
                playsinline='true'
                x-webkit-airplay='allow'
                x5-video-player-type='h5'
                x5-video-orientation='portraint'
                style='width: 100%; height:240px;  overflow:hidden;object-fit: fill;'
                poster='${coverArray[1]}' 
                data-cover='${coverArray[1]}'>
              </video>
            </div>`;
          } else {
            flg = `<div 
              class='imgbox' 
              @click='showVid' 
              data-vid='${vidArray[1]}' 
              style='background:rgba(0,0,0,.3) url("${coverArray[1]}"); 
                background-position: 50% 50%;
                background-repeat: no-repeat; 
                width: 100%; 
                height:64vw; 
                position:relative;'>
              <div 
                class='flex 
                flex-align-center 
                flex-pack-center' 
                data-vid='${vidArray[1]}' 
                style='position:absolute;left:0;top:0;bottom:0;right:0;background:rgba(0,0,0,.3);'>
                <span 
                  class='icon-font icon-shipin' 
                  data-vid='${vidArray[1]}' 
                  style='font-size: 60px; color: #ddd;'>
                </span>
              </div>
            </div>`;
          }
          const regexVideo1 = new RegExp(x);
          self.content.html = self.content.html.replace(regexVideo1, flg);
        });
      }
      const regexIframe = /<iframe.*?(?:>|\/>|<\/iframe>)/gi;
      var piFrame = await self.content.html.match(regexIframe);
      if (piFrame) {
        const regexWidth = /width=[\'\"]?([^\'\"]*)[\'\"]?/i;
        const regexHeight = /height=[\'\"]?([^\'\"]*)[\'\"]?/i;
        piFrame.forEach((x, i) => {
          let widthArray = x.match(regexWidth);
          let heightArray = x.match(regexHeight);
          let newsplit = x.split(widthArray[0]);
          let newstr = `${newsplit[0]}width="100%"${newsplit[1]}`;
          let newsplit1 = newstr.split(heightArray[0]);
          let newstr1 = `${newsplit1[0]} height="240" ${newsplit1[1]}`;
          let flag = `<div class="imgbox" style="width:100%; min-height: 212px;">
            ${newstr1}</iframe>
          </div>`;
          self.content.html = self.content.html.replace(regexIframe, flag);
        });
      } else {
        return self.content.html;
      }
      return self.content.html;
    },
    async compile() {
      let self = this;
      // 变量html是生成好的vue格式的HTML模板字符串，
      // 这个模板里面可以包含各种vue的指令，数据绑定等操作，
      // 比如 v-if, :bind, @click 等。
      const html = await self.parseLongGraphic();
      // Vue.extend是vue的组件构造器，专门用来构建自定义组件的，
      // 但是不会注册，类似于js中的createElement，
      // 创建但是不会添加。
      // 在这里创建出一个子组件对象构造器。
      const Component = Vue.extend({
        // 模板文件。由于Markdown解析之后可能会有多个根节点，
        // 因此需要包裹起来。
        // 实际的内容是：
        template: `<div> ${html} </div>`,
        // 这里面写的就是这个动态生成的新组件中的方法了，
        // 当然你也可加上data、mounted、updated、watch、computed等等。
        methods: {
          // 上面模板中将点击事件绑定到了这里，因此点击了之后就会调用这个函数。
          // 你可以写多个函数在这里，但是这里的函数的作用域只限在这个子组件中。
          showVid(el) {
            location.href = `/?vid=${el.target.offsetParent.dataset.vid}`;
          }
        },
        mounted() {
          this.$nextTick(() => {
            if (typeof window != "undefined") {
              window.onload = function() {
                let tjimg = document.querySelector(".feed-cover");
                if (tjimg.dataset.original) {
                  setTimeout(() => {
                    tjimg.src = tjimg.dataset.original;
                  }, 200);
                }
                let tjimg2 = document
                  .getElementById("tjimg")
                  .getElementsByTagName("img");
                Array.prototype.forEach.call(tjimg2, function(x, i) {
                  if (x.dataset.src) {
                    setTimeout(() => {
                      x.src = x.dataset.src;
                    }, 500);
                  }
                });
              };
            }
          });
        }
      });
      // new Component()是将上面构建的组件对象给实例化，
      // $mount()是将实例化的组件进行手动挂载，
      // 将虚拟dom生成出实际渲染的dom，
      // 这里的markedComponent是完成挂载以后的子组件
      const markedComponent = new Component().$mount();
      // // 将挂载以后的子组件dom插入到父组件中
      // // markedComponent.$el就是挂载后生成的渲染dom

      self.$refs["markedContent"].appendChild(markedComponent.$el);
      if (self.$refs["markedContent"].offsetHeight <= 300) {
        self.lessContent = false;
      } else {
        self.lessContent = true;
      }
    },
    async compile1() {
      self.htmls = await this.parseLongGraphic();
    },
    // vid
    showVid2(vid) {
      location.href = `/?vid=${vid}`;
    },
    tofeed(fid) {
      location.href = `closer://feed/${fid}`;
    },
    // 去留言
    async toMessage(item) {
      let self = this;
      self.item = item;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.visibleMessage = true;
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
    async sure() {
      let self = this;
      if (self.textarea == "") {
        self.$toast({
          message: "内容不能为空！",
          position: "top"
        });
        return false;
      }
      try {
        let para = {
          subjectid: self.item.subjectid,
          content: self.textarea,
          lastid: self.item.commentid
        };
        let data = await self.$axios.$post(`${api.admin.add_reply}`, para);
        if (data.code === 0) {
          await self.messageList();
          self.$toast({
            message: "留言成功",
            position: "top"
          });
          self.visibleMessage = false;
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
      }
    },
    cancel() {
      this.visibleMessage = false;
    },
    // 去点赞
    async toSupport(item, index) {
      let self = this;
      self.isIndex = index;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.support(item);
        return;
      } else {
        // 前期仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          // self.$toast({
          //   message: "没有token",
          //   position: "top"
          // });
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 点赞接口 closer_reply.like
    async support(item) {
      let self = this;
      try {
        let para = {
          subjectid: item.subjectid,
          commentid: item.commentid,
          flag: item.isLike ? 0 : 1
        };
        let data = await self.$axios.$post(`${api.admin.like}`, para);
        if (data.code === 0) {
          self.$set(item, "isLike", !item.isLike);
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
      }
    },
    // 留言列表
    async messageList() {
      let self = this;
      try {
        let para1 = {
          pagesize: 5,
          pagenum: 1,
          subjectid: self.$route.params.id
        };
        let data = await self.$axios.$post(`${api.command.comments}`, para1);
        if (data.code === 0) {
          self.messagelist = data.result;
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
      }
    },
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    hiddenTextArea() {
      this.visibleMessage = false;
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
  mounted() {
    // console.log(this.$store.state);
    if (this.$store.state.GET_MESSAGE_STATE) {
      this.messageList();
    }
    // 判断是否是长图文
    if (this.$store.state.res.int_type === 2) {
      this.compile();
    }
  }
};
</script>
<style>
.learn-more {
  margin-top: 8px;
  height: 36px;
  line-height: 36px;
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

.video-player {
  margin: 2.668vw 0;
}
</style>
<style scoped>
#feed {
  padding: 0 0 4vw;
  box-sizing: border-box;
  font-size: 13px;
  padding-bottom: 0;
}
/* 视频特殊处理 */
.videofeed .box {
  height: calc(177.87vw - 200px);
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 200px;
}
.feed-doc {
  padding-bottom: 4vw;
}

.feeder-info,
.feed-messagebord-type,
.feed-messagebord,
.feed-messagebord-list,
.feeder-title,
.read-num,
.feeder-comments {
  padding: 0 4vw;
}

.read-num {
  margin-bottom: 2.668vw;
  color: #888;
}

.feeder-title {
  font-size: 18px;
  margin-bottom: 2.668vw;
  font-weight: bold;
  white-space: pre-line;
  line-height: 1.6;
}

.feeder-title-2 {
  font-size: 16px;
  font-weight: 400;
  margin: 4vw 0;
}
.feeder-title-3 {
  font-size: 20px;
  font-weight: bold;
}
.feeder-cover {
  padding: 4vw 4vw 0;
}

.feeder-cover > img {
  width: 21.87vw;
  height: 8.54vw;
}

.feeder-content {
  margin-top: 5.34vw;
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
  width: 9.07vw;
  height: 9.07vw;
  max-width: 68px;
  max-height: 68px;
  border-radius: 100%;
  margin-right: 1.33vw;
  margin-bottom: 3px;
}

.feeder-info {
  margin: 2.668vw 0;
}

.videoNav {
  height: 60px;
}
.feeder-info {
  color: #94928e;
}

.feed-messagebord {
  height: 10.67vw;
  border-bottom: 1px solid #eee;
}

.feed-messagebord-type {
  height: 10.67vw;
  color: #94928e;
  font-size: 14px;
}

.feeder-title {
  text-align: justify;
}

.feed-publication-number {
  margin-right: 2.67vw;
}

.feed-messagebord-left {
  font-size: 15px;
  color: #444;
  font-weight: 600;
}

.messager-comment {
  color: #495060;
}

.messager-name {
  font-size: 14px;
}

.feed-messagebord-list-cell {
  border-bottom: 1px solid #eee;
  padding: 2.668vw 0 0;
}

.messager-content {
  margin: 2.668vw 0;
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
  margin-top: 3.33vw;
}

.feeder-comments-cell {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(243, 243, 243);
  margin-bottom: 2.668vw;
  padding: 2.67vw 2.67vw;
}

.feeder-comment-info {
  margin-top: 0.66vw;
}

.feeder-comment-info > i {
  margin-right: 2.67vw;
  width: 9.07vw;
  height: 9.07vw;
  max-width: 68px;
  max-height: 68px;
  border-radius: 100%;
}

.feeder-comment-3 {
  height: 16.54vw;
  box-sizing: border-box;
  padding: 2.67vw;
  border-radius: 6px;
  border: 1px solid #d7d7d9;
  background: #f6f6f6;
}

.feeder-comment-3-cover > i {
  display: block;
  margin-right: 2.67vw;
  width: 11.47vw;
  height: 11.47vw;
  max-width: 86px;
  max-height: 86px;
  border-radius: 6px;
}

.feeder-comment-3-title {
  font-size: 15px;
  height: 15px;
  line-height: 1;
  overflow: hidden;
  margin-bottom: 2.67vw;
}

.feeder-comment-3-summary {
  font-size: 12px;
  height: 12px;
  line-height: 1;
  color: rgba(148, 146, 142, 1);
  overflow: hidden;
}

.feeder-comment-nickname {
  font-size: 12px;
  color: rgba(148, 146, 142, 1);
  margin-bottom: 2.4vw;
  line-height: 1;
}

.feeder-comment-img {
  width: 100%;
  border-radius: 3px;
}

.messager-comments {
  padding: 1.335vw 2.67vw;
  background-color: #f4f4f4;
  margin-bottom: 2.67vw;
}

.messager-comments-cell {
  box-sizing: border-box;
  padding: 0.67vw 0;
}
.summary {
  text-align: justify;
}

.summary2 {
  height: 53.36vw;
  position: relative;
  overflow: hidden;
  transition: height 0.5s;
}

.category1 {
  height: auto;
}

.collapse {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 21.334vw;
  line-height: 6.4vw;
  text-align: center;
  font-size: 15px;
  color: #507caf;
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -o-linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -moz-linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -webkit-linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0.3),
    white 65%
  );
}

.collapse2 {
  background: #fff;
  position: static;
  height: 10.67vw;
}

.message-num {
  height: 10.67vw;
  line-height: 10.67vw;
  padding: 0 4vw;
  box-sizing: border-box;
  font-size: 16px;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 2.67vw;
  font-weight: bold;
}

.supports > img {
  width: 16px;
  height: 14px;
}

.dpTextArea {
  width: 100%;
  padding: 0 4vw 4vw;
  background: #fff;
  min-height: 180px;
  box-sizing: border-box;
  padding-top: 13.07vw;
}

.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 6.9vw;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  height: 8vw;
  line-height: 8vw;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2vw;
}

.cancel {
  margin-right: 2.67vw;
}
</style>
