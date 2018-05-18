<template>
  <div id="bonus">
    <div class="bonus-body flex flex-v flex-align-center flex-pack-around">
      <div class="bonus-body-avatar">
        <img src="~/assets/images/btn_open@2x.png" alt="avatar" srcset="~/assets/images/btn_open@2x.png">
      </div>
      <div class="bonus-body-desc">
        <p>海哥</p>
        <p>给你发了一个大红包</p>
      </div>
      <div class="bonus-body-money"><span class="unit">¥</span><span class="money">10</span><span>元</span></div>
      <div class="bonus-body-btnopen">
        <img :class="{
          openbonus: openbonus
        }" @click="toopenbonus" src="~/assets/images/btn_open@2x.png" alt="avatar" srcset="~/assets/images/btn_open@2x.png">
      </div>
      <div class="bonus-body-role">
        <div class="bonus-role-bottom flex flex-align-center flex-pack-center">活动规则</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // middleware: "bonus",
  data() {
    return {
      openbonus: false
    };
  },
  methods: {
    // 打开红包
    toopenbonus() {
      this.openbonus = true;
    }
  },
  beforeMount() {
    console.log(location.href);
    console.log(this.$com.isWeiXin());
    if (this.$com.isWeiXin()) {
      // this.$store.dispatch("get_wx_auth", {
      //   url: "http://h5-sandbox.tiejin.cn/invite/bonus"
      // });
    }
  }
};
</script>
<style>
#bonus {
  /* overflow-y: auto; */
  height: 100vh;
  background: brown;
  padding: 0.2rem;
  box-sizing: border-box;
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
  margin-bottom: 0.22rem;
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
  animation: mymove 3s infinite;
  -moz-animation: mymove 3s infinite; /* Firefox */
  -webkit-animation: mymove 3s infinite; /* Safari and Chrome */
  -o-animation: mymove 3s infinite; /* Opera */
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

