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
          <section class="feeder-title feeder-title-2 feeder-type-0">{{ $store.state.content.text }}</section>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <section class="feeder-images" v-if="$store.state.is_closer_app">
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
                <dp-video elem="feed-h5-videos-horizontal" :duration="$store.state.content.videos[0].duration"></dp-video>
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
                <dp-video elem="feed-h5-videos-vertical" :duration="$store.state.content.videos[0].duration"></dp-video>
                <section class="feed-h5-bottom"></section>
              </section>
              <logo-tab></logo-tab>
            </section>
            <section class="feeder-title feeder-title-2 feeder-type-1">{{ $store.state.content.text }}</section>
          </section>
        </section>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <section class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <section v-if="!$store.state.version_1_2 || $store.state.is_closer_app">
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
            <!-- 暂时隐藏 -->
            <section class="feeder-cover flex flex-align-center" v-if="!$store.state.is_closer_app">
              <span> {{ $com.getCommonTime($store.state.res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
            </section>
            <section class="summary tj-sum" v-html="$store.state.content.html" v-lazy-container="{ selector: 'img' }" v-video="{selector: 'video'}" @click="openClick($event)">
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
                      <!-- <span>{{ item.message_time }}</span> -->
                    </section>
                    <!-- 纯文本 link text-->
                    <section v-if="item.type === 0" class="feeder-comment">
                      <span v-if="item.weblink" v-html="item.newText"></span>
                      <span v-else>{{ item.text }}</span>
                    </section>
                    <!-- 包含图片 -->
                    <section v-else-if="item.type === 1" class="feeder-comment">
                      <section v-if="$store.state.is_closer_app" style="position:relative;">
                        <img class="feeder-comment-img" data-index="99" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="defaultImg" v-lazy="$com.makeFileUrl(item.image.link)"
                        >
                        <!-- <span class="cover_img_type" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span> -->
                      </section>
                      <section  v-else>
                        <img class="feeder-comment-img" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :src="defaultImg" v-lazy="$com.makeFileUrl(item.image.link)">
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
                      <section v-if="$store.state.is_closer_app">
                        <section class="imgbox feed-imgbox" v-video="{selector: 'video'}">
                          <video :src="item.video.src" controls="controls" preload="none" 
                            :poster="item.video.imageUrl" :data-cover="item.video.imageUrl">
                          </video>
                        </section>
                      </section>
                      <section v-else class="imgbox feed-imgbox-else feed-video-bg" 
                      @click="showVid2($event)"
                      :data-uid="item.video.src"
                      :data-vid="item.video.vid" :data-bg="item.video.imageUrl" :style="{
                          backgroundImage: 'url('+defaultImg+')',
                          }">
                        <section class="flex flex-align-center flex-pack-center feed-imgbox-else-child" :data-vid="item.video.vid" :data-uid="item.video.src"
                      >
                          <span class="icon-shipin-2" :data-vid="item.video.vid" :data-uid="item.video.src"></span>
                        </section>
                      </section>
                    </section>
                  </section>
                </li>
              </ul>
              <section v-if="$store.state.content.end_html" class="god-discuss-end-tag summary" v-lazy-container="{ selector: 'img' }" v-video="{selector: 'video'}" v-html="$store.state.content.end_html" @click="openClick($event)"></section>
            </section>
          </section>
        </section>
        <!-- 发帖者信息 神议论和长图文区别 -->
        <section v-if="!$store.state.version_1_2">
          <section class="author-list" v-if="$store.state.res.int_category != 3">
            <p v-if="$store.state.res.nickname">小编：<span>{{ $store.state.res.nickname }}</span></p>
            <p v-if="$store.state.res.authors">作者：{{ $store.state.res.authors }} </p>
          </section>
          <section v-else class="author-list">
            <p>来自 <span>{{ $store.state.res.className }}</span></p>
          </section>
        </section>
        <!-- 阅读量 点赞数 -->
        <section class="end-data flex flex-align-center flex-pack-justify" v-if="!$store.state.version_1_2">
          <section class="read-num">阅读 <span class="incrviewnum">{{ $store.state.incr_view }}</span></section>
          <section class="flex flex-align-center" @click="toSupport($event)" v-if="$store.state.is_closer_app">
            <img class="sup-icon" ref="sup" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC" alt="图片"/>
            <span ref="like" status='false'> {{ $store.state.res.like }}</span>
          </section>
          <section class="flex flex-align-center" v-else>
            <span> {{ $com.getCommonTime($store.state.res.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
          </section>
        </section> 
      </section>
      <!-- 精彩留言 -->
      <message-board v-if="$store.state.is_closer_app && !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)"></message-board>
      <section v-if="$store.state.is_closer_app">
        <!-- 征稿列表 -->
        <section v-if="$store.state.res.int_type === 2 && $store.state.res.int_category === 1">
          <dp-feed title="精彩投稿" :feed-list="paper_list" v-if="paper_list.length > 0"></dp-feed>
        </section>
        <!-- 热门文章 -->
        <dp-feed v-if="hot_list.length > 0" title="热门文章" :feed-list="hot_list"></dp-feed>
      </section>
    </section>
  </section>
</template>
<script>
import Cookie from "js-cookie";
import logoTab from "~/components/logo";
import messageBoard from "~/components/messageboard";
import dpVideo from "~/components/dpvideo";
export default {
  name: "Feed",
  async fetch({ params, store, app, query }) {
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
        if (store.state.is_closer_app) {
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
          } else {
            store.commit("ITS_LONG_VIDEO", false);
          }
          // 解析长图文html
          if (res.result.int_type === 2) {
            let _html = await $async.makeHtmlContent(
              content.html,
              store.state.is_closer_app
            );
            if (_html) {
              content.html = _html;
            }
            if (res.result.int_category === 3 && content.end_html) {
              let end_html = await $async.makeHtmlContent(
                content.end_html,
                store.state.is_closer_app
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
      if (
        this.$store.state.res.title &&
        this.$store.state.res.title != "title"
      ) {
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
    logoTab,
    messageBoard,
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
      vid: "",
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
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    // 在app端 神议论贴子 打开原生视频
    showVid2(event) {
      if (!(event.target.dataset.vid || event.target.dataset.uid)) {
        return;
      }
      this.$com.h5PlayVideo(
        event.target.dataset.uid,
        event.target.dataset.vid,
        this.$store.state.is_closer_app,
        this.$store.state.version_1_2,
        this.$store.state.agent.indexOf("closer-ios") > -1
      );
    },
    // 在app端 长图文贴子 打开原生视频
    openClick(event) {
      if (!(event.target.dataset.vid || event.target.dataset.uid)) {
        return;
      }
      this.$com.h5PlayVideo(
        event.target.dataset.uid,
        event.target.dataset.vid,
        this.$store.state.is_closer_app,
        this.$store.state.version_1_2,
        this.$store.state.agent.indexOf("closer-ios") > -1
      );
    },
    // 打开 神议论里的贴子
    tofeed(fid) {
      if (this.$store.state.is_closer_app) {
        this.$router.push({ path: `/feed/${fid}` });
      } else {
        location.href = `closer://feed/${fid}`;
      }
    },
    toSupport(e) {
      let t = this.$refs["like"].innerText;
      if (this.$refs["like"].getAttribute("status") === "false") {
        this.$refs["like"].innerText = parseInt(t) + 1;
      }
      this.$refs["like"].setAttribute("status", "true");
      if (e.target.nodeName === "IMG" || e.target.nodeName === "SPAN") {
        this.$refs["sup"].src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==";
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
      if (self.$store.state.is_closer_app) {
        // 栏目关注状态
        self.communityFocusStat();
        if (
          self.$store.state.res.int_type === 2 &&
          self.$store.state.res.int_category === 1
        ) {
          // 征稿列表
          self.paperList();
        }
        // 热门文章列表
        self.hotList();
        // 跳转到hash
        if (self.$route.hash) {
          document.documentElement.scrollTop = document.getElementById(
            "messageboard"
          ).offsetTop;
          document.body.scrollTop = document.getElementById(
            "messageboard"
          ).offsetTop;
        }
      }
      if (typeof window != "undefined") {
        // 视频封面异步加载
        let videobg = document.querySelectorAll(".feed-video-bg");
        if (videobg) {
          Array.prototype.forEach.call(videobg, function(x, i) {
            if (x.dataset.bg) {
              setTimeout(() => {
                if (self.$store.state.is_closer_app) {
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
    // 懒加载监听
    self.$Lazyload.$on("loaded", function({ el, src }) {
      let h = el.style.paddingBottom,
        f = el.dataset.feedlazy;
      if (f === "feedlazy" && h && parseInt(h) != 0) {
        el.style.cssText = `max-width: 100%;height: ${h}; padding-bottom: 0; box-sizing: content-box;`;
      } else if (f === "feedlazy2") {
        el.style.cssText = `height: auto;`;
      }
    });
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/feedid.less";
</style>
