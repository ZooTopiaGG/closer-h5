<template>
  <section class="dpFeed" v-if="!$store.state.isPre">
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
                <section class="feeder-img-list feeder-img-list-cell-3" v-if="index < 3" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                  <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                  <span class="more-image flex flex-align-center flex-pack-center" v-if="index === 2 && item.content.images.length > 3">{{ item.content.images.length - 3 }}张更多</span>
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
              <section class="feeds-video feeds-video-vertical flex flex-align-center flex-pack-center" 
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
                <section class="feedtype feed-left-width">
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
      let self = this,
        redirectUrl = `closer://feed/${id}`;
      self.$com.down_statistics(
        self.$store,
        self.$route,
        str,
        "hot_feed",
        redirectUrl
      );
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@m15: 2vw;
@m35: 4.67vw;
.dpFeed {
  /* padding-top: 4.66vw; */
  display: block;

  .hots-article {
    height: 11.47vw;
    font-size: 16px;
    /* font-weight: bold; */
    padding: 0 @m15 * 2;
    border-bottom: 1px solid #eaeaea;
  }
  .feed-list-cell {
    border-bottom: @m20 solid #f1f1f1;
    padding-bottom: @m35;
    /*feed流*/
    .feed-box {
      position: relative;
      .hide-feed-over {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        z-index: 99;
      }
      .columnname {
        padding-top: @m15 * 2;
        padding-right: @m35;
        box-sizing: border-box;
        margin-bottom: @m15 * 2;
        > img {
          width: 18.93vw;
          height: @m15 * 4;
          border-radius: 0 5px 5px 0;
          margin-right: @m15 * 2;
        }
        .time {
          color: #808080;
          margin-left: @m20;
        }
      }
    }
  }

  .feedcover > img {
    width: 100%;
    height: 100%;
  }
  .feedtitle {
    font-size: 18px;
    line-height: 1.6;
    -webkit-line-clamp: 2;
    margin-top: @m20;
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
    margin-right: @m35;
    span {
      width: 30.4vw;
      height: 20vw;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  .feed-videos-title {
    margin-bottom: @m20;
  }
  .feedtype .feedtitle {
    font-weight: bold;
  }

  .feed-left-width {
    width: calc(100vw - 8vw - 30.4vw);
    box-sizing: border-box;
    .feedtitle {
      padding: 0 0 0 @m35;
    }
  }

  .feedimgcontent {
    flex-wrap: wrap;
    margin-top: @m20;
    padding: 0 @m35;
    .feeder-img-list {
      position: relative;
      overflow: hidden;
      .more-image {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        color: #fff;
        font-size: 14px;
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }

  .feeder-img-list:nth-child(3n) {
    margin-right: 0 !important;
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

  .feedtitle {
    text-align: justify;
    padding: 0 @m35;
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
    position: relative;
  }
  .feeds-video-vertical {
    margin-left: @m35;
  }
  .duration {
    position: absolute;
    right: @m20;
    bottom: @m20;
    z-index: 99;
    color: #fff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 25px;
    height: 6.667vw;
    width: 21.33vw;
    box-sizing: border-box;
    font-size: 12px;
  }
}
@media screen and (min-width: 681px) {
  .dpFeed {
    display: none;
  }
}
</style>

