<template>
    <img class="access-not" :src="defaultImg" v-lazy="$store.state.res.slogo">
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
  width: 10vw;
  height: 10vw;
  border-radius: 5px;
}
</style>