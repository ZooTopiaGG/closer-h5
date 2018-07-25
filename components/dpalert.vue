<template>
  <section class="dpAlert">
    <section class="close" @click="hideAlert">
      <i></i>
    </section>
    <section class="desc">
      <section>您已成功关注了“{{ $store.state.res.communityName }}”贴近号，去快看看这个贴近号下的其他帖子吧~</section>
    </section>
    <section class="desc-icon">
      <img src="~/assets/images/bnanner1@4x@2x.png" alt="">
    </section>
    <section class="button-group flex">
      <span class="sure" @click="downApp">
        确 认
      </span>
    </section>
  </section>
</template>
<script>
export default {
  name: "dpAlert",
  data() {
    return {};
  },
  methods: {
    // h5下载补丁
    // 纯下载
    async downApp(e, str) {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: self.$store.state.h5Adid || "closer-share" // 栏目id
      });
      if (result) {
        let _page, url, did;
        if (self.$route.path.indexOf("/community") > -1) {
          _page = "community";
          did = self.$route.params.id;
          url = `closer://community/${did}`;
        } else if (self.$route.path.indexOf("/feed") > -1) {
          _page = "feed";
          did = self.$route.params.id;
          url = `closer://feed/${did}`;
        } else if (self.$route.path.indexOf("/group") > -1) {
          _page = "feed";
          did = self.$route.params.id;
          url = `closer://group/${self.$route.params.id}`;
        } else {
          _page = "inviter";
        }
        let res = await self.$store.dispatch("down_statistics", {
          dataId: did || "",
          page: _page || "feed",
          action: "download",
          extension: str || "follow"
        });
        if (res) {
          self.$com.downApp(url);
        }
      }
    },
    hideAlert() {
      this.$store.commit("SHOW_ALERT", false);
    }
  },
  props: {}
};
</script>
<style scoped lang="less">
@m15: 2vw;
@m20: 2.67vw;
@textcolor: #4b4945;
@primarycolor: #fddb00;
.dpAlert {
  width: 87.2vw;
  background: #fff;
  box-sizing: border-box;
  margin: @m20 * 13 auto 0;
  border-radius: 3px;
  .close {
    height: @m15;
    i {
      display: block;
      width: @m15;
      height: @m15;
      min-width: 10px;
      min-height: 10px;
      background: url("~/assets/images/Shape@2x.png") no-repeat;
      background-size: cover;
      float: right;
    }
  }
  > section:not(.desc-icon) {
    padding-left: @m20 * 2;
    padding-right: @m20 * 2;
  }
  > section.close {
    padding: @m20 @m20 0 0;
  }
  .title {
    font-weight: bold;
  }
  .desc {
    font-size: 18px;
    text-align: justify;
    line-height: 1.8;
    padding-top: @m20 * 2;
    padding-bottom: @m20 * 3;
    box-sizing: border-box;
  }
  .desc-icon {
    img {
      width: 100%;
      height: auto;
    }
  }
  .button-group {
    > span {
      width: 100%;
      height: @m20 * 5;
      text-align: center;
      line-height: @m20 * 5;
      font-size: 16px;
    }
  }
}
</style>
