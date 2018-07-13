<template>
  <div id="feed" :class="{ 
    videofeed: $store.state.res.int_type === 1,
    feed2: !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
    }">
    <div :class="{ 
      box: true,
      'feed-box': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
     }">
      <div class="feed-1">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <div class="feed-doc" id="imgListFeed" v-if="$store.state.res.int_type === 0">
          <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <div v-if="$store.state.GET_MESSAGE_STATE">
            <div class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images && $store.state.content.images.length == 1">
              <div class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)" :key="index">
                <!-- <img class="feed-cover-list" v-lazy="$com.makeFileUrl(img.link)" v-preview="$com.makeFileUrl(img.link)"> -->
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <div class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">                
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <div class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
              <div class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 视频 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 1">
          <div class="video-doc">
            <div class="videoNav flex flex-align-center">
              <img class="access-not" :src="$store.state.res.blogo">
              <span class="communityName ellipsis flex-1">{{ $store.state.res.communityName }}</span>
              <div>
                <!-- 关注补丁 -->
                <mt-button type="primary" size="small" class="flex tj-focus-btn cursor">
                  <span>
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
          <div class="feeder-img feeder-img-bgcover" v-if="$store.state.res.bigcover">
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover feed-cover-bgcover" :src="$com.makeFileUrl($store.state.res.bigcover)" 
            >
            <div class="hide-over"></div>
          </div>
          <div class="feeder-img feeder-img-cover" v-else>
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover feed-cover-cover" data-index= "0" :src="$com.makeFileUrl($store.state.res.cover)">
            <div class="hide-over"></div>
          </div>
          <div class="feeder-content" id="tjimg" >
            <!-- 标题 -->
            <div class="feeder-title feeder-title-2 feeder-title-3"> {{ $store.state.res.title }} </div>
            <!-- 阅读量 -->
            <div class="feed-messagebord-type flex flex-align-center flex-pack-justify" v-if="$store.state.res.int_category === 1">
              <span> {{ $com.createTime($store.state.res.long_time_line, 'yy.mm.dd') }}前截止</span>
              <span>
                <span class="feed-publication-number">投稿 0</span>
                <span>赞 0</span>
              </span>
            </div>
            <div class="read-num" v-else>阅读 <span class="incrviewnum">999</span></div>
            <div v-if="$store.state.res.int_category != 1" class="summary tj-sum" v-html="$store.state.content.html">
            </div>
            <div v-else>
              <div class="summary" v-html="$store.state.content.html">
              </div>
              <div class="feeder-info flex flex-pack-justify flex-align-center">
                <span>
                  <span>阅读 <span class="incrviewnum">999</span></span>
                </span>
                <span>
                  <span style="margin-right: 10px;">
                    <span v-if="$store.state.res.isOffical">官方出品</span>
                    <span v-else>{{ $store.state.res.communityName }} @{{ $store.state.res.fullname }}</span>
                  </span>
                  <span>刚刚</span>
                </span>
              </div>
            </div>
            <!-- 神议论列表 -->
            <div v-if="$store.state.res.int_category === 3">
              <ul class="feeder-comments">
                <li class="feeder-comments-cell flex flex-align-start" v-for="(item, index) in $store.state.discuss" :key="index">
                  <div class="feeder-comment-info flex flex-align-center flex-pack-end">
                    <i v-lazy:background-image="$com.makeFileUrl(item.avatar)"></i>
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
                        <img class="feeder-comment-img" data-index="99" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="$com.makeFileUrl(item.image.link)"
                        >
                        <span class="gif" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span>
                      </div>
                      <img v-else class="feeder-comment-img" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="$com.makeFileUrl(item.image.link)">
                    </div>
                    <!-- 包含贴子 -->
                    <div v-else-if="item.type === 3" class="feeder-comment flex flex-align-center feeder-comment-3">
                      <div class="feeder-comment-3-cover flex">
                        <i v-if="item.feed.imageUrl" v-lazy:background-image="$com.makeFileUrl(item.feed.imageUrl)"></i>
                      </div>
                      <div>
                        <div class="feeder-comment-3-title">{{ item.feed.title }}</div>
                        <div class="feeder-comment-3-summary">{{ item.feed.summary }}</div>
                      </div>
                    </div>
                    <!-- 包含视频 -->
                    <div v-else-if="item.type === 2">
                      <div v-if="$store.state.GET_MESSAGE_STATE">
                        <div class="imgbox feed-imgbox">
                          <video :src="item.video.src" controls="controls" preload="none" 
                            :poster="item.video.imageUrl" :data-cover="item.video.imageUrl">
                          </video>
                        </div>
                      </div>
                      <div v-else class="imgbox feed-imgbox-else feed-video-bg" 
                      :data-vid="item.video.vid" :data-bg="item.video.imageUrl" :style="{
                          backgroundImage: 'url('+defaultImg+')',
                          }">
                        <div class="flex flex-align-center flex-pack-center feed-imgbox-else-child" :data-vid="item.video.vid">
                          <span class="icon-shipin-2" :data-vid="item.video.vid"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="$store.state.content.end_html" class="god-discuss-end-tag summary" v-html="$store.state.content.end_html"></div>
            </div>
          </div>
        </div>
        <!-- 发帖者信息 -->
        <div v-if="$store.state.res.int_category != 1" class="feeder-info flex flex-pack-justify flex-align-center">
          <span class="flex-1 ellipsis" v-if="$store.state.res.int_category === 3">
            <span v-if="$store.state.res.user && $store.state.res.user.fullname">
              <span>{{ $store.state.res.className }} @{{ $store.state.res.user.fullname }}</span>
            </span>
          </span>
          <span class="flex-1 ellipsis" v-else>
            <span>
              <span v-if="$store.state.res.isOffical">官方出品</span>
              <span v-else-if="$store.state.res.user && $store.state.res.user.fullname">{{ $store.state.res.communityName }} @{{ $store.state.res.user.fullname }}</span>
            </span>
          </span>
          <span style="margin-left: 10px">刚刚</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "Feed",
  data() {
    return {
      textarea: "",
      item: {},
      visibleMessage: false,
      isLike: false,
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      loading: 1, // 按钮执行状态
      disabled: false, // 按钮可用状态
      res: {},
      content: {
        html: ""
      },
      isActive: true,
      // 投稿类型
      vid: "",
      messagelist: "",
      showMore: false
    };
  },
  methods: {},
  beforeMount() {
    let self = this;
    window.addEventListener(
      "message",
      function(event) {
        console.log(event);
        console.log(event.data);
        let content = JSON.parse(event.data.content);
        self.$store.commit("SET_CONTENT", content);
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
      // 获取阅读量
      if (self.$store.state.GET_MESSAGE_STATE) {
      }
      if (typeof window != "undefined") {
        // 贴子封面异步加载
        let tjcover = document.querySelector(".feed-cover");
        if (tjcover && tjcover.dataset.src) {
          setTimeout(() => {
            tjcover.src = tjcover.dataset.src;
          }, 0);
        }
        let tjimg = document.getElementById("tjimg");
        // 长图文图片异步加载
        if (tjimg) {
          let tjimg2 = tjimg.getElementsByTagName("img");
          if (tjimg2) {
            Array.prototype.forEach.call(tjimg2, function(x, i) {
              if (x.dataset.src) {
                setTimeout(() => {
                  x.src = x.dataset.src;
                }, 500);
              }
            });
          }
        }
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
/* 视频特殊处理 */
.videofeed {
  height: calc(100% - 56.25vw);
}
.videofeed .box {
  /* height: calc(100% - 56.25vw); */
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 56.25vw;
  box-sizing: border-box;
}
.learn-more {
  margin-top: 8px;
  line-height: 49px;
  font-size: 16px;
  color: #409eff;
  padding-top: 44px;
  height: 93px;
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
.video-player {
  margin: 2.668vw 0;
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
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 56.25vw;
  position: relative;
}
.tiejin-videobox > video {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
}
.tiejin-videobox-native {
  background-position: 50% 50%;
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
</style>
<style scoped>
#feed {
  padding: 0 0 4vw;
  box-sizing: border-box;
  font-size: 13px;
  padding-bottom: 0;
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
.works {
  padding-top: 5.34vw;
}

.works {
  padding-bottom: 4vw;
  position: relative;
}

.works .title {
  text-align: left;
  margin-left: 4.67vw;
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
.feeder-comment {
  font-size: 15px;
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
  font-weight: 400;
  /* margin: 4vw 0 2.13vw; */
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
.feed-imgbox {
  width: 100%;
  height: 48vw;
  position: relative;
  border-radius: 3px;
}
.feed-imgbox > video {
  width: 100%;
  height: 48vw;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
.feed-imgbox-else {
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 48vw;
  position: relative;
  border-radius: 3px;
}
.feed-imgbox-else > div.feed-imgbox-else-child {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
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
  margin-bottom: 2.668vw;
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
  font-size: 15px;
}

.messager-time {
  font-size: 12px;
  color: #999;
}

.feeder-img-list {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}
.feeder-img-list-cell-1 {
  width: 100%;
  height: 100%;
}
.feeder-img-list-cell-2 {
  width: 49.5%;
  height: 0;
  padding-bottom: 49.5%;
}
.feeder-img-list-cell-3 {
  width: 33%;
  height: 0;
  padding-bottom: 33%;
  margin-bottom: 0.5%;
  margin-right: 0.5%;
}
.feeder-img-list-cell-4 {
  width: 49.5%;
  height: 0;
  padding-bottom: 49.5%;
  margin-bottom: 1%;
}
.icon-add {
  font-size: 14px;
  margin-right: 2px;
}
.feeder-img-bgcover {
  position: relative;
  width: 100%;
  height: 124vw;
}
.feeder-img-cover {
  position: relative;
  width: 100%;
  height: 57vw;
}
.feed-cover-bgcover {
  display: block;
  position: relative;
  width: 100%;
  height: 124vw;
}
.feed-cover-cover {
  display: block;
  position: relative;
  width: 100%;
  height: 57vw;
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

.feeder-comments,
.god-discuss-end-tag {
  margin-top: 6.66vw;
}

.feeder-comments-cell {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(243, 243, 243);
  margin-bottom: 2.668vw;
  padding: 2.67vw 2.67vw;
}

.feeder-comment-info {
  margin-top: 0.66vw;
  width: 13vw;
}

.feeder-comment-info > i {
  margin-right: 2.67vw;
  width: 9.07vw;
  height: 9.07vw;
  max-width: 68px;
  max-height: 68px;
  border-radius: 100%;
  background-size: cover;
  background-position: 50% 50%;
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
  background-size: cover;
  background-position: center center;
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
  font-size: 13px;
  color: rgba(148, 146, 142, 1);
  margin-bottom: 2.4vw;
  line-height: 1;
}

.feeder-comment-img {
  width: 73vw;
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
.messages > img {
  width: 18px;
  height: 15px;
}
.supports > img {
  width: 19px;
  height: 15px;
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
/*全局控制 富文本内图片样式*/

.summary {
  font-size: 17px;
  line-height: 1.54;
  letter-spacing: 0.5px;
  padding: 0 4vw;
}

.summary > p,
.summary > ol,
.summary > ul,
.summary > div,
.summary > section,
.summary > article,
.summary > aside {
  margin-bottom: 2.668vw;
}

p:empty {
  margin: 0;
  padding: 0;
}

.summary img {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}

.summary video {
  width: 100%;
}

.sumary iframe {
  width: 100% !important;
}
</style>
