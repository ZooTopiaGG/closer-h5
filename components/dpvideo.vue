<template>
  <section>
    <!-- 未播放时, 播放结束时 -->
      <section class="video-poster" @click="playVideo" v-lazy:background-image="$store.state.content.videos[0].imageUrl">
        <span class="shipin"></span>
      </section>
      <!-- 正在播放时 -->
      <section class="video-playing" @click="pauseVideo">
      </section>
      <!-- 播放暂停 -->
      <section class="video-pause" @click="playPauseVideo">
        <span class="shipin"></span>
      </section>
  </section>
</template>
<script>
export default {
  props: {
    elem: {
      type: String,
      default: "feed-h5-videos-vertical"
    }
  },
  data() {
    return {
      video: {},
      poster: {},
      playing: {},
      pause: {}
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
      let video = document.getElementById(self.elem);
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
    }
  },
  mounted() {
    let self = this;
    self.video = document.getElementById(self.elem);
    self.poster = document.querySelector(".video-poster");
    self.playing = document.querySelector(".video-playing");
    self.pause = document.querySelector(".video-pause");
    self.$nextTick(() => {
      if (self.$store.state.res.int_type === 1) {
        self.video.addEventListener("x5videoexitfullscreen", function() {
          // 隐藏poster 封面
          self.poster.style.display = "none";
          // 隐藏正在播放的cover
          self.playing.style.display = "none";
          // 显示暂停时的cover
          self.pause.style.display = "block";
        });
      }
    });
  }
};
</script>
<style>
.video-poster {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  background-size: cover;
  background-position: 50% 50%;
}
.video-playing,
.video-pause {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: none;
  background: rgba(0, 0, 0, 0);
  z-index: 9;
}
.shipin {
  position: absolute;
  left: 50%;
  top: 50%;
  background: url("data:image/png;base64,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");
  background-size: cover;
  width: 16vw;
  height: 16vw;
  max-width: 80px;
  max-height: 80px;
  transform: translate(-50%, -50%);
}
</style>

