<template>
    <transition name="fade">
        <div class="lg-preview-wrapper"
        @click="leave"
        @touchmove.prevent="touchmove"
        @touchstart="touchstart"
        @touchend="touchend"
        >
            <!-- <div class="lg-preview-loading" v-show="preview.loading"><div></div></div> -->
            <img
                class="lg-preview-img"
                v-if="previewList[index].current.src"
                :src="previewList[index].current.src"
            >
            <div class="lg-preview-title">
                {{parseInt(previewList[index].index) + 1}} / {{previewList.length}}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: "Preview",
  computed: {
    preview() {
      return typeof window !== "undefined"
        ? window.LOGIC_EVENT_BUS.LOGIC_PREVIEW
        : global.LOGIC_EVENT_BUS.LOGIC_PREVIEW;
    }
  },
  props: ["previewList", "previewIndex"],
  data() {
    return {
      imglist: [],
      index: this.previewIndex, // 记录当前图片index
      startX: 0, //开始触摸的位置
      moveX: 0, //滑动时的位置
      endX: 0, //结束触摸的位置
      disX: 0, //移动距离
      slideEffect: "" //滑动时的效果,使用v-bind:style="deleteSlider"
    };
  },
  methods: {
    touchmove(ev) {
      ev = ev || event;
      //滑动时距离浏览器左侧的距离
      this.moveX = ev.touches[0].clientX;
      //实时的滑动的距离-起始位置=实时移动的位置
      this.disX = this.moveX - this.startX;
    },
    touchstart(ev) {
      this.disX = 0;
      ev = ev || event;
      this.startX = ev.touches[0].clientX;
    },
    touchend() {
      if (this.disX < 0) {
        this.nextAction();
      } else if (this.disX > 0) {
        this.preAction();
      } else {
        return;
      }
    },
    leave(e) {
      // 向父组件传递状态
      this.$emit("preview-show", false);
    },
    preAction() {
      if (this.index === 0) {
        return;
      }
      this.index--;
    },
    nextAction() {
      if (this.index === this.previewList.length - 1) {
        return;
      }
      this.index++;
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.lg-preview-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
}

.lg-preview-loading {
  position: absolute;
  width: 30px;
  height: 35px;
  top: 50%;
  left: 50%;
  margin-top: -17.5px;
  margin-left: -15px;
}

.lg-preview-loading > div {
  display: inline-block;
  height: 25px;
  width: 25px;
  background: transparent;
  border-radius: 100%;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: rotate 0.75s 0s linear infinite;
  animation: rotate 0.75s 0s linear infinite;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
  }

  50% {
    -webkit-transform: rotate(180deg) scale(0.6);
    transform: rotate(180deg) scale(0.6);
  }

  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}

.lg-preview-img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.lg-preview-nav-arrow {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  background: rgba(0, 0, 0, 0);
  line-height: 40px;
  width: 20px;
  height: 20px;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
}

.lg-preview-title {
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: center;
  width: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
}
</style>
