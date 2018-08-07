<template>
  <div class="redirect">
    <div class="not-exist flex flex-v flex-align-center">
      <img class="exist-prompt" src="~/assets/images/prompt.png" alt="" width="96" height="96">
      请在微信客户端打开链接
    </div>
  </div>
</template>
<script>
export default {
  name: "redirect"
};
</script>
<style>
.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.exist-prompt {
  margin-bottom: 10px;
}
</style>

