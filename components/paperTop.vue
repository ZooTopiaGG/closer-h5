<template>
  <section class="paper" v-if="$route.query.from === 'paper'">
    <section>
      <section v-if="!$store.state.version_1_3" class="feeder-title feeder-title-2 feeder-title-3">
        <span class="call_papers_1_4" v-if="$store.state.version_1_4 || $store.state.not_closer_app">话题</span>
        {{ $store.state.res.title }} 
      </section>
      <section class="flex flex-align-center flex-pack-justify">
        <section class="paper-add flex flex-align-center">
          <i></i><span>参与</span>
        </section>
        <section class="paper-look flex flex-align-center">
          <span>查看话题全部内容</span><i></i>
        </section>
      </section>
      <section class="split-line"></section>
    </section>
    <section class="content flex flex-align-center flex-pack-justify">
      <section class="content-info flex flex-align-center">
        <img v-lazy="$com.makeFileUrl($store.state.res.user.avatar)" alt="avatar">
        <span>希腊队</span>
      </section>
      <section class="content-time">
        一小时前
      </section>
    </section>
  </section>
</template>
<script>
</script>
<style scoped lang="less">
@m3: 3vw;
@m32: 3.2vw;
@br: 5px;
@newBase: 2vw;
.paper {
  padding: 0 @m32;
  .feeder-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: @m32;
  }
  .call_papers_1_4 {
    display: inline-block;
    padding: 2px 7px;
    background: #e9e9e9;
    font-size: 12px;
    position: relative;
    top: -3px;
    border-radius: @br;
  }
  .paper-add {
    font-size: 14px;
    padding: @m32 / 2 @m32;
    border: 1px solid #dedede;
    border-radius: @br;
    i {
      width: @m3;
      height: @m3;
      background: url("../assets/images/Write_Message@2x.png") no-repeat;
      background-size: cover;
      margin-right: 1vw;
    }
  }
  .paper-look {
    font-size: 14px;
    i {
      width: 1.6vw;
      height: 2.93vw;
      background: url("../assets/images/right-arrow@2x.png") no-repeat;
      background-size: cover;
      margin-left: 1vw;
    }
  }
  .split-line {
    border: 1px solid #f5f5f5;
    margin-top: 4.26vw;
  }
  .content {
    padding: @m32 0 @m32 / 2;
    font-size: 14px;
    .content-info {
      img {
        width: @newBase * 4;
        height: @newBase * 4;
        border-radius: 100%;
        margin-right: @newBase;
      }
    }
    .content-time {
      color: #94928e;
    }
  }
}
</style>

