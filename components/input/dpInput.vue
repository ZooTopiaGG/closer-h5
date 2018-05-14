<template>
  <input ref="_input" :disabled="disabled" :type="type" class="_input" value="bname" :placeholder="placeholder" />
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
      default: "text"
    },
    currentChange: {
      type: Function
    },
    disabled: {
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入内容"
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
