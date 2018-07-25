<template>
  <section class="dpFeed">
    <section class="split-box"></section> 
    <section class="hots-article flex flex-align-center">
      {{ title }}
    </section> 
    <ul v-if="feedList && feedList.length > 0" class="feed-list flex-1">
      <li v-if="index < 5" class="feed-list-cell" @click="downApp($event, '', item.subjectid)" v-for="(item, index) in feedList" :key="index">
        <section class="feed-box">
          <section class="hide-feed-over"></section>
          <section class="feed-cell-content">
            <section class="columnname flex flex-align-center">
              <img v-lazy="item.blogo">
              <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
              <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
            </section>
            <!-- 贴子详情 -->
            <!-- 纯图片类型 int_type == 0-->
            <section class="feedmain" v-if="item.int_type === 0">
              <section v-if="item.content.text" class="feedtitle text-ellipse">
                {{ item.content.text }}
              </section>
              <!-- <section v-if="item.content.images && item.content.images.length === 1" class="flex flex-pack-justify feedimgcontent">
                <section class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                </section>
              </section>
              <section v-if="item.content.images && item.content.images.length === 2" class="flex flex-pack-justify feedimgcontent">
                <section class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                </section>
              </section> -->
              <section v-if="item.content.images && item.content.images.length > 0" class="flex feedimgcontent">
                <section class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                  <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                  <span class="more-image" v-if="index === item.content.images.length -1 && item.content.images.length > 3">{{ item.content.images.length }}张更多</span>
                </section>
              </section>
              <!-- <section v-if="item.content.images && item.content.images.length === 4" class="flex flex-pack-justify feedimgcontent">
                <section class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
              <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                </section>
              </section> -->
            </section>
            <!-- 视频贴 int_type == 1-->
            <section class="feedmain" v-else-if="item.int_type === 1" style="text-align: center;">
              <!-- <video :src="item.content.videos[0].src" controls="controls" preload="none"
                :poster="item.content.videos[0].imageUrl" :data-cover="item.content.videos[0].imageUrl">
              </video> -->
              <section v-if="item.content.text" class="feedtitle feed-videos-title text-ellipse">{{ item.content.text }}</section>
              
              <section class="feeds-video flex flex-align-center flex-pack-center" 
                v-if="item.content.videos[0].width > item.content.videos[0].height"
                v-lazy:background-image="item.content.videos[0].imageUrl"
                :style="{
                  width: '100vw',
                  height: item.content.videos[0].height * 100 / item.content.videos[0].width + 'vw'
                }">
                <span class='icon-shipin-2'></span>
                <section class="duration flex flex-align-center flex-pack-center">
                  <span>00:00/{{ $com.toCurrent(item.content.videos[0].duration) }}</span>
                </section>
              </section>
              <section class="feeds-video flex flex-align-center flex-pack-center" 
                v-else
                v-lazy:background-image="item.content.videos[0].imageUrl"
                :style="{
                  width: item.content.videos[0].width * 100 / item.content.videos[0].height + 'vw',
                  height: '82.93vw'
                }">
                <span class='icon-shipin-2'></span>
                <section class="duration flex flex-align-center flex-pack-center">
                  <span>00:00/{{ $com.toCurrent(item.content.videos[0].duration) }}</span>
                </section>
              </section>
            </section>
            <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
            <section class="feedmain" v-else-if="item.int_type === 2">
              <!-- <section v-if="item.int_cover_mode != 1">
                <section class="feedtype">
                  <section v-if="item.title" class="feedtitle text-ellipse">
                    {{ item.title }}
                  </section>
                  <section v-if="item.content.summary" class="feedcontent text-ellipse">
                    {{ item.content.summary }}
                  </section>
                </section>
                <section v-if="item.cover" class="feedcover feed-cover-image flex">
                  <img v-lazy="$com.makeFileUrl(item.cover)">
                </section>
              </section> -->
              <section class="flex flex-pack-justify">
                <section class="feedtype">
                  <section v-if="item.title" class="feedtitle feed-mode-1 text-ellipse">
                    {{ item.title }}
                  </section>
                </section>
                <section v-if="item.cover" class="feedcover feed-mode-1-image flex">
                  <span class="mode-1" v-lazy:background-image="$com.makeFileUrl(item.cover)"></span>
                </section>
              </section>
            </section>
          </section>
        </section>
      </li>
    </ul>
    <bottom-nav v-if="!($route.path.indexOf('group') > -1) && title != '精彩投稿'"></bottom-nav>
  </section>
</template>
<script>
import bottomNav from "~/components/bottomnav.vue";
export default {
  name: "dpFeed",
  props: {
    feedList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: "热门文章"
    }
  },
  components: {
    bottomNav
  },
  data() {
    // bname: 'button'
    return {};
  },
  methods: {
    // h5下载补丁
    async downApp(e, str, id) {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: self.$store.state.h5Adid || "closer-share" // 栏目id
      });
      if (result) {
        let _page,
          status = true,
          did;
        if (self.$route.path.indexOf("/community") > -1) {
          _page = "community";
          did = self.$route.params.id;
        } else if (self.$route.path.indexOf("/feed") > -1) {
          _page = "feed";
          did = self.$route.params.id;
        } else if (self.$route.path.indexOf("/group") > -1) {
          _page = "group";
          did = self.$route.params.id;
        } else {
          _page = "inviter";
          status = false;
        }
        let res = await self.$store.dispatch("down_statistics", {
          dataId: did || "",
          page: _page || "feed",
          action: "download",
          extension: str || "hot_feed"
        });
        if (res) {
          let url = `closer://feed/${id}`;
          self.$com.downApp(url);
        }
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
.dpFeed {
  /* padding-top: 4.66vw; */
  display: block;
}
.title {
  margin-bottom: 2.67vw;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}
.hots-article {
  height: 11.47vw;
  font-size: 16px;
  font-weight: bold;
  padding: 0 4vw;
  border-bottom: 1px solid #eaeaea;
}
/*feed流*/
.feed-box {
  position: relative;
}
.hide-feed-over {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 99;
}
.feed-list-cell {
  border-bottom: 2.668vw solid #f1f1f1;
  padding-bottom: 4.66vw;
}

.columnname > img {
  width: 18.93vw;
  height: 8vw;
  border-radius: 0 5px 5px 0;
  margin-right: 4vw;
}

.columnname {
  padding-top: 4vw;
  padding-right: 4.67vw;
  box-sizing: border-box;
  margin-bottom: 4vw;
}

.time {
  color: #808080;
}
.feed-cover-image {
  margin: 2.67vw 4.67vw 0 4.67vw;
}
.feedcover > img {
  width: 100%;
  height: 100%;
}
.feedtitle {
  font-size: 18px;
  line-height: 1.6;
  -webkit-line-clamp: 2;
  margin-top: 2.67vw;
}

.feed-mode-1 {
  margin-top: 0;
  -webkit-line-clamp: 3;
  line-height: 1.5;
  font-size: 17px;
}
.feed-mode-1-image {
  width: 30.4vw;
  height: 20vw;
  margin-right: 4.67vw;
}
.feed-mode-1-image span {
  width: 30.4vw;
  height: 20vw;
  background-size: cover;
  background-repeat: no-repeat;
}

.feed-videos-title {
  margin-bottom: 2.67vw;
}
.feedtype .feedtitle {
  font-weight: bold;
}

.feedcontent {
  font-size: 15px;
  line-height: 1.6;
  -webkit-line-clamp: 2;
  margin-top: 2.67vw;
}

.feedimgcontent {
  flex-wrap: wrap;
  margin-top: 2.67vw;
  padding: 0 4.67vw;
}
.more-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 14px;
}
.feeder-img-list {
  position: relative;
  overflow: hidden;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}
.feeder-img-list-cell-1 {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.feeder-img-list-cell-2 {
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.feeder-img-list-cell-3 {
  width: 32.5%;
  height: 0;
  padding-bottom: 32.5%;
  margin-right: 0.83%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.feeder-img-list-cell-4 {
  width: 49.5%;
  height: 0;
  padding-bottom: 49.5%;
  margin-bottom: 1%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.feedtitle,
.feedcontent {
  text-align: justify;
  padding: 0 4.67vw;
}
.content p {
  margin-bottom: 0;
  line-height: 1.6;
}
.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
}
.feedmain > video {
  width: 100%;
  height: 64vw;
  overflow: hidden;
  background: #333;
}
.cover_img_type {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 10px;
  color: #fff;
  padding: 0 6px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
}
.feeds-video {
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 4.67vw;
  position: relative;
}
.duration {
  position: absolute;
  right: 2.67vw;
  bottom: 2.67vw;
  z-index: 99;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  height: 6.667vw;
  width: 21.33vw;
  box-sizing: border-box;
  font-size: 12px;
}

@media screen and (min-width: 681px) {
  .dpFeed {
    display: none;
  }
}
</style>

