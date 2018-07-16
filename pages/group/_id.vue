<template>
  <section id="group" :class="{  
        flex:true,
        commonbox: true,
        'flex-v':true }">
    <section class="member">
      <section class="title">群组成员 {{ $store.state.group_info.group_user_info.length + 1 }}</section>
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
        <li v-for="(item, index) in $store.state.group_info.group_user_info" :key="index" v-if="index < 4" class="flex flex-v flex-align-center flex-pack-center">
          <img v-lazy="$com.makeFileUrl(item.props.roster.avatar)">
          <span class="ellipsis">{{ item.props.roster.name }}</span>
        </li>
      </ul>
      <section class="more-member">查看更多群成员 ></section>
    </section>
    <section class="intro">
      <section class="title">
        <span>群简介</span>
      </section>
      <section class="content">
        <p class="text-ellipse" v-if="$store.state.group_info.group_info && $store.state.group_info.group_info.group">{{ JSON.parse($store.state.group_info.group_info.group.description)[0].content }}</p>
      </section>
    </section>
    <section class="intro">
      <section class="title">
        <span>当前话题</span>
      </section>
      <section class="content">
        <p class="text-ellipse" v-if="$store.state.group_info.group_info && $store.state.group_info.group_info.group">{{ JSON.parse($store.state.group_info.group_info.group.description)[0].content }}</p>
      </section>
    </section>
    <section class="split-box"></section>
    <section class="title group-community flex flex-pack-justify flex-align-center">
      <span>所属贴近号</span>
      <section class="group-logo flex flex-align-center">
        <img :src="$store.state.feed_list[0].blogo">
        <span>{{ $store.state.feed_list[0].communityName }}</span>
      </section>
    </section>    
    <section class="works flex-1">
      <dp-feed v-if="$store.state.feed_list.length > 0"></dp-feed>
      <no-thing v-else></no-thing>
    </section>
  </section>
</template>
<script>
import noThing from "~/components/nothing";
export default {
  middleware: "group",
  components: {
    noThing
  },
  data() {
    return {
      id: ""
    };
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
.intro {
  padding-top: 5.34vw;
}

.works {
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
.group-community {
  height: 18.67vw;
  margin: 0;
  padding: 0 5.33vw;
  box-sizing: border-box;
}
.more-member {
  text-align: center;
  color: #507caf;
  font-size: 14px;
}
.group-logo {
  font-size: 14px;
}
.group-logo > img {
  width: 18.9vw;
  height: 8vw;
  border-radius: 5px;
  margin-right: 2.67vw;
}
</style>
