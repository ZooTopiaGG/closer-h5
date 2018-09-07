<template>
  <section>
    <!-- 未播放时, 播放结束时 -->
    <section class="video-poster" @click="playVideo">
      <span class="shipin"></span>
    </section>
    <!-- 正在播放时 -->
    <section class="video-playing" @click="pauseVideo">
    </section>
    <!-- 播放暂停 -->
    <section class="video-pause" @click="playPauseVideo">
      <span class="shipin"></span>
    </section>
    <!-- 时间 -->
    <section class="v2-controls flex flex-v flex-pack-justify" 
        @touchmove="touchmove">
      <section class="v2-top-controls flex flex-align-center flex-pack-justify">
        <section class="v2-duration flex flex-align-center flex-pack-center" v-if="duration > 0">
          <span>{{ $com.toCurrent(currentTime * 1000) }}/{{ $com.toCurrent(duration) }}</span>
        </section>
        <section class="v2-launchFullScreen flex flex-align-center" @click="handlerFullScreen">
          <img src="~/assets/images/Group@2x.png" alt="icon">
        </section>
      </section>
      <section class="v2-process">
        <section class="v2-line"></section>
        <section class="v2-process-line flex">
          <section class="v2-ball-line" :style="{
            width: v2_width+'%'
          }"></section>
          <span class="v2-ball"></span>
        </section>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  props: {
    elem: {
      type: String,
      default: "feed-h5-videos-vertical"
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      video: {},
      poster: {},
      playing: {},
      pause: {},
      currentTime: 0,
      v2_width: 0.0001,
      moveX: 0,
      screenW: 0 // 屏幕宽度
      // endW: 0,
      // endCt: 0
    };
  },
  methods: {
    // 视频播放
    playVideo() {
      let self = this;
      // 隐藏poster 封面
      self.poster.style.display = "none";
      // 显示正在播放的cover
      self.playing.style.display = "block";
      // 隐藏暂停时的cover
      self.pause.style.display = "none";
      self.video.play();
      self.video.onended = function() {
        self.playEnd();
      };
      self.video.ontimeupdate = function() {
        self.playTimeUpdate();
      };
    },
    playTimeUpdate() {
      let self = this;
      self.currentTime = Math.round(self.video.currentTime);
      self.v2_width = 100 * self.currentTime * 1000 / self.duration;
      self.v2_width = self.v2_width > 97 ? 97 : self.v2_width;
      // 存储当前时间
      self.$store.commit("GET_CURRENT_TIME", self.currentTime);
    },
    playEnd() {
      let self = this;
      // 隐藏poster 封面
      self.poster.style.display = "block";
      // 隐藏正在播放的cover
      self.playing.style.display = "none";
      // 隐藏暂停时的cover
      self.pause.style.display = "none";
    },
    // 正在播放， 点击暂停
    pauseVideo() {
      let self = this;
      self.video.pause();
      // 隐藏poster 封面
      self.poster.style.display = "none";
      // 隐藏正在播放的cover
      self.playing.style.display = "none";
      // 显示暂停时的cover
      self.pause.style.display = "block";
    },
    // 已暂停播放， 点击重新播放
    playPauseVideo() {
      let self = this;
      let video = document.getElementById(self.elem);
      self.video.play();
      // 隐藏poster 封面
      self.poster.style.display = "none";
      // 显示正在播放的cover
      self.playing.style.display = "block";
      // 隐藏暂停时的cover
      self.pause.style.display = "none";
    },
    launchFullScreen(element) {
      var element = element || document.documentElement;
      // android，请求全屏
      if (typeof element.webkitRequestFullScreen === "function") {
        element.webkitRequestFullScreen();
      }
      //ios，请求全屏
      if (typeof element.webkitEnterFullscreen === "function") {
        element.webkitEnterFullscreen();
      }
    },
    // 绑定全屏事件
    handlerFullScreen() {
      let self = this;
      self.launchFullScreen(self.video);
    },
    // 绑定拖拽进度条事件
    // touchstart(ev) {
    //   ev = ev || event;
    // },
    touchmove(ev) {
      let self = this;
      ev = ev || event;
      self.moveX = ev.touches[0].clientX;
      self.v2_width = self.moveX * 97 / self.screenW;
      self.currentTime = self.v2_width * self.duration / 100000;
      self.video.currentTime = self.currentTime;
    }
  },
  mounted() {
    let self = this;
    // 获取屏幕宽度
    self.screenW = document.documentElement.clientWidth;
    // 存储总时长
    self.$store.commit("GET_VIDEO_DURATION", self.duration);
    self.video = document.getElementById(self.elem);
    self.poster = document.querySelector(".video-poster");
    self.playing = document.querySelector(".video-playing");
    self.pause = document.querySelector(".video-pause");
    self.$nextTick(() => {
      if (
        self.$store.state.res.int_type === 1 &&
        self.$store.state.is_closer_app
      ) {
        self.video.addEventListener("x5videoexitfullscreen", function() {
          // 隐藏poster 封面
          self.poster.style.display = "none";
          // 隐藏正在播放的cover
          self.playing.style.display = "none";
          // 显示暂停时的cover
          self.pause.style.display = "block";
        });
        // android 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
        self.video.addEventListener("webkitfullscreenchange", function(event) {
          if (document.webkitIsFullScreen) {
            self.playVideo();
          } else {
            self.pauseVideo();
          }
        });
        // ios 监听屏幕全屏事件，进入全屏播放视频，退出全屏时自动暂停播放
        self.video.addEventListener("webkitbeginfullscreen", function() {
          self.playVideo();
        });
        self.video.addEventListener("webkitendfullscreen", function() {
          self.pauseVideo();
        });
      }
    });
  }
};
</script>


