<template>
  <section class="tomessage">
    <section class="message-content">
      你还在追“小升初”的时候，成都有妈妈提前下手“五升六了”
    </section>
    <section class="input-message">
      <textarea name="textarea" class="mint-field" placeholder="发表你的意见吧～"></textarea>
      <mt-button type="primary">留 言</mt-button>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped lang="less">
@m20: 2.67vw;
@textcolor: #4b4945;
.tomessage {
  padding: @m20 * 2;
  .message-content {
    margin-bottom: @m20 * 2;
    font-size: 18px;
    text-align: justify;
  }
  .input-message {
    .mint-field {
      margin-bottom: @m20 * 2;
      height: 35.73vw;
      background: #f8f8f8;
      box-sizing: border-box;
      width: 100%;
      border: 0;
      outline: 0;
      padding: @m20;
      line-height: 1.6;
      font-size: 14px;
      color: @textcolor;
    }
    .mint-button {
      width: 100%;
    }
  }
}
</style>
