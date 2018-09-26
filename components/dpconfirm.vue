<template>
  <section class="dpConfirm">
    <section class="close" @click="backFeed">
      <i></i>
    </section>
    <section class="desc title">
      <section>恭喜你！留言成功</section>
    </section>
    <section class="desc">
      <section>快去app看看其他精彩留言吧～</section>
    </section>
    <section class="button-group flex">
      <span class="wait" @click="backFeed">
        再等等
      </span>
      <span class="ok" @click="downApp">好的</span>
    </section>
  </section>
</template>
<script>
export default {
  name: "dpConfirm",
  data() {
    return {};
  },
  props: {},
  methods: {
    hideConfirm() {
      this.$store.commit("SHOW_CONFIRM", false);
    },
    // h5下载补丁
    async downApp(e, str) {
      let self = this;
      await self.$com.down_statistics({
        store: self.$store,
        route: self.$route,
        str,
        defaultStr: "message"
      });
      self.$store.commit("SHOW_CONFIRM", false);
    },
    backFeed() {
      this.$store.commit("SHOW_CONFIRM", false);
      this.$router.push({
        path: `/feed/${this.$route.params.messageid}`,
        hash: "messageboard"
      });
    }
  }
};
</script>
<style scoped lang="less">
@m15: 2vw;
@m20: 2.67vw;
@textcolor: #4b4945;
@primarycolor: #fddb00;
.dpConfirm {
  width: 87.2vw;
  background: #fff;
  padding: @m20 @m20 @m15 @m20;
  box-sizing: border-box;
  margin: @m20 * 10 auto 0;
  border-radius: 3px;
  > section:not(.close) {
    padding: 0 @m20;
  }
  .title {
    font-weight: bold;
  }
  .desc {
    font-size: 18px;
    text-align: center;
    line-height: 1.8;
  }
  .close {
    height: @m15;
    min-height: 10px;
    i {
      display: block;
      width: @m15;
      height: @m15;
      min-width: 10px;
      min-height: 10px;
      background: url("../assets/images/Shape@2x.png") no-repeat;
      background-size: cover;
      float: right;
    }
  }
  .button-group {
    margin-top: @m20 * 6;
    > span {
      width: 50%;
      height: @m20 * 4;
      text-align: center;
      line-height: @m20 * 4;
    }
    .wait {
      color: #94928e;
    }
    .ok {
      color: @textcolor;
      background: @primarycolor;
      border-radius: 5px;
      font-size: 16px;
    }
  }
}
</style>
