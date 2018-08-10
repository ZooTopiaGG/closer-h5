<template>
  <div id="bonus" class="flex flex-align-center flex-pack-center">
    <!-- <img src="~/assets/images/bonus@2x.png" alt=""> -->
    <div class="bonus-body flex flex-v flex-align-center flex-pack-justify">
      <div class="bonus-body-avatar">
        <img v-lazy="$com.makeFileUrl(res.avatar)">
      </div>
      <div class="bonus-body-desc">
        <p>{{ res.name }}</p>
        <p>给你发了一个大红包</p>
      </div>
      <div class="bonus-body-money"><span class="unit">¥</span><span class="money">10</span><span>元</span></div>
      <div class="bonus-body-btnopen">
        <img :class="{
          openbonus: openbonus,
          cursor: true
        }" @click="toopenbonus" src="~/assets/images/btn_open@2x.png" alt="avatar" srcset="~/assets/images/btn_open@2x.png">
      </div>
      <div class="bonus-body-role">
        <div class="bonus-role-bottom flex flex-align-center flex-pack-center">大吉大利</div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  async asyncData({ app, query, store, redirect, req }) {
    // if (req.headers["user-agent"].indexOf("MicroMessenger") <= -1) {
    //   redirect("/redirect/needwx");
    // }
    try {
      let data = await app.$axios.$get(
        `${api.admin.info}?uid=${query.inviter}`
      );
      if (data.code === 0) {
        data.result.id = query.inviter;
        return {
          res: data.result
        };
      }
    } catch (err) {
      error({ message: `${err}` });
    }
  },
  head() {
    return {
      title: "关注身边事，开心拿红包"
    };
  },
  data() {
    return {
      openbonus: false,
      res: {}
    };
  },
  methods: {
    // 打开红包
    async toopenbonus() {
      try {
        this.openbonus = true;
        let self = this;
        Cookie.set("inviter", self.res);
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // url: `${location.protocol}//${
            //   location.hostname
            // }/redirect?redirectUrl=${location.protocol}//${
            //   location.hostname
            // }/invite/openbonus?id=${self.$route.query.inviter}`
            url: `${location.protocol}//${
              location.hostname
            }/invite/openbonus?id=${self.$route.query.inviter}`
          });
          return;
        } else {
          this.$router.push({ path: "/invite/register" });
        }
      } catch (e) {}
    }
  },
  mounted() {}
};
</script>
<style>
#bonus {
  overflow-y: auto;
  min-height: 100vh;
  background: brown;
  position: relative;
}
.bonus-body {
  width: 94.93vw;
  height: 155.7vw;
  position: relative;
  z-index: 1;
  background: url("~/assets/images/bonus@2x.png") no-repeat;
  background-size: cover;
}
.bonus-body-desc {
  margin-bottom: 5.51vw;
  font-size: 16px;
  color: rgba(255, 221, 106, 1);
  text-align: center;
  font-weight: bold;
}
.bonus-body-desc p {
  margin: 0;
  line-height: 5.8vw;
}
.bonus-body-money {
  height: 12.63vw;
  color: rgba(255, 221, 106, 1);
  box-sizing: border-box;
  font-weight: bold;
  font-size: 24px;
}
.money {
  font-size: 48px;
  margin: 0 3px;
}
.unit {
  position: relative;
  top: -16px;
}
.bonus-body-avatar {
  padding-top: 19vw;
  margin-bottom: 5vw;
}
.bonus-body-avatar > img {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  border: 2px solid #ffdd6a;
}
.bonus-body-money {
  margin-bottom: 12.91vw;
}
.bonus-body-btnopen > img {
  width: 138px;
  height: 138px;
}
.bonus-body-btnopen {
  margin-bottom: 10.672vw;
}
.bonus-body-role {
  margin-bottom: 3vw;
  font-size: 18px;
  color: #fabb7d;
}
.bonus-role-bottom {
  width: 37.33vw;
  height: 10.8vw;
  background-image: url("~/assets/images/bottomcenter@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.openbonus {
  animation: mymove 2s infinite linear;
  -moz-animation: mymove 2s infinite linear; /* Firefox */
  -webkit-animation: mymove 2s infinite linear; /* Safari and Chrome */
  -o-animation: mymove 2s infinite linear; /* Opera */
}
@keyframes mymove {
  from {
    transform: rotate3d(0, 1, 0, 0);
  }
  to {
    transform: rotate3d(0, 1, 0, 360deg);
  }
}
</style>

