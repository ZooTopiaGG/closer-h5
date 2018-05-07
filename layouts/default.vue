<template>
  <div>
    <div v-if="$store.state.exist">
      <nav v-if="$store.state.GET_MESSAGE_STATE" 
        :class="{ appnav: $store.state.res.int_type === 2,
          scrollnav: scrollnav,
          flex: true,
          'flex-v': true,
          'flex-pack-center': true
        }">
        <div class="feeder-cover flex flex-align-center flex-pack-justify">
            <div class="flex flex-align-center">
              <img v-if="!$store.state.res.blogo" class="access-not" src="http://file-sandbox.tiejin.cn/public/93hJ39k8JZ/1524902685000.jpg">
              <img v-else class="access-not" :src="$store.state.res.blogo">
              <span class="communityName">{{ $store.state.res.communityName }}</span>
            </div>
            <div class="flex flex-align-center">
              <Button type="primary" icon="plus">关注</Button>
              <Icon type="ios-more" class="icon-ios-more"></Icon>
            </div>
        </div>
      </nav>
      <div id="wrapper" :class="{ 'web-class': $store.state.GET_MESSAGE_STATE, nuxts:true, appnuxts: !$store.state.GET_MESSAGE_STATE }">
        <nuxt/>
      </div>
      <div v-if="$store.state.GET_MESSAGE_STATE" class="footer">
        <Button type="primary" shape="circle" size="large">App内打开</Button>
      </div>
    </div>
    <div class="not-exist" v-else>
      <span>贴子已经被删除</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        col: '#333',
        scrollnav: false,
        exist: true
      }
    },
    methods: {
      handleScroll (e) {
        if (this.$route.path.indexOf('feed/') > -1 && this.$store.state.res.int_type === 2) {
          if(e.target.scrollTop>= 80){
            this.scrollnav = true
          } else {
            this.scrollnav = false
          }
        } else {
          console.log('不是长图文类型')
        }
      }
    },
    mounted() {
      this.$nextTick ( () => {
        let wrp = document.getElementById('wrapper')
        if (wrp) {
          wrp.addEventListener('scroll', this.handleScroll)
        }
      })
      // console.log('this.$store===', this.$store.state)
    }
  }
</script>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
nav {
  width: 100%;
  height: 0.98rem;
  position: fixed;
  top:0;
  left:0;
  background: #fff;
  z-index: 999;
}
nav .icon-ios-more {
  color: #495060;
}
nav .communityName {
  color: #495060;
  font-size: 16px;
}
.nuxts{
  margin-top: 0.98rem;
  /*height: calc(100vh-0.98rem);*/
}
/*app内*/
nav.appnav {
  background: rgba(0,0,0,0);
}
nav.appnav .icon-ios-more {
  color: #fff;
}
nav.appnav .communityName {
  color: #fff;
}
nav.scrollnav{
  background: #fff;
  /*padding-top: 0;*/
}
nav.scrollnav .icon-ios-more {
  color: #495060;
}
nav.scrollnav .communityName {
  color: #495060;
}
nav.appnav~.nuxts{
  margin-top: 0;
  height: 100vh;
}
.appnuxts{
  margin-top: 0;
  /*height: 100vh;*/
}
.access-not {
  width: 1.64rem;
  height: .64rem;
  margin-right: .2rem;
  border-radius: 0 3px 3px 0;
}
.icon-ios-more {
  font-size: 28px;
  margin-left: .4rem;
  margin-right: .2rem;
}
.not-exist {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>
