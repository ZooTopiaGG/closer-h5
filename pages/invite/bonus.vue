<template>
  <div id="bonus" class="flex flex-align-center flex-pack-center">
    <div class="bonus-body flex flex-v flex-align-center flex-pack-around">
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
          openbonus: openbonus
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
  async asyncData({ app, query, store }) {
    try {
      let data = await app.$axios.$get(
        `${api.admin.info}?uid=${query.inviter}`
      );
      if (data.code === 0) {
        // console.log("daateeeeee", data);
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
      this.openbonus = true;
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      // console.log(self.res);
      Cookie.set("inviter", self.res);
      // console.log(Cookie.get("inviter"));
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        // console.log(Cookie.get("user"));
        this.$router.push({ path: "/invite/alreadyget" });
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url: `${location.protocol}//${location.hostname}/invite/openbonus`
          });
          return;
        } else {
          this.$router.push({ path: "/invite/register" });
        }
      }
    }
  },
  mounted() {}
};
</script>
<style>
#bonus {
  overflow-y: auto;
  height: 100vh;
  background: brown;
}
.bonus-body {
  width: 7.12rem;
  height: 11.68rem;
  background-image: url("~/assets/images/bonus@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.bonus-body-desc {
  margin-bottom: 0.42rem;
  font-size: 16px;
  color: rgba(255, 221, 106, 1);
  text-align: center;
  font-weight: bold;
}
.bonus-body-desc p {
  margin: 0;
  line-height: 0.44rem;
}
.bonus-body-money {
  height: 0.96rem;
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
  padding-top: 1.44rem;
  margin-bottom: 0.38rem;
}
.bonus-body-avatar > img {
  width: 1.28rem;
  height: 1.28rem;
  border-radius: 100%;
  border: 2px solid #ffdd6a;
}
.bonus-body-money {
  margin-bottom: 0.98rem;
}
.bonus-body-btnopen > img {
  width: 2.76rem;
  height: 2.76rem;
}
.bonus-body-btnopen {
  margin-bottom: 1.3rem;
}
.bonus-body-role {
  margin-bottom: 0.2rem;
  font-size: 18px;
  color: #fabb7d;
}
.bonus-role-bottom {
  width: 2.8rem;
  height: 0.82rem;
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

