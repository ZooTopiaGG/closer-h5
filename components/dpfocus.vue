<template>
    <section class="flex flex-align-center focus" @click="tjFocus">
      <section class="no-focus flex flex-align-center">
        <i></i>
        <span>关注</span>
      </section>
    </section>
</template>
<script>
export default {
  props: {
    tjFocus: {
      type: Function,
      default: () => {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang="less">
@m20: 2.667vw;
.focus {
  color: #507caf;
  font-size: 16px;
  padding-right: @m20 / 2;
  .no-focus {
    i {
      display: block;
      width: @m20;
      height: 2.933vw;
      margin-right: 0.8vw;
      background: url("~/assets/images/add@2x.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>