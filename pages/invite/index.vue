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
                <div :class="{ 
                  fifth: (index + 1) % 7 === 0 || index === 0,
                  checked: index + 1 <= result
                }"></div>
                <span class="fifth-span" v-if="(index + 1) % 7 === 0 || index === 0">{{ index + 1 }}</span>
              </li>
            </ul>
          </div>
          <div class="body-content-details">
            <ul class="details-list flex flex-pack-justify">
              <li :class="{'details-list-cell': true, 'first-list-cell': index===0}" v-for="(item, index) in list" :key="index">
                <div class="details-cell-title">
                  <span v-if="index === 0">首次邀请</span>
                  <span v-else>邀请{{ item.number }}人</span>
                </div>
                <div class="details-cell-body">
                  ¥
                  <span>{{ item.money }}</span>
                </div>
                <div class="details-cell-footer">
                  <span v-if="index === 0">首次+{{ item.money }}元</span>
                  <span v-else>奖励金翻倍</span>
                </div>
                <div class="hide-over" v-if=" !( result >= item.number && result != 0 ) "></div>
              </li>
            </ul>
          </div>
          <div class="body-content-btn flex flex-pack-center">
            <div class="content-btn flex flex-align-center flex-pack-center cursor" @click="inviteFriends">邀请好友赚现金</div>
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
          <div class="footer-content-collapse flex flex-align-end flex-pack-center" @click="collapse">
            <span v-if="!iscollapse">点击展开</span>
            <span v-else>点击收起</span>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, error, store }) {
    try {
      let data = await app.$axios.$get(`${api.admin.invite_counts}`);
      if (data.code === 0) {
        return {
          result: data.result
        };
      } else {
        error({
          message: `${data.result}`
        });
      }
    } catch (err) {
      error({
        message: `${err}`
      });
    }
  },
  data() {
    return {
      iscollapse: false,
      result: {},
      list: [
        {
          number: 0,
          money: 10
        },
        {
          number: 7,
          money: 28
        },
        {
          number: 14,
          money: 28
        },
        {
          number: 21,
          money: 28
        }
      ]
    };
  },
  methods: {
    collapse() {
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
  min-height: 177.87vw;
}

.tj-invite {
  width: 100%;
  min-height: 177.87vw;
  background-image: url("~/assets/images/bg@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.top {
  position: absolute;
  width: 100%;
  height: 91.72vw;
  top: 17.32vw;
  background-image: url("~/assets/images/top@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 8;
}
.bottom {
  position: absolute;
  width: 22.4vw;
  height: 20.26vw;
  bottom: 0;
  left: 0;
  background-image: url("~/assets/images/leftbottom@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 8;
}
.tj-invite-head {
  position: absolute;
  top: 66.66vw;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.footer-content-title {
  position: absolute;
  top: 14.41vw;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tj-invite-head,
.footer-content-title {
  font-size: 4.8vw;
  color: #fff;
  font-weight: bold;
  width: 71.18vw;
  height: 15.47vw;
  line-height: 15.39vw;
  text-align: center;
  background-image: url("~/assets/images/Combined-Shape@2x.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.tj-invite-body {
  padding-top: 67.73vw;
  z-index: 9;
  position: relative;
}

.tj-invite-footer {
  padding-top: 15.47vw;
  padding-bottom: 4vw;
  position: relative;
  z-index: 12;
}

.body-content,
.footer-content {
  width: 90.61vw;
  background: #fff;
  margin: 0 auto;
  border-radius: 6px;
  padding: 2.7vw;
  box-sizing: border-box;
}
.body-content {
  height: 121.82vw;
}

.footer-content {
  /* height: 9.9rem; */
  padding: 4vw 6.94vw 10vw;
  /* 待处理交互 */
  height: 46.67vw;
  box-sizing: border-box;
  overflow: hidden;
  transition: height 0.35s;
}
.iscollapse {
  height: auto;
}
.body-content-title {
  font-size: 3.79vw;
  color: #4b4945;
  margin: 4vw 0;
  text-align: center;
}

.process-list {
  height: 13.54vw;
  margin-bottom: 2.7vw;
}

.process-list li {
  width: 2.66vw;
  height: 16.24vw;
  position: relative;
}

.process-list li > div {
  width: 2.66vw;
  height: 26px;
  min-height: 26px;
  background: #efefef;
  border-radius: 6px;
}

.process-list li div.fifth {
  background: #e0e0e0;
}
.process-list li div.checked {
  background: #fddb00;
}
.fifth-span {
  font-size: 14px;
  margin-top: 1.78vw;
  font-weight: bold;
}

.details-list {
  margin-top: 4vw;
}

.details-list-cell {
  width: 20.26vw;
  height: 28.8vw;
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
  height: 9.33vw;
  line-height: 9.33vw;
  color: #fff;
  font-size: 13px;
}

.details-cell-body {
  height: 11.21vw;
  line-height: 11.21vw;
  font-weight: bold;
  width: 14.93vw;
  margin: 0 auto;
  border-bottom: 1px solid #4b4945;
}

.details-cell-body span {
  font-size: 8vw;
}

.details-cell-footer {
  height: 7.47vw;
  line-height: 7.47vw;
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
  margin: 7.2vw auto 0;
}

.content-btn {
  width: 79.74vw;
  height: 12.54vw;
  background-image: url("~/assets/images/btn@2x.png");
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 16px;
}

.tj-invite-center {
  position: absolute;
  width: 100%;
  height: 78.14vw;
  top: 150.8vw;
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
  margin: 4.8vw 0;
  text-align: justify;
}
.footer-content-collapse {
  position: absolute;
  bottom: 4vw;
  left: 4vw;
  width: 92vw;
  height: 25.6vw;
  padding-bottom: 2.668vw;
  color: #888;
  border-radius: 0 0 0.12rem 0.12rem;
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -o-linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -moz-linear-gradient(-90deg, rgba(255, 255, 255, 0.3), white 65%);
  background: -webkit-linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0.3),
    white 65%
  );
}
</style>
