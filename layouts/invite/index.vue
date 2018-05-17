<template>
  <div id="invite">
    <div class="tj-invite">
      <div class="tj-invite-head">
        <span>邀请好友赚现金</span>
      </div>
      <div class="tj-invite-body">
        <div class="body-content">
          <div class="body-content-title">
            <span>首次成功邀请一个好友，享受奖励金直接翻倍效果！</span>
          </div>
          <div class="body-content-process">
            <ul class="process-list flex flex-pack-justify">
              <li v-for="(item, index) in 21" :key="item" class="flex flex-v flex-align-center">
                <div :class="{ fifth: (index + 1) % 7 === 0 || index === 0 }"></div>
                <span class="fifth-span" v-if="(index + 1) % 7 === 0 || index === 0">{{ index + 1 }}</span>
              </li>
            </ul>
          </div>
          <div class="body-content-details">
            <ul class="details-list flex flex-pack-justify">
              <li :class="{'details-list-cell': true, 'first-list-cell': index===0}" v-for="(item, index) in list" :key="index">
                <div class="details-cell-title">
                  <span v-if="index === 0">首次邀请</span>
                  <span v-else>{{ item.name }}</span>
                </div>
                <div class="details-cell-body">
                  ¥<span>{{ item.money }}</span>
                </div>
                <div class="details-cell-footer">
                  <span v-if="index === 0">首次+{{ item.money }}元</span>
                  <span v-else>奖励金翻倍</span>
                </div>
                <div class="hide-over" v-if="!item.yet_invite"></div>
              </li>
            </ul>
          </div>
          <div class="body-content-btn flex flex-pack-center">
            <div class="content-btn flex flex-align-center flex-pack-center">邀请好友赚现金</div>
          </div>
        </div>
      </div>
      <div class="tj-invite-center">

      </div>
      <div class="tj-invite-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "首次邀请",
          money: 10,
          yet_invite: true
        },
        {
          name: "邀请7人",
          money: 70,
          yet_invite: true
        },
        {
          name: "邀请14人",
          money: 70,
          yet_invite: false
        },
        {
          name: "邀请21人",
          money: 70,
          yet_invite: false
        }
      ]
    };
  }
};
</script>
<style>
#invite {
  overflow-y: auto;
  height: 100vh;
}
.tj-invite {
  min-height: 100vh;
  width: 7.5rem;
  background-image: url("~/assets/images/bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.tj-invite-head {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.36rem;
  color: #fff;
  font-weight: bold;
  width: 4.88rem;
  height: 0.76rem;
  line-height: 0.74rem;
  text-align: center;
  background-image: url("~/assets/images/Combined-Shape@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.tj-invite-body {
  padding-top: 5.08rem;
}
.body-content {
  width: 6.9rem;
  height: 9rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.12rem;
  padding: 0.2rem;
  box-sizing: border-box;
}
.body-content-title {
  font-size: 0.28rem;
  color: #4b4945;
  margin: 0.3rem 0;
  text-align: center;
}
.process-list {
  height: 1rem;
  margin-bottom: 0.2rem;
}
.process-list li {
  width: 0.2rem;
  height: 1rem;
  position: relative;
}
.process-list li > div {
  width: 0.2rem;
  height: 0.52rem;
  background: #efefef;
  border-radius: 0.1rem;
}
.process-list li div.fifth {
  background: #e0e0e0;
}
.fifth-span {
  font-size: 14px;
  margin-top: 0.14rem;
  font-weight: bold;
}
.details-list {
  margin-top: 0.3rem;
}
.details-list-cell {
  width: 1.52rem;
  height: 2.16rem;
  background-image: url("~/assets/images/card2@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  position: relative;
}
.first-list-cell {
  background-image: url("~/assets/images/card1@2x.png");
}
.details-cell-title {
  height: 0.7rem;
  line-height: 0.7rem;
  color: #fff;
  font-size: 13px;
}
.details-cell-body {
  height: 0.84rem;
  line-height: 0.84rem;
  font-weight: bold;
  width: 1.12rem;
  margin: 0 auto;
  border-bottom: 1px solid #4b4945;
}
.details-cell-body span {
  font-size: 0.6rem;
}
.details-cell-footer {
  height: 0.56rem;
  line-height: 0.56rem;
  font-size: 10px;
}
.hide-over {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
}
.body-content-btn {
  margin: 0.54rem auto 0;
}
.content-btn {
  width: 5.98rem;
  height: 0.94rem;
  background-image: url("~/assets/images/btn@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 16px;
}
.tj-invite-center {
  position: absolute;
  width: 7.5rem;
  height: 5.86rem;
  top: 11.14rem;
  left: 0;
  background-image: url("~/assets/images/zhubo@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

