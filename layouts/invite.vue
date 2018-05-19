<template>
  <div id="invite">
    <div class="tj-invite">
      <div class="top"></div>
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
                  ¥
                  <span>{{ item.money }}</span>
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
            <div class="content-btn flex flex-align-center flex-pack-center" @click="inviteFriends">邀请好友赚现金</div>
          </div>
        </div>
      </div>
      <div class="tj-invite-center"></div>
      <div class="tj-invite-footer">
        <div :class="{
          'footer-content': true,
          iscollapse: iscollapse
          }"
          >
          <div class="footer-content-title">活动细则</div>
          <div class="footer-content-details">
            <p>1.被推荐的用户输入手机号，即可领取10元现金（在四川地区注册）。</p>
            <p>2.您推荐的用户只要下载并首次登录App（四川地区登录）,您可立即获得10元现金（在我的中查看）。 </p>
            <p>3.您推荐的用户数量达到7人、14人、21人时，分别获得1-7人累计奖励金翻倍（不包括首邀额外奖励），8-14人累计奖励金翻倍和15-21人累计奖励金翻倍的奖励 </p>
            <p>4.您推荐的新用户同一手机设备，同一手机号码仅可领取一次。 </p>
            <p>5.现金释放方式根据被邀请用户登陆天数释放。算了，规则复杂别看了，知道分享能赚钱就行。</p>
          </div>
          <div class="footer-content-collapse" @click="collapse"><i></i>点击展开</div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iscollapse: false,
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
  },
  methods: {
    collapse() {
      console.log(1);
      this.iscollapse = !this.iscollapse;
    },
    inviteFriends() {
      location.href = "closer_invite_guys_raise_cash";
    }
  }
};
</script>
<style>
#invite {
  /* overflow-y: auto; */
  height: 100vh;
}

.tj-invite {
  width: 7.5rem;
  min-height: 100vh;
  background-image: url("~/assets/images/bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.top {
  position: absolute;
  width: 7.5rem;
  height: 6.88rem;
  top: 1.28rem;
  background-image: url("~/assets/images/top@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 8;
}
.bottom {
  position: absolute;
  width: 170px;
  height: 152px;
  bottom: 0;
  left: 0;
  background-image: url("~/assets/images/leftbottom@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 8;
}
.tj-invite-head {
  position: absolute;
  top: 5rem;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.footer-content-title {
  position: absolute;
  top: 1.08rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tj-invite-head,
.footer-content-title {
  font-size: 0.36rem;
  color: #fff;
  font-weight: bold;
  width: 5.42rem;
  height: 1.16rem;
  line-height: 1.12rem;
  text-align: center;
  background-image: url("~/assets/images/Combined-Shape@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.tj-invite-body {
  padding-top: 5.08rem;
  z-index: 9;
  position: relative;
}

.tj-invite-footer {
  padding-top: 1.16rem;
  padding-bottom: 0.3rem;
  position: relative;
  z-index: 12;
}

.body-content,
.footer-content {
  width: 6.9rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.12rem;
  padding: 0.2rem;
  box-sizing: border-box;
}
.body-content {
  height: 9rem;
}

.footer-content {
  /* height: 9.9rem; */
  padding: 0.3rem 0.52rem 0;
  /* 待处理交互 */
  height: 3.5rem;
  overflow: hidden;
  transition: height 0.35s;
}
.iscollapse {
  height: 9.9rem;
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
  height: 1.2rem;
  position: relative;
}

.process-list li > div {
  width: 0.2rem;
  height: 26px;
  min-height: 26px;
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
  z-index: 10;
}
.footer-content-details {
  font-size: 16px;
  line-height: 1.6;
}
.footer-content-details p {
  margin: 0.36rem 0;
  text-align: justify;
}
.footer-content-collapse {
  position: absolute;
  bottom: 0.3rem;
  left: 0.3rem;
  width: 6.9rem;
  height: 0.92rem;
  text-align: center;
  line-height: 0.92rem;
  color: #888;
  border-radius: 0 0 0.12rem 0.12rem;
  background: #fff;
}
</style>
