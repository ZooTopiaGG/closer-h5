<template>
  <div class="dpTextArea flex flex-v">
    <mt-field placeholder="写下你的评论" type="textarea" v-model="textarea" rows="5" class="tj-textarea flex-1"></mt-field>
    <div class="flex flex-align-end flex-pack-end">
      <mt-button type="default" size="small" class="cancel" @click="cancel">取 消</mt-button>
      <mt-button type="primary" size="small" class="" @click="sure">确 定</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "dpTextArea",
  // components: {
  //     dpButton,
  //     dpRadio
  // },
  data() {
    return {
      textarea: ""
    };
  },
  methods: {
    sure() {
      this.$store.commit("SET_VISIBLE_MESSAGE", false);
    },
    cancel() {
      this.$store.commit("SET_VISIBLE_MESSAGE", false);
    }
  }
};
</script>
<style>
</style>
<style scoped>
.dpTextArea {
  width: 100%;
  padding: 0 0.3rem 0.3rem;
  background: #fff;
  min-height: 180px;
  box-sizing: border-box;
  padding-top: 0.98rem;
}
.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 0.52rem;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.15rem;
}
.cancel {
  margin-right: 0.2rem;
}
</style>
