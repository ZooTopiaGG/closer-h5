<template>
  <section class="dpTextArea flex flex-v">
    <mt-field placeholder="写下你的评论" type="textarea" v-model="textarea" rows="5" class="tj-textarea flex-1"></mt-field>
    <section class="flex flex-align-end flex-pack-end">
      <mt-button type="default" size="small" class="cancel" @click="cancel">取 消</mt-button>
      <mt-button type="primary" size="small" @click="sure">确 定</mt-button>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    return {
      textarea: ""
    };
  },
  methods: {
    // 确认留言
    async sure() {
      let self = this;
      if (self.textarea == "") {
        self.$toast({
          message: "内容不能为空！",
          position: "top"
        });
        return false;
      }
      try {
        let para = {
          subjectid: self.item.subjectid,
          content: self.textarea,
          lastid: self.item.commentid
        };
        let data = await self.$axios.$post(`${api.admin.add_reply}`, para);
        if (data.code === 0) {
          self.messageList();
          self.$toast({
            message: "留言成功",
            position: "top"
          });
          self.visibleMessage = false;
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
      }
    },
    // 取消留言
    cancel() {
      this.visibleMessage = false;
    }
  }
};
</script>
<style>
.dpTextArea {
  width: 100%;
  padding: 0 4vw 4vw;
  background: #fff;
  min-height: 180px;
  box-sizing: border-box;
  padding-top: 14.4vw;
}
</style>

