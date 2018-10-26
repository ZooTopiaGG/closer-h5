<template>
  <section id="feed" :class="{ 
    feed2: !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
    }">
    <section :class="{ 
      box: true,
      'feed-box-0': $store.state.res.int_type === 0,
      'feed-box-1': $store.state.res.int_type === 1
     }">
      <section :class="{
        'feed-1': true,
      }">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <section class="feed-doc" id="imgListFeed" v-if="$store.state.res.int_type === 0">
          <logo-tab></logo-tab>
          <paper-top></paper-top>
          <section v-if="!($store.state.res.int_type === 2 && $store.state.res.int_category === 2)" class="feeder-title feeder-title-2 feeder-type-0">{{ $store.state.content.text }}</section>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <section class="feeder-images" v-if="$store.state.not_closer_app">
            <section class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images && $store.state.content.images.length == 1">
              <section class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in $store.state.content.images" :style="{backgroundImage: 'url('+$com.makeFileUrl(img.link)+')'}" :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <section class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in $store.state.content.images" :style="{backgroundImage: 'url('+$com.makeFileUrl(img.link)+')'}""
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">                
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <section class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in $store.state.content.images" :style="{backgroundImage: 'url('+$com.makeFileUrl(img.link)+')'}""
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </section>
            </section>
            <section class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
              <section class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in $store.state.content.images" :style="{backgroundImage: 'url('+$com.makeFileUrl(img.link)+')'}""
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
                  :style="{
                    'object-fit': 'fill',
                    width: '100vw',
                    height: $store.state.content.videos[0].height * 100 / $store.state.content.videos[0].width + 'vw'
                  }"
                  :data-cover="$store.state.content.videos[0].imageUrl">
                </video>
                <dp-video elem="feed-h5-videos-horizontal" :duration="$store.state.content.videos[0].duration"></dp-video>
                <section class="feed-h5-bottom"></section>
              </section>
              <logo-tab></logo-tab>
              <paper-top></paper-top>
            </section>
            <!-- 竖视频 -->
            <section v-else>
              <section 
                v-if="$store.state.res.int_type === 1 && ($route.path.indexOf('/feed')>-1 || $route.path.indexOf('/preview')>-1)" 
                class="feed-h5-videos feed-h5-videos-vertical"
                :style="{
                  width: '100vw',
                  height: $store.state.content.videos[0].height * 100 / $store.state.content.videos[0].width + 'vw',
                  overflow: 'hidden',
                  backgroundImage: 'url('+$store.state.content.videos[0].imageUrl+')'
                }">
                <video 
                  :src="$store.state.content.videos[0].src" 
                  preload="auto"
                  webkit-playsinline="true" 
                  x-webkit-airplay="true"  
                  playsinline="true" 
                  :style="{
                    'object-fit': 'fill',
                    width: '100%',
                    height: 'auto'
                  }"
                  id="feed-h5-videos-vertical"                  
                  :data-cover="$store.state.content.videos[0].imageUrl">
                </video>
                <dp-video elem="feed-h5-videos-vertical" :duration="$store.state.content.videos[0].duration"></dp-video>
                <section class="feed-h5-bottom"></section>
              </section>
              <logo-tab></logo-tab>
              <paper-top></paper-top>
            </section>
            <section class="feeder-title feeder-title-2 feeder-type-1">{{ $store.state.content.text }}</section>
          </section>
        </section>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <section class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <!-- 兼容1.2版本 以及外部浏览器 不需要封面的问题 -->
          <section v-if="!$store.state.version_1_2 || $store.state.is_closer_app">
            <section class="feeder-img feeder-img-bgcover" v-if="$store.state.res.bigcover">
              <!-- 大封面 -->
              <img class="feed-cover feed-cover-bgcover" :src="$com.makeFileUrl($store.state.res.bigcover)" data-index= "0" 
              >
              <section class="hide-over"></section>
            </section>
            <section class="feeder-img feeder-img-cover" v-else-if="$store.state.res.int_category === 3">
              <!-- 小封面 -->
              <img class="feed-cover feed-cover-cover" :src="$com.makeFileUrl($store.state.res.cover)" data-index= "0">
              <section class="hide-over"></section>
            </section>
          </section>
          <!-- 1.3.1 版本 start-->
          <section class="feeder-content" id="tjimg" v-video="{selector: 'video'}">
            <!-- 标题 -->
            <section v-if="((!$store.state.version_1_3 && !$store.state.version_1_4) || $store.state.not_closer_app) &&
        $store.state.res.int_category != 1 && !($store.state.res.int_type === 2 && $store.state.res.int_category === 2)" class="feeder-title feeder-title-2 feeder-title-3 feeder-title-4">{{ $store.state.res.title }} </section>
            <section v-if="$store.state.version_1_3 && $store.state.res.int_category != 1 && $store.state.res.int_category != 2">
              <section class="feeder-img feeder-img-bgcover feed-img-bgcover_1_3_1" v-if="$store.state.res.bigcover">
                <!-- 大封面 -->
                <img class="feed-cover feed-cover-bgcover feed-cover-bgcover_1_3_1" :src="$com.makeFileUrl($store.state.res.bigcover)" data-index= "0" 
                >
              </section>
              <section class="feeder-img feeder-img-cover feed-img-cover_1_3_1" v-else-if="$store.state.res.int_category === 3">
                <!-- 小封面 -->
                <img class="feed-cover feed-cover-cover feed-cover-cover_1_3_1" :src="$com.makeFileUrl($store.state.res.cover)" data-index= "0">
              </section>
            </section>
            <!-- 征稿 截止时间 1.4之前显示 1.4之后隐藏 -->            
            <section class="feed-messagebord-type flex flex-align-center flex-pack-justify" v-if="!$store.state.version_1_4 && !$store.state.not_closer_app && $store.state.res.int_category === 1">
              <span> {{ $com.createTime($store.state.res.long_time_line, 'yy.mm.dd') }}前截止</span>
              <span>
                <span class="feed-publication-number">投稿 {{$store.state.res.collectionTotalCount}}</span>
              </span>
            </section>
            <!-- logo -->
            <logo-tab></logo-tab>
            <section class="paper_height">
              <section v-if="$store.state.res.int_category === 1 && ($store.state.not_closer_app || $store.state.version_1_4) && !($store.state.res.int_type === 2 && $store.state.res.int_category === 2)" class="feeder-title feeder-title-2 feeder-title-3"><span class="call_papers_1_4" v-if="$store.state.res.int_category === 1">话题</span> {{ $store.state.res.title }} </section>
              <paper-top></paper-top>
              <!-- 暂时隐藏 -->
              <section class="summary-content">
                <section ref="summarys" :class="{
                  'summary': true, 
                  'tj-sum': true,
                  'summary_1_3_1': $store.state.version_1_3,
                  'call_pagers_fold_1_4': ($store.state.version_1_4 || $store.state.not_closer_app) && $store.state.res.int_category === 1 && isCollapse
                }" v-html="$store.state.content.html" @click="openClick($event)">
                </section>
                <section  @click="collapse" 
                v-if="($store.state.version_1_4 || $store.state.not_closer_app) && $store.state.res.int_category === 1 && isCollapse" 
                class="flex flex-align-end flex-pack-center fold">
                  <section class="flex flex-align-center">
                    <span>展开全文</span> <i class="fold-icon"></i>
                  </section>
                </section>
              </section>
            </section>
          </section>
          <!-- 1.3.1 版本 end-->
        </section>
        <!-- 发帖者信息 神议论和长图文区别 -->
        <section v-if="!$store.state.version_1_2 && $store.state.res.int_category != 1 && $store.state.res.int_category != 2">
          <section class="author-list" v-if="$store.state.res.int_category != 3">
            <p v-if="$store.state.res.nickname">编辑：<span>{{ $store.state.res.nickname }}</span></p>
            <p v-if="$store.state.res.authors">作者：{{ $store.state.res.authors }} </p>
          </section>
          <section v-else class="author-list">
            <p>来自 <span>{{ $store.state.res.className }}</span></p>
          </section>
        </section>
        <!-- 阅读量 点赞数 -->
        <section class="end-data flex flex-v" v-if="!$store.state.version_1_2 && $store.state.not_closer_app && !($store.state.res.int_type == 2 && $store.state.res.int_category == 1)">
          <section class="flex flex-v flex-align-center">
            <section class="sup-icon-bg flex flex-align-center flex-pack-center">
              <img class="sup-icon" ref="sup" src="~/assets/images/icon_like.png"/>
            </section>
            <span>点赞</span>
          </section>
          <section class="read-num">阅读 <span class="incrviewnum"> 0 </span></section>
        </section> 
      </section>
      <section v-if="$store.state.not_closer_app">
        <!-- 征稿列表 -->
        <section v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1">
          <!-- <dp-feed title="精彩投稿" :feed-list="paper_list" v-if="paper_list.length > 0"></dp-feed> -->
          <section class="split-box"></section>           
          <section class="paper_list flex flex-align-center">
            <section class="flex-1 flex flex-pack-center" @click="theSelect('精华')">
              <span :class="{paper_choose_select: is_the_select, paper_choose: true}">精华</span>
            </section>
            <section class="flex-1 flex flex-pack-center" @click="theSelect('全部')">
              <span :class="{paper_choose_all: !is_the_select, paper_choose: true}">全部</span>
            </section>
          </section>
          <section class="nothings">
            <nothing></nothing>
          </section>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import logoTab from "~/components/logo";
import dpVideo from "~/components/dpvideo";
export default {
  name: "Feed",

  components: {
    logoTab,
    dpVideo
  },
  data() {
    return {
      item: {},
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      res: {},
      content: {
        html: ""
      },
      // 投稿类型
      vid: "",
      video: {},
      isCollapse: true,
      is_the_select: "精华"
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
    // 在app端 神议论贴子 打开原生视频
    collapse() {
      let self = this;
      self.isCollapse = !self.isCollapse;
      if (self.$store.state.agent.indexOf("closer-ios") > -1) {
        if (window.WebViewJavascriptBridge) {
          self.$com.setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler("handleUnfold", null);
          });
        }
      } else {
        if (typeof window.bridge != "undefined") {
          window.bridge.handleUnfold(null);
        }
      }
    },
    async theSelect(type) {
      let self = this;
      self.is_the_select = type === "精华";
    }
  },
  beforeMount() {
    let self = this;
    window.addEventListener(
      "message",
      function(event) {
        console.log("event==", event);
        console.log("event.data====", event.data);
        self.$store.commit("SET_CONTENT", event.data.content);
        self.$store.commit("SET_RES", event.data);
        // 这里不准确，chrome没有这个属性
        var origin = event.origin || event.originalEvent.origin;
        console.log("origin == ", origin);
      },
      false
    );
  },
  mounted() {
    let self = this;

    self.$nextTick(() => {
      if (typeof window != "undefined") {
        // 视频封面异步加载
        let videobg = document.querySelectorAll(".feed-video-bg");
        if (videobg) {
          Array.prototype.forEach.call(videobg, function(x, i) {
            if (x.dataset.bg) {
              setTimeout(() => {
                if (self.$store.state.not_closer_app) {
                  x.setAttribute("poster", x.dataset.bg);
                } else {
                  x.style.backgroundImage = `url('${x.dataset.bg}')`;
                }
              }, 300);
            }
          });
        }
      }
    });
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/feedid.less";
@import "../../assets/css/feed.less";
</style>
