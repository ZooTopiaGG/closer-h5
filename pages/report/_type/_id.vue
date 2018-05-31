<template>
  <div id="report">
    <div class="report">
      <div class="title">
        举报
        <span v-if="$route.params.type==='f'">
          <span v-if="res.data.double_latitude !== -999">{{ res.data.className }}</span>
          <span v-else>{{ res.data.communityName }}</span>
          的帖子：
          <span v-if="res.data.title" style="color:#94928E">{{ res.data.title }}</span>
        </span>
        <span v-else>
          <span>{{ res.data.name }}</span>
          的栏目：
        </span>
      </div>
      <div class="radio-group flex">
        <dp-radio style="width: 50%;" v-for="(item, index) in res.list" :key="index" :on-change="reportChange" :radioValue="item.reportTypeId"
          :bname="item.reportContents">
        </dp-radio>
      </div>
      <div>
        <textarea name="reportcon" rows="4" class="reportcon" v-model="reportcon" placeholder="如果你有更多信息，会帮助我们加速处理哦"></textarea>
      </div>
    </div>
    <div class="btn">
      <mt-button type="primary" class="margin-bottom-80 tj-btn" @click="repo" :disabled="disabled">
        <span v-if="loading===1">举 报</span>
        <span v-else-if="loading===2" class="flex flex-align-center flex-pack-center">
          <span>正在举报</span>
          <mt-spinner :size="16" type="triple-bounce" color="#495060" style="margin-left:5px"></mt-spinner>
        </span>
        <span v-else>已举报，受理中</span>
      </mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "report-id",
  // 设置title
  head() {
    return {
      title: "举报"
    };
  },
  async asyncData({ params, error, app, store }) {
    try {
      // 举报栏目
      if (params.type === "c") {
        let para = {
          communityid: params.id
        };
        let para1 = {
          reportType: "community"
        };
        let [list, data] = await Promise.all([
          app.$axios.$post(`${api.command.reportType}`, para1),
          app.$axios.$post(`${api.command.show}`, para)
        ]);
        if (list.code === 0) {
          return {
            res: {
              data: data.result,
              list: list.result.data,
              token: store.state.GET_APP_TOKEN || "不存在"
            }
          };
        } else {
          error({
            message: `错误代码:${list.code}, ${list.result}`
          });
        }
      } else {
        // 举报贴子
        let para = {
          subjectid: params.id
        };
        let para1 = {
          reportType: "subject"
        };
        let [list, data] = await Promise.all([
          app.$axios.$post(`${api.command.reportType}`, para1),
          app.$axios.$post(`${api.command.show}`, para)
        ]);
        if (data.code === 0) {
          return {
            res: {
              data: data.result,
              list: list.result.data,
              token: store.state.GET_APP_TOKEN || "不存在"
            }
          };
        } else {
          error({
            message: `错误代码:${data.code}, ${data.result}`
          });
        }
      }
    } catch (err) {
      error({
        message: `${err}`
      });
    }
  },
  computed: {
    content() {
      return JSON.parse(this.res.content);
    }
  },
  data() {
    return {
      loading: 1, // 按钮执行状态
      disabled: false, // 按钮可用状态
      reportcon: "",
      reportinfo: null
    };
  },
  methods: {
    // 点击单选按钮时变化
    reportChange(item) {
      this.reportinfo = item.target.value;
      // 监听按钮状态
      this.disabled = false;
      this.loading = 1;
    },
    // 举报
    async repo() {
      let self = this;
      if (!self.reportinfo) {
        self.$toast({
          message: "请选择举报信息！",
          position: "top"
        });
        return;
      }
      try {
        let para = {
          reportType: self.$route.params.type === "f" ? "subject" : "community",
          reportCode: self.reportinfo,
          objectId: self.$route.params.id,
          comments: ""
        };
        let data = await self.$axios.$post(`${api.command.report}`, para);
        if (data.code === 0) {
          self.disabled = true;
          self.loading = 3;
        } else {
          self.$toast({
            message: data.result,
            position: "top"
          });
          self.loading = 1;
        }
      } catch (err) {
        self.$toast({
          message: err,
          position: "top"
        });
        self.loading = 1;
      }
    }
  },
  mounted() {
    console.log(this.res);
  }
};
</script>
<style type="text/css">
.dp-text-color {
  color: #fddb00;
}

#report .ivu-radio-group {
  display: flex;
  flex-wrap: wrap;
}

#report .ivu-radio-wrapper {
  margin-right: 0;
  width: 50%;
  font-size: 13px;
  margin-bottom: 2.25vh;
}
</style>
<style scoped="scoped">
#report {
  font-size: 13px;
  margin-top: 5.6vh;
}

.radio-group {
  flex-wrap: wrap;
  margin-bottom: 1.5vh;
}

.report {
  padding: 1.5vh 2.67vw;
  box-sizing: border-box;
  background: #fff;
}

.title {
  margin-bottom: 3vh;
}

.desc {
  background: #f4f4f4;
  padding: 1.5vh 1.33vw;
  margin: 0 0 4.5vh;
}

.tj-btn {
  width: 100%;
  font-size: 14px;
}

.btn {
  padding: 1.5vh 2.67vw;
  margin-top: 2.25vh;
}

.reportcon {
  vertical-align: bottom;
  background: #f4f4f4;
  display: inline-block;
  width: 100%;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}

.reportcon:focus {
  outline: 0;
  box-shadow: 0 0 0 2px rgba(253, 219, 0, 0.2);
}

.reportcon:focus,
.reportcon:hover {
  border-color: #fddb00;
}
</style>
