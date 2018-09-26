<template lang="html">
  <div class="loading-page" v-if="loading">
    <img src="~/assets/images/loading2.gif" alt="loading"/>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.loading-page img {
  width: 100%;
  height: 100%;
}
</style>