<template>
  <div class="redirect">
    <div class="not-exist flex flex-v flex-align-center">
      正在跳转中...
    </div>
  </div>
</template>
<script>
export default {
  name: "redirect",
  beforeMount() {
    if (this.$route.query.redirectUrl.indexOf("?") > -1) {
      location.href = `${this.$route.query.redirectUrl}&code=${
        this.$route.query.code
      }`;
    } else {
      location.href = `${this.$route.query.redirectUrl}?code=${
        this.$route.query.code
      }`;
    }
  }
};
</script>
<style>
.not-exist {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>

