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
            <!-- <section class="columnname flex flex-align-center">
              <img v-lazy="item.blogo">
              <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
              <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
            </section> -->
            <!-- 贴子详情 -->
            <!-- 纯图片类型 int_type == 0-->
            <section class="feedmain" v-if="item.int_type === 0">
              <section v-if="item.content.text" class="feedtitle text-ellipse" :style="$store.state.text_overflow_3">
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
            <section class="feedmain" v-else-if="item.int_type === 1">
              <section v-if="item.content.text" class="feedtitle feed-videos-title text-ellipse" :style="$store.state.text_overflow_3">{{ item.content.text }}</section>
              <section class="columnname flex flex-align-center">
                <section class="flex-1">
                  <span class="name ellipsis">{{ $com.toOverflow(item.communityName, 10) }}</span>
                  <span v-if="item.commentNumber">{{ item.commentNumber }}评论</span>
                  <span v-if="item.commentNumber && item.like">·</span>
                  <span v-if="item.like">{{ item.like }}赞</span>
                </section>
                <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
              </section>
              <!-- <section class="feeds-video flex flex-align-center flex-pack-center" 
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
              </section> -->
            </section>
            <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
            <section class="feedmain" v-else-if="item.int_type === 2">
              <section class="flex flex-pack-justify">
                <section class="feedtype feed-left-width">
                  <section v-if="item.title" class="feedtitle feed-mode-1 text-ellipse" :style="$store.state.text_overflow_3">
                    {{ item.title }}
                  </section>
                </section>
                <section v-if="item.cover" class="feedcover feed-mode-1-image flex">
                  <span class="mode-1" v-lazy:background-image="$com.makeFileUrl(item.cover)"></span>
                </section>
              </section>
              <section class="columnname flex flex-align-center">
                <section class="flex-1">
                  <span class="name ellipsis">{{ $com.toOverflow(item.communityName, 10) }}</span>
                  <span v-if="item.commentNumber">{{ item.commentNumber }}评论</span>
                  <span v-if="item.commentNumber && item.like">·</span>
                  <span v-if="item.like">{{ item.like }}赞</span>
                </section>
                <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
              </section>
            </section>
          </section>
        </section>
      </li>
    </ul>
    <!-- <bottom-nav v-if="!($route.path.indexOf('group') > -1) && title != '精彩投稿'"></bottom-nav> -->
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
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "hot_feed",
        redirectUrl
      });
    }
  },
  mounted() {}
};
</script>
<style scoped lang="less">
@import "../../assets/css/feed.less";
</style>

