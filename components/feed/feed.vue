<template>
  <div class="dpFeed">
    <ul v-if="$store.state.feed_list && $store.state.feed_list.length > 0" class="feed-list flex-1">
        <li class="feed-list-cell" @click="tofeeddetails(item)" v-for="(item, index) in $store.state.feed_list" :key="index">
          <div class="feed-box">
            <div class="feed-cell-content">
              <div class="columnname flex flex-align-center">
                <img v-lazy="item.blogo">
                <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
                <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
              </div>
              <!-- 贴子详情 -->
              <!-- 纯图片类型 int_type == 0-->
              <div class="feedmain" v-if="item.int_type === 0">
                <div v-if="item.content.text" class="feedtitle text-ellipse">
                  {{ item.content.text }}
                </div>
                <div v-if="item.content.images && item.content.images.length === 1" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && item.content.images.length === 2" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && (item.content.images.length === 3 || item.content.images.length > 4)" class="flex feedimgcontent">
                  <div class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && item.content.images.length === 4" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :key="index">

                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
              </div>
              <!-- 视频贴 int_type == 1-->
              <div class="feedmain" v-else-if="item.int_type === 1" style="text-align: center;">
                <video :src="item.content.videos[0].src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow"
                  x5-video-player-type="h5" x5-video-orientation="portraint"
                  :poster="item.content.videos[0].imageUrl" :data-cover="item.content.videos[0].imageUrl">
                </video>
                <div v-if="item.content.text" class="feedtitle text-ellipse">{{ item.content.text }}</div>
              </div>
              <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
              <div class="feedmain" v-else-if="item.int_type === 2">
                <div v-if="item.cover" class="feedcover flex">
                  <img v-lazy="$com.makeFileUrl(item.cover)">
                </div>
                <div class="feedtype">
                  <div v-if="item.title" class="feedtitle text-ellipse">
                    {{ item.title }}
                  </div>
                  <div v-if="item.content.summary" class="feedcontent text-ellipse">
                    {{ item.content.summary }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  name: "dpFeed",
  // props: {
  //   res: {
  //     default: {}
  //   }
  // },
  data() {
    // bname: 'button'
    return {};
  },
  methods: {
    tofeeddetails(item) {
      location.href = `/feed/${item.subjectid}`;
    }
  },
  mounted() {}
};
</script>
<style scoped>
.title {
  margin-bottom: 2.67vw;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}

/*feed流*/

.feed-list-cell {
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 5.336vw;
  padding-bottom: 4.66vw;
}

.columnname > img {
  width: 21.87vw;
  height: 8.54vw;
  border-radius: 0 4px 4px 0;
  margin-right: 4vw;
}

.columnname {
  padding-right: 4.67vw;
  box-sizing: border-box;
  margin-bottom: 4vw;
}

.time {
  color: #808080;
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
  width: 33%;
  height: 0;
  padding-bottom: 33%;
  margin-bottom: 0.5%;
  margin-right: 0.5%;
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
</style>

