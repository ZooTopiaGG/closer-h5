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
        <p class="text-ellipse" v-if="$store.state.group_info.group_info && $store.state.group_info.group_info.group">{{ JSON.parse($store.state.group_info.group_info.group.description)[0].content }}</p>
      </div>
    </div>
    <div class="split-box"></div>
    <div class="works">
      <div class="title">群作品</div>
      <dp-feed></dp-feed>
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
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: "closer-share"
      });
      if (result) {
        location.href = `${api.downHost}?downurl=closer://group/${
          this.$route.params.id
        }`;
      }
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
  mounted() {}
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
</style>
