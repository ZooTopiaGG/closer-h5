<template>
  <div class="feeder-cover flex flex-align-center flex-pack-justify">
    <div class="flex flex-1 flex-align-center">
      <img class="access-not" :src="defaultImg" :data-original="$store.state.res.blogo">
      <span class="communityName ellipsis" v-if="$store.state.res.communityName">{{ $store.state.res.communityName }}</span>
      <span class="communityName ellipsis" v-else>{{ $store.state.res.name }}</span>
    </div>
    <div class="flex flex-align-center focus" @click="tjFocus">
      <span>+关注</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  },
  methods: {
    tjFocus() {}
  }
};
</script>
<style scoped lang="less">
@textcolor: #495060;
.feeder-cover {
  padding: 5.3vw 4vw;
  width: 100%;
  box-sizing: border-box;
  .access-not {
    width: 13.87vw;
    height: 5.87vw;
    margin-right: 2.67vw;
    border-radius: 5px;
  }
  .communityName {
    max-width: 45vw;
    color: @textcolor;
    font-size: 14px;
    height: 19px;
    overflow-y: hidden;
  }
  .focus {
    color: #507caf;
    font-size: 16px;
    padding-right: 1.35vw;
  }
}
</style>