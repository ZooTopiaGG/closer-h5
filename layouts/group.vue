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
                'flex-align-center': true,
                lookGroup: loadingmore
            }">
        <li v-if="$store.state.group_info.group_info.group" style="position:relative;" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl($store.state.group_info.group_info.group.attributes.monitor.user.avatar)" :onerror="defaultErrorImg">
          <p class="group-master flex flex-align-center flex-pack-center">
            <span>群主</span>
          </p>
          <span class="ellipsis">{{ $store.state.group_info.group_info.group.attributes.monitor.user.fullname }}</span>
        </li>
        <li v-for="(item, index) in $store.state.group_info.group_user_info" :key="index" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.props.roster.avatar)" :onerror="defaultErrorImg">
          <span class="ellipsis">{{ item.props.roster.name }}</span>
        </li>
      </ul>
    </div>
    <div class="intro">
      <div class="title">群简介</div>
      <div class="content">
        <p class="text-ellipse" v-if="$store.state.group_info.group_info &&  $store.state.group_info.group_info.announcement">{{ JSON.parse($store.state.group_info.group_info.announcement)[0].content }}</p>
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
                <img v-lazy="item.blogo" :onerror="defaultErrorImg">
                <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
                <span class="time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</span>
              </div>
              <!-- 贴子详情 -->
              <!-- 纯图片类型 int_type == 0-->
              <div class="feedmain" v-if="item.int_type === 0">
                <div v-if="item.content.text" class="feedtitle text-ellipse">
                  {{ item.content.text }}
                </div>
                <div v-if="item.content.images.length == 1" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '100%',height:'0',paddingBottom:'56.25%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images.length == 2" class="flex flex-pack-justify feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images.length == 3 || item.content.images.length > 4" class="flex feedimgcontent">
                  <div class="feeder-img-list" v-for="(img, index) in item.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                    :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%',backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }"
                    :key="index">
                    <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                  </div>
                </div>
                <div v-if="item.content.images === 4" class="flex flex-pack-justify feedimgcontent">
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
                  x5-video-player-type="h5" x5-video-orientation="portraint" style="width: 100%; height: 3.6rem; overflow:hidden; object-fit: fill;"
                  :poster="item.content.videos[0].imageUrl" :data-cover="item.content.videos[0].imageUrl">
                </video>
                <div v-if="item.content.text" class="feedtitle text-ellipse">{{ item.content.text }}</div>
              </div>
              <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
              <div class="feedmain" v-else-if="item.int_type === 2">
                <div v-if="item.cover" class="feedcover flex">
                  <img v-lazy="$com.makeFileUrl(item.cover)" :onerror="defaultErrorImg">
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
    <div class="footer">
      <mt-button type="primary" size="small" @click="openApp" class="circle-btn">
        打开贴近群组
      </mt-button>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "group",
  // header() {
  //   return {
  //     title: this.$store.state.group_info.group_info
  //       ? this.$store.state.group_info.group_info.name
  //       : "贴近群组"
  //   };
  // },
  data() {
    return {
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      id: ""
    };
  },
  methods: {
    openApp() {
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ums.closer";
    },
    tofeeddetails(item) {
      // console.log(item.subjectid)
      this.$router.push({
        path: `/feed/${item.subjectid}`
      });
    }
  }
};
</script>
<style scoped>
#group {
  overflow-x: hidden;
}
.member,
.intro {
  padding: 0 0.2rem 0.2rem;
}

.title {
  margin-bottom: 0.2rem;
  font-size: 16px;
  margin-left: 0.15rem;
}

.content {
  padding: 0 0.15rem 0.15rem;
  text-align: justify;
  font-size: 14px;
  color: #808080;
}

.member,
.works,
.intro {
  padding-top: 0.4rem;
}

.works {
  padding-bottom: 0.2rem;
  position: relative;
}

.works .title {
  margin-left: 0.35rem;
}

.group {
  flex-wrap: wrap;
  max-height: 4rem;
  overflow: hidden;
}

.lookGroup {
  height: auto;
  overflow-y: auto;
}

.group li {
  width: 20%;
  margin-bottom: 0.15rem;
  height: 2rem;
  box-sizing: border-box;
}
.group li > span {
  font-size: 13px;
  text-align: center;
  width: 1.4rem;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
}
.group li > img {
  max-width: 1rem;
  max-height: 1rem;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 100%;
  margin-bottom: 0.1rem;
}

.more {
  margin: 0.3rem 0 0.2rem;
}

/*feed流*/

.feed-list-cell {
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 0.4rem;
  padding-bottom: 0.35rem;
}

.columnname > img {
  width: 1.64rem;
  height: 0.64rem;
  border-radius: 0 4px 4px 0;
  margin-right: 0.3rem;
}

.columnname {
  padding-right: 0.35rem;
  box-sizing: border-box;
  margin-bottom: 0.2rem;
}

/* .name {
  font-size: 14px;
} */

.time {
  color: #808080;
}

.feedtype {
  padding-top: 0.35rem;
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
  margin-bottom: 0.2rem;
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
  padding: 0 0.35rem;
  line-height: 1.6;
  -webkit-line-clamp: 2;
}
.content p {
  margin-bottom: 0;
  line-height: 1.6;
}
.group-master {
  width: 0.84rem;
  height: 0.84rem;
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
  margin-bottom: 0.3rem;
}
</style>
