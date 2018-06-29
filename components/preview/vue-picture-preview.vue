<template>
    <transition name="fade">
        <div class="lg-preview-wrapper" 
        v-show="preview.show" 
        @click="leave" 
        @touchmove="touchmove"
        @touchstart="touchstart"
        @touchend="touchend"
        >
            <div class="lg-preview-loading" v-show="preview.loading"><div></div></div>
            <img
                class="lg-preview-img"
                v-if="preview.current.src"
                :src="preview.current.src"
                v-show="!preview.loading"
            >
            <div class="lg-preview-title">
                {{preview.list.indexOf(preview.current) + 1}} / {{preview.list.length}}
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
  data() {
    return {
      startX: 0, //开始触摸X的位置
      startY: 0, //开始触摸Y的位置
      moveX: 0, //滑动时x的位置
      moveY: 0, // 滑动时Yde位置
      endX: 0, //结束触摸的位置
      disX: 0, //偏移x距离
      disY: 0, // 偏移y
      slideEffect: "" //滑动时的效果,使用v-bind:style="deleteSlider"
    };
  },
  methods: {
    touchstart(ev) {
      this.disX = 0;
      this.disY = 0;
      ev = ev || event;
      this.startX = ev.touches[0].clientX;
      this.startY = ev.touches[0].clientY;
    },
    touchmove(ev) {
      ev = ev || event;
      //滑动时距离浏览器左侧的距离
      this.moveX = ev.touches[0].clientX;
      this.moveY = ev.touches[0].clientY;
      //实时的滑动的距离-起始位置=实时移动的位置
      // x轴距离
      this.disX = this.moveX - this.startX;
      // y轴距离
      this.disY = this.moveY - this.startY;
    },
    touchend() {
      // 横向偏移量 x
      let offsetX = Math.abs(this.disX),
        offsetY = Math.abs(this.disY);
      if (offsetX > offsetY) {
        // X>Y 横向切换
        if (this.disX < 0) {
          this.nextAction();
        } else if (this.disX > 0) {
          this.preAction();
        } else {
          return;
        }
      } else {
        // Y>=X 纵向滚动
      }
    },
    leave(e) {
      if (
        this.preview.show &&
        e.target.className.indexOf("lg-preview-nav-arrow") != 0
      ) {
        this.close();
      }
    },
    close() {
      this.preview.show = false;
    },
    preAction() {
      this.preview.loading = true;
      var index = this.preview.list.indexOf(this.preview.current);
      if (index === 0) {
        this.preview.loading = false;
        return;
      }
      index--;
      this.preview.current = this.preview.list[index];
      const img = new window.Image();
      img.src = this.preview.current.src;
      LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false;
      // img.onload = function () {
      //     setTimeout(function () {
      //         LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false
      //     },300)
      // }
    },
    nextAction() {
      this.preview.loading = true;
      var index = this.preview.list.indexOf(this.preview.current);
      if (index === this.preview.list.length - 1) {
        this.preview.loading = false;
        return;
      }
      index++;
      this.preview.current = this.preview.list[index];
      const img = new window.Image();
      img.src = this.preview.current.src;
      LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false;
      // img.onload = function () {
      //     setTimeout(function () {
      //         LOGIC_EVENT_BUS.LOGIC_PREVIEW.loading = false
      //     },300)
      // }
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
  background: rgba(0, 0, 0, 1);
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

/* .lg-preview-nav-left,
.lg-preview-nav-right {
  position: absolute;
  height: 100%;
  margin: 0 5px;
  width: 200px;
  top: 0;
  color: #fff;
  transition: opacity 0.2s;
}

.lg-preview-nav-left {
  left: 0;
}

.lg-preview-nav-left .lg-preview-nav-arrow {
  left: 0;
  margin-left: 40px;
  transform: rotate(-45deg);
}

.lg-preview-nav-right {
  right: 0;
}

.lg-preview-nav-right .lg-preview-nav-arrow {
  right: 0;
  margin-right: 40px;
  transform: rotate(135deg);
} */

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

/* @media all and (max-width: 768px) {
  .lg-preview-nav-left,
  .lg-preview-nav-right {
    width: 100px;
  }

  .lg-preview-nav-left .lg-preview-nav-arrow {
    margin-left: 20px;
  }

  .lg-preview-nav-right .lg-preview-nav-arrow {
    margin-right: 20px;
  }
} */
</style>
