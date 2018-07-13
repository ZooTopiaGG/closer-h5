<template>
  <div class="not-exist flex flex-v flex-align-center">
      <img src="~/assets/images/neterror@2x.png" alt="">
      <div class="error" v-if="error.statusCode === 404">
        <p>页面不存在</p>
        <p class="retry">“正在找回 ({{ time }}s) ...”</p>
      </div>
      <div class="error" v-else-if="error.statusCode === 500 || error.statusCode === 503">
        <p>网络错误</p>
        <p class="retry">“正在重连 ({{ time }}s) ...”</p>
      </div>
      <div class="error" v-else>
        <p>网络开小差了</p>
        <p class="retry">“正在努力连接 ({{ time }}s) ...”</p>
      </div>
      <a class="refresh" href="javascript:;" @click="refresh">刷新</a>
    </div>
</template>
<script>
export default {
  props: ["error"],
  data() {
    return {
      time: 5,
      interTimer: {},
      timeOut: {}
    };
  },
  methods: {
    refresh() {
      location.href = this.$store.state.current_url || location.href;
    }
  },
  created() {
    this.$store.commit("SET_NO_NAV", false);
  },
  mounted() {
    let self = this;
    self.timeOut = setTimeout(() => {
      self.refresh();
    }, 6000);
    self.interTimer = setInterval(() => {
      self.time--;
      if (self.time < 1) {
        clearInterval(self.interTimer);
      } else {
      }
    }, 1000);
  },
  // 销毁定时器， 避免影响性能
  destroyed() {
    clearInterval(this.interTimer);
    clearTimeout(this.timeOut);
  }
};
</script>
<style scoped>
.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.not-exist img {
  width: 46.9vw;
  height: auto;
  margin-bottom: 10px;
}
.error {
  text-align: center;
}
.refresh {
  display: block;
  padding: 3px 20px;
  color: #494845;
  border: 1px solid #494845;
  border-radius: 50px;
  margin-top: 10px;
}
.retry {
  color: #999;
  margin-top: 10px;
}
</style>