<template>
  <div id="group" :class="{  
        flex:true,
        commonbox: true,
        'flex-v':true }">
    <div class="member">
      <div class="title">群组成员 {{ $store.state.group_info.group_user_info.length + 1 }}</div>
      <ul :class="{
                group: true, 
                flex: true, 
                'flex-align-center': true
            }">
        <li v-if="$store.state.group_info.group_info.group" style="position:relative;" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl($store.state.group_info.group_info.group.attributes.monitor.user.avatar)">
          <p class="group-master flex flex-align-center flex-pack-center">
            <span>群主</span>
          </p>
          <span class="ellipsis">{{ $store.state.group_info.group_info.group.attributes.monitor.user.fullname }}</span>
        </li>
        <li v-for="(item, index) in $store.state.group_info.group_user_info" :key="index" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.props.roster.avatar)">
          <span class="ellipsis">{{ item.props.roster.name }}</span>
        </li>
      </ul>
    </div>
    <div class="intro">
      <div class="title">群简介</div>
      <div class="content">
        <p class="text-ellipse" v-if="$store.state.group_info.group_info &&  $store.state.group_info.group_info.group">{{ JSON.parse($store.state.group_info.group_info.group.description)[0].content }}</p>
      </div>
    </div>
    <div class="split-box"></div>
    <div class="works flex-1">
      <div class="title">群作品</div>
      <ul v-if="$store.state.group_res.length > 0" class="feed-list flex-1">
        <li class="feed-list-cell" @click="tofeeddetails(item)" v-for="(item, index) in $store.state.group_res" :key="index">
          <div class="feed-box">
            <div class="feed-cell-content">
              <div class="columnname flex flex-align-center">
                <img v-lazy="item.blogo">
                <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
                <span class="time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</span>
              </div>
              <!-- 贴子详情 -->
              <!-- 纯图片类型 int_type == 0-->
              <div class="feedmain" v-if="item.int_type === 0">
                <div v-if="item.content.text" class="feedtitle text-ellipse">
                  {{ item.content.text }}
                </div>
                <div v-if="item.content.images && item.content.images.length == 1" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '100%',height:'0',paddingBottom:'56.25%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && item.content.images.length == 2" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && item.content.images.length == 3 || item.content.images && item.content.images.length > 4" class="flex feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%',backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images && item.content.images === 4" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                    :key="index">

                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
              </div>
              <!-- 视频贴 int_type == 1-->
              <div class="feedmain" v-else-if="item.int_type === 1">
                <video :src="item.content.videos[0].src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow"
                  x5-video-player-type="h5" x5-video-orientation="portraint" style="width: 100%; height: 64vw; overflow:hidden; object-fit: fill;"
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
      <div v-else class="nocon">
        暂无群作品
      </div>
    </div>
    <!-- <div class="open-footer">
      <mt-button type="primary" size="small" @click="downApp" class="circle-btn">
        打开贴近群组
      </mt-button>
    </div> -->
  </div>
</template>
<script>
export default {
  middleware: "group",
  asyncData({ req, store }) {
    if (req) {
      store.commit("SET_NO_NAV", false);
    }
  },
  data() {
    return {
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      id: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.path.indexOf("/group") > -1) {
      this.$store.commit("SET_NO_NAV", false);
    } else {
      this.$store.commit("SET_NO_NAV", true);
    }
    next();
  },
  methods: {
    downApp() {
      location.href = `${downHost}?downurl=closer://group/${
        this.$route.params.id
      }`;
      // this.$router.push({
      //   path: `/down?downurl=closer://group/${this.$route.params.id}`
      // });
    },
    tofeeddetails(item) {
      location.href = `/feed/${item.subjectid}`;
      // this.$router.push({
      //   path: `/feed/${item.subjectid}`
      // });
    }
  },
  mounted() {
    // console.log(this.$store.state.group_info);
  }
};
</script>
<style scoped>
#group {
  overflow-x: hidden;
}
.member,
.intro {
  padding: 0 2.67vw 2.67vw;
}

.title {
  margin-bottom: 2.67vw;
  font-size: 16px;
  margin-left: 2vw;
}

.content {
  padding: 0 2vw 2vw;
  text-align: justify;
  font-size: 14px;
  color: #808080;
}

.member,
.works,
.intro {
  padding-top: 5.34vw;
}

.works {
  padding-bottom: 4vw;
  position: relative;
}

.works .title {
  margin-left: 4.67vw;
}

.group {
  flex-wrap: wrap;
  max-height: 53.4vw;
  overflow: hidden;
}

.lookGroup {
  height: auto;
  overflow-y: auto;
}

.group li {
  width: 20%;
  margin-bottom: 2vw;
  height: 26.7vw;
  box-sizing: border-box;
}
.group li > span {
  font-size: 13px;
  text-align: center;
  width: 18.67vw;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
}
.group li > img {
  width: 13.35vw;
  height: 13.35vw;
  display: block;
  border-radius: 100%;
  margin-bottom: 1.335vw;
}

.more {
  margin: 4vw 0 2.67vw;
}

/*feed流*/

.feed-list-cell {
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 5.34vw;
  padding-bottom: 4.66vw;
}

.columnname > img {
  width: 21.87vw;
  height: 8.5vw;
  border-radius: 0 4px 4px 0;
  margin-right: 4vw;
}

.columnname {
  padding-right: 4.67vw;
  box-sizing: border-box;
  margin-bottom: 2.67vw;
}

/* .name {
  font-size: 14px;
} */

.time {
  color: #808080;
}

.feedtype {
  padding-top: 4.66vw;
}
.feedtype .feedtitle,
.feedmain .feedtitle {
  font-weight: bold;
}
.feedcover > img {
  width: 100%;
  height: 100%;
}

.feedtitle {
  font-size: 16px;
  margin-bottom: 2.67vw;
}

.feedcontent {
  font-size: 13px;
  max-height: 75px;
  overflow: hidden;
}

.feedimgcontent {
  flex-wrap: wrap;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}

.feedtitle,
.feedcontent {
  text-align: justify;
  padding: 0 4.67vw;
  line-height: 1.6;
  -webkit-line-clamp: 2;
}
.content p {
  margin-bottom: 0;
  line-height: 1.6;
}
.group-master {
  width: 11.2vw;
  height: 11.2vw;
  max-width: 84px;
  max-height: 84px;
  position: absolute;
  left: 0;
  top: 0;
  background: url("~/assets/images/group_icon_tags_n@2x.png") no-repeat;
  background-size: cover;
  margin-left: -2px;
  margin-top: -2px;
}
.group-master > span {
  font-size: 10px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  color: #fff;
  display: block;
  margin-left: 2px;
}
.prism-player {
  margin-bottom: 4vw;
}
</style>
