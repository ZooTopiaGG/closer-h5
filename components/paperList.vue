<template>
  <section class="dpFeed dpPaperFeed">
    <ul v-if="paperList && paperList.length > 0" class="feed-list flex-1">
      <li v-if="index < 5" class="feed-list-cell" @click="toFeedDetails(item.subjectid)" v-for="(item, index) in paperList" :key="index">
        <section class="feed-box">
          <section class="hide-feed-over"></section>
          <section class="feed-cell-content">
            <section class="columnname flex flex-align-center">
              <img class="columeavatar" v-lazy="$com.makeFileUrl(item.user.attributes.roster.avatar) || $com.makeFileUrl(item.user.avatar)">
              <span class="name flex-1 ellipsis">{{ item.user.attributes.roster.name || item.user.fullname }}</span>
              <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
            </section>
            <!-- 贴子详情 -->
            <!-- 纯图片类型 int_type == 0-->
            <section class="feedmain" v-if="item.int_type === 0">
              <section v-if="item.content.text" class="feedtitle text-ellipse" :style="$store.state.text_overflow_2">
                {{ item.content.text }}
              </section>
              <section v-if="item.content.images && item.content.images.length > 0" class="flex feedimgcontent">
                <section class="feeder-img-list feeder-img-list-cell-3" v-if="index < 3" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                  :key="index">
                  <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                  <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
                  <span class="more-image flex flex-align-center flex-pack-center" v-if="index === 2 && item.content.images.length > 3">{{ item.content.images.length - 3 }}张更多</span>
                </section>
              </section>
            </section>
            <!-- 视频贴 int_type == 1-->
            <section class="feedmain" v-else-if="item.int_type === 1" style="text-align: center;">
              <h3 v-if="item.content.text" class="feedtitle feed-videos-title" :style="$store.state.text_overflow_3">{{ item.content.text }}</h3>
              <section class="paper-video-data">
                <span v-if="item.commentNumber">{{ item.commentNumber }}评论</span>
                <span v-if="item.commentNumber && item.like">·</span>
                <span v-if="item.like">{{ item.like }}赞</span>
              </section>
            </section>
            <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
            <!-- <section class="feedmain" v-else-if="item.int_type === 2">
              <section class="flex flex-pack-justify">
                <section class="feedtype">
                  <section v-if="item.title" class="feedtitle feed-mode-1 text-ellipse" :style="$store.state.text_overflow_2">
                    {{ item.title }}
                  </section>
                  <section v-else class="feedtitle feed-mode-1 text-ellipse" :style="$store.state.text_overflow_2">
                    {{ item.content.summary }}
                  </section>
                  <section class="paper-data">
                    <span v-if="item.commentNumber">{{ item.commentNumber }}评论</span>
                    <span v-if="item.commentNumber && item.like">·</span>
                    <span v-if="item.like">{{ item.like }}赞</span>
                  </section>
                </section>
                <section v-if="item.cover" class="feedcover feed-mode-1-image flex">
                  <span class="mode-1 paper-mode-1" v-lazy:background-image="$com.makeFileUrl(item.cover)"></span>
                </section>
              </section>
            </section> -->
             <section class="feedmain" v-else-if="item.int_type === 2">
              <section class="flex flex-pack-justify">
                <section class="feedtype flex-1">
                  <section class="feedtitle feed-mode-1 text-ellipse" :style="$store.state.text_overflow_2">
                    {{ item.content.summary }}
                  </section>
                </section>
                <section v-if="item.cover" class="feedcover feed-mode-1-image flex">
                  <span class="mode-1" v-lazy:background-image="$com.makeFileUrl(item.cover)"></span>
                </section>
              </section>
              <section class="columnname flex flex-align-center">
                <section class="flex-1">
                  <!-- <span class="name ellipsis">{{ $com.toOverflow(item.communityName, 10) }}</span> -->
                  <span v-if="item.commentNumber">{{ item.commentNumber }}评论</span>
                  <span v-if="item.commentNumber && item.like">·</span>
                  <span v-if="item.like">{{ item.like }}赞</span>
                </section>
                <!-- <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span> -->
              </section>
            </section>
          </section>
        </section>
      </li>
    </ul>
    <section class="nothings" v-else>
      <nothing></nothing>
    </section>
    <bottom-nav v-if="!($route.path.indexOf('group') > -1) && title != '精彩投稿'"></bottom-nav>
  </section>
</template>
<script>
import bottomNav from "~/components/bottomnav.vue";
import nothing from "~/components/nothing.vue";
export default {
  name: "dpFeed",
  props: {
    paperList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: "精华"
    }
  },
  components: {
    bottomNav,
    nothing
  },
  data() {
    // bname: 'button'
    return {
      dd: false
    };
  },
  methods: {
    // h5下载补丁
    async downApp(e, str, id) {
      let self = this,
        redirectUrl = `closer://feed/${id}`;
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "hot_feed",
        redirectUrl
      });
    },
    toFeedDetails(id) {
      this.$router.push({
        path: `/feed/${id}?fromid=${this.$route.params.id}&from=paper`
      });
    }
  },
  mounted() {
    console.log(this.paperList);
  }
};
</script>

<style scoped lang="less">
@import "../assets/css/feed.less";
@newPad: 3.2vw;
@newBase: 2vw;
.dpFeed {
  .feed-list {
    margin-top: @newPad;
    .feed-box {
      .columnname {
        // margin-bottom: @newPad;
        // padding-top: 0;
        box-sizing: border-box;
        > img.columeavatar {
          width: @newBase * 4;
          height: @newBase * 4;
          border-radius: 100%;
          margin-right: @newBase;
        }
      }
    }
    .feedtype {
      position: relative;
      .feedtitle {
        padding: 0;
        box-sizing: border-box;
        font-weight: 500;
        line-height: 25.5px;
        max-height: 51px;
        height: 51px;
      }
    }
    .feedmain {
      padding-top: @newPad;
      .feed-videos-title {
        padding: 0 @newPad;
        font-size: 17px;
      }
    }
    .paper-video-data {
      padding: 0 @newPad;
      color: #94928e;
      font-size: 12px;
      text-align: left;
    }
    .paper-data {
      position: absolute;
      bottom: 0;
      color: #94928e;
      font-size: 12px;
      padding-top: 3.2vw;
    }
    .paper-mode-1 {
      border-radius: 5px;
    }
  }
}
</style>

