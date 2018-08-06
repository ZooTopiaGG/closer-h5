<template>
    <img class="access-not" :src="defaultImg" v-lazy="$store.state.res.blogo">
</template>
<script>
export default {
  props: {},
  data() {
    return {
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg=="
    };
  }
};
</script>
<style scoped>
.access-not {
  width: 21.87vw;
  height: 8.54vw;
  border-radius: 5px;
}
</style>