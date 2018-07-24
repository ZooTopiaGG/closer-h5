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
      <!-- 时间 -->
      <section class="duration flex flex-align-center flex-pack-center" v-if="duration > 0">
        <span>{{ $com.toCurrent(currentTime * 1000) }}/{{ $com.toCurrent(duration) }}</span>
      </section>
      <section class="launchFullScreen flex flex-align-center flex-pack-center" @click="handlerFullScreen">
        <img src="~/assets/images/Group@2x.png" alt="icon">
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
      currentTime: 0
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
    },
    launchFullScreen(element) {
      console.log(element);
      return;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    },
    // 绑定全屏事件
    handlerFullScreen() {
      let self = this;
      console.log(11111);
      self.launchFullScreen(self.video);
    }
  },
  mounted() {
    let self = this;
    console.log(self.duration);
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
<style scoped lang="less">
@m20: 2.67vw;
.duration {
  position: absolute;
  left: @m20;
  bottom: @m20;
  z-index: 99;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 25px;
  height: 6.667vw;
  width: 21.33vw;
  box-sizing: border-box;
  font-size: 12px;
}

.isLongVideo .duration {
  bottom: 16.67vw + @m20;
}
.launchFullScreen {
  position: absolute;
  right: @m20;
  bottom: @m20;
  z-index: 99;
  img {
    width: 6.933vw;
    height: 6.933vw;
  }
}
.isLongVideo .launchFullScreen {
  bottom: 16.67vw + @m20;
}
</style>

