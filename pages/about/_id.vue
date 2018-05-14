<template>
  <div id="about">
    <div class="about">
      <div class="part" v-for="(item,index) in 5" :key="index">
        <h3>贴近认证说明</h3>
        <p>微信认证是腾讯对公众号主体所提交的主体信息、资质文件的真 实性与合法性进行书面甄别与核实的过程。微信认证有效期为一 年。</p>
        <p>微信公众平台是为用户提供信息分享、传播及获取的平台，公众 号的所有行为并不因微信认证成功而具备真实性与合法性，敬请 留意甄别。</p>
        <p>如对帐号信息或行为有异议，请点击这里投诉</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
#about {
  padding: 0.22rem;
  line-height: 1.6;
}

.part {
  margin-bottom: 0.2rem;
}

h3 {
  margin-bottom: 0.2rem;
}
</style>
