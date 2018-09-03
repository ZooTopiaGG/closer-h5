<template>
  <section id="feed" :class="{ 
    feed2: !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
    }">
    <section :class="{ 
      box: true,
      'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
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
          <section v-if="$store.state.is_closer_app">
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
                <span class="feed-publication-number">投稿 0</span>
              </span>
            </section>
            <!-- logo -->
            <logo-tab></logo-tab>
            <section class="summary tj-sum" v-html="$store.state.content.html">
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
          <section class="read-num">阅读 <span class="incrviewnum">0</span></section>
          <section class="flex flex-align-center" v-if="$store.state.is_closer_app">
            <img class="sup-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC" alt="图片"/>
            <span> 0 </span>
          </section>
          <section class="flex flex-align-center" v-else>
            <span> 刚刚 </span>
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
      video: {}
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
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/feedid.less";
</style>
