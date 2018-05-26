<template>
  <div id="group" :class="{  
        flex:true,
        'flex-v':true }">
    <div class="cover">
      <!-- 如果有置顶贴子封面图就用贴子封面 否则用img， 如果没有img则显示默认图片 750*930-->
      <div class="feeder-img" v-lazy:background-image="$com.makeFileUrl(res.community.attributes.bgcover)"  v-if="res.community.attributes.bgcover"></div> 
      <div class="feeder-img" v-lazy:background-image="$com.makeFileUrl(res.community.img)"  v-else-if="res.community.img"></div> 
      <div class="feeder-img" v-lazy:background-image="require('~/assets/images/401527306489_.pic_hd.jpg')"  v-else></div> 
      <div class="cover-title">{{ res.community.description }}</div> 
    </div>
    <div class="member">
      <div class="title">正在招募的群组</div>
      <ul :class="{
                group: true, 
                flex: true, 
                'flex-align-center': true,
            }">
        <li v-for="(item, index) in res.group.data" :key="index" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.group.avatar)" :onerror="defaultErrorImg">
          <span class="ellipsis">{{ item.group.name }}</span>
        </li>
      </ul>
    </div>
    <div class="split-box"></div>
    <div class="works flex-1">
      <ul v-if="res.feed.data && res.feed.data.length > 0" class="feed-list flex-1">
        <li class="feed-list-cell" @click="tofeeddetails(item)" v-for="(item, index) in res.feed.data" :key="index">
          <div class="feed-box">
            <div class="feed-cell-content">
              <div class="columnname flex flex-align-center">
                <img v-lazy="item.blogo" :onerror="defaultErrorImg">
                <span class="name flex-1 ellipsis">{{ item.communityName }}</span>
                <span class="time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
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
                <div v-if="item.content.images && (item.content.images.length == 3 || item.content.images.length > 4)" class="flex feedimgcontent">
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
    </div>
    <div class="tj-dialog" @click.self="hiddenLogin" v-if="$store.state.visibleLogin">
      <dp-login></dp-login>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, error, params }) {
    try {
      let [community, feed, group] = await Promise.all([
        app.$axios.$get(`${api.community.show}?communityid=${params.id}`),
        app.$axios.$get(
          `${api.community.community_subject_list_index}?communityid=${
            params.id
          }&pagenum=1&pagesize=5`
        ),
        app.$axios.$get(
          `${api.group.recruiting}?communityid=${params.id}&pagenum=1&count=5`
        )
      ]);
      console.log("community===", community);
      console.log("feed===", feed);
      await feed.result.data.map(x => {
        if (x.content) {
          x.content = JSON.parse(x.content);
        }
        return x;
      });
      console.log("group===", group);
      return {
        res: {
          community: community.result,
          feed: feed.result,
          group: group.result
        }
      };
    } catch (err) {
      error({ message: `${err}` });
    }
  },
  header() {
    return {
      title: this.res.community.description
        ? this.res.community.description
        : this.res.community.name
    };
  },
  data() {
    return {
      res: {
        community: {},
        feed: {},
        group: {}
      },
      defaultErrorImg:
        'this.src="' + require("~/assets/images/default.jpeg") + '"',
      id: "",
      loadingmore: false
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
    },
    hiddenLogin() {
      console.log(this.$store.state.visibleLogin);
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    }
  }
};
</script>
<style scoped>
#group {
  overflow-x: hidden;
}
.member {
  padding: 0 0.2rem 0.2rem;
}

.title {
  margin-bottom: 0.2rem;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}

.content {
  padding: 0 0.15rem 0.15rem;
  text-align: justify;
  font-size: 14px;
  color: #808080;
}

.member,
.works {
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
  border-radius: 4px;
  margin-bottom: 0.1rem;
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
  margin-bottom: 0.3rem;
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

.feedcover > img {
  width: 100%;
  height: 100%;
}

.feedtitle {
  font-size: 16px;
  line-height: 1.6;
  -webkit-line-clamp: 2;
  margin-top: 0.2rem;
}
.feedtype .feedtitle {
  font-weight: bold;
}

.feedcontent {
  font-size: 13px;
  line-height: 1.6;
  -webkit-line-clamp: 2;
  margin-top: 0.2rem;
}

.feedimgcontent {
  flex-wrap: wrap;
  margin-top: 0.2rem;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}

.feedtitle,
.feedcontent {
  text-align: justify;
  padding: 0 0.35rem;
}
.content p {
  margin-bottom: 0;
  line-height: 1.6;
}

/* 调整的 */
.cover {
  position: relative;
}
.cover-title {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  color: #fff;
  width: 80%;
  text-align: center;
}
.feeder-img {
  position: relative;
  width: 7.5rem;
  height: 9.3rem;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
