<template>
  <div id="group" :class="{  
        flex:true,
        'flex-v':true }">
    <div class="cover">
      <!-- 如果有置顶贴子封面图就用贴子封面 否则用img， 如果没有img则显示默认图片 750*930-->
      <div class="feeder-img" v-lazy:background-image="$com.makeFileUrl(res.community.attributes.coversubject.bigcover)"  v-if="res.community.attributes && res.community.attributes.coversubject"></div> 
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
        <li v-for="(item, index) in group.data" :key="index" @click="togroup(item)" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.group.avatar)">
          <span class="ellipsis">{{ item.group.name }}</span>
        </li>
      </ul>
    </div>
    <div class="split-box"></div>
    <div class="common-feed">
      <dp-feed></dp-feed>
    </div>
    <div class="tj-dialog" @click.self="hiddenLogin" v-if="$store.state.visibleLogin">
      <dp-login></dp-login>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, error, params, store }) {
    try {
      let para = {
        communityid: params.communityid
      };
      let community = await app.$axios.$get(
        `${api.community.show}?communityid=${params.communityid}`
      );
      if (community.code === 0) {
        // 设置communityid到res状态
        store.commit("SET_RES", community.result);
        // 关注状态
        if (community.result.isFollowed) {
          store.commit("SET_FOCUS_STAT", community.result.isFollowed);
        }
        community.result.communityid = params.communityid;
        return {
          res: {
            community: community.result
          }
        };
      }
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
        community: {}
      },
      group: {},
      id: ""
    };
  },
  methods: {
    tofeeddetails(item) {
      location.href = `/feed/${item.subjectid}`;
    },
    togroup(item) {
      location.href = `/group/${item.id}`;
    },
    hiddenLogin() {
      this.$store.commit("SET_VISIBLE_LOGIN", false);
    },
    // 获取贴子列表
    async getFeedList() {
      let self = this;
      let feed = await self.$axios.$get(
        `${api.community.community_subject_list_index}?communityid=${
          self.$route.params.communityid
        }`
      );
      if (feed.code === 0) {
        let arr = await feed.result.data.map(x => {
          if (x.content) {
            x.content = JSON.parse(x.content);
          }
          return x;
        });
        self.$store.commit("SET_FEED_LIST", arr);
      }
    },
    // 获取群组列表
    async getGroupList() {
      let self = this;
      let group = await self.$axios.$get(
        `${api.group.recruiting}?communityid=${
          self.$route.params.communityid
        }&pagenum=1&count=5`
      );
      if (group.code === 0) {
        self.group = group.result;
      }
    }
  },
  beforeMount() {
    let self = this;
    self.getFeedList();
    self.getGroupList();
    // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        type: "else"
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
#group {
  overflow-x: hidden;
}
.member {
  padding: 0 2.67vw 2.67vw;
}
.title {
  margin-bottom: 2.67vw;
  font-size: 24px;
  font-weight: bold;
  text-align: left;
}

.content {
  padding: 0 2vw 2vw;
  text-align: justify;
  font-size: 14px;
  color: #808080;
}

.member,
.works {
  padding-top: 5.336vw;
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
  max-height: 53.36vw;
  overflow: hidden;
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
  max-width: 13.33vw;
  max-height: 13.33vw;
  width: 50px;
  height: 50px;
  display: block;
  border-radius: 4px;
  margin-bottom: 1.335vw;
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
  width: 100%;
  height: 124vw;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
