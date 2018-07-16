<template>
    <section class="flex flex-align-center focus" @click="tjFocus">
      <span>+关注</span>
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
<style scoped>
.focus {
  color: #507caf;
  font-size: 16px;
  padding-right: 1.35vw;
}
</style>