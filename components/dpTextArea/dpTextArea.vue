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
  padding: 0 4vw 2.25vh;
  background: #fff;
  min-height: 180px;
  box-sizing: border-box;
  padding-top: 7.35vh;
}
.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 3.9vh;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  height: 4.5vh;
  line-height: 4.5vh;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.124vh;
}
.cancel {
  margin-right: 2.67vw;
}
</style>
