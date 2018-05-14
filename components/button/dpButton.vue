<template>
  <div class="dpButton flex">
    <button ref="_button" :disabled="disabled" :type="type != 'text' ? 'button' : 'text' " class="button" v-html="bname"></button>
  </div>
</template>
<script>
export default {
  name: "dpButton",
  props: {
    bname: {
      type: String,
      default: "按钮"
    },
    type: {
      type: String,
      default: "primary"
    },
    currentChange: {
      type: Function
    },
    disabled: {
      default: false
    }
  },
  data() {
    // bname: 'button'
    return {
      name: "buttons"
    };
  },
  mounted() {
    console.log(this.$refs._button);
    this.$refs._button.setAttribute("class", `button button-${this.type}`);
  }
};
</script>
<style lang="less">
@import "../../assets/css/index.less";
</style>
