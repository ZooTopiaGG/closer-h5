<template>
  <div id="about">
    <div class="about">
      <div class="part">
        <h3>1、什么是奖励金？</h3>
        <p>为鼓励用户分享，贴近平台对将对用户成功拉新的行为给予的现金奖励；</p>
        <h3>2、如何获取奖励金？</h3>
        <p>新用户通过您分享的链接下载贴近客户端并注册账号后，奖励金将自动发放到您的账户中；</p>
        <h3>3、怎么查看奖励金账户？</h3>
        <p>登录贴近客户端-我的-我的钱包-奖励金；</p>
        <h3>4、为什么我有一笔奖励金，但是无法使用？</h3>
        <p>您收到的奖励金属于冻结状态（未解冻），不能立即提现。根据您邀请的用户登陆贴近APP的天数，冻结余额会逐步解冻。具体规则：对应新用户每登陆一天，账户解冻0.2元；</p>
        <h3>5、奖励金是否可以提现？</h3>
        <p>已解冻部分奖励金将自动放置于我的钱包-可用余额中，达到钱包提现规定余额时即可操作提现。</p>
        <nuxt-link to="/about/withdrawrole">钱包提现规则详见：贴近客户端-我的-我的钱包-提现。</nuxt-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
#about {
  padding: 0.22rem;
  padding-top: 0.88rem;
  line-height: 1.6;
}

.part {
  margin-bottom: 0.2rem;
  text-align: justify;
}
.part a {
  color: #409eff;
}
h3,
p {
  margin-bottom: 0.2rem;
}
h3 {
  color: #444;
}
</style>
