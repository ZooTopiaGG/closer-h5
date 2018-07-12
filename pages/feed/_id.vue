<template>
  <div id="feed" :class="{ 
    videofeed: $store.state.res.int_type === 1,
    feed2: !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
    }">
    <div :class="{ 
      box: true,
      'feed-box': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
      'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
      'feed-box-0': $store.state.res.int_type === 0,
      'feed-box-1': $store.state.res.int_type === 1
     }">
      <div :class="{
        'feed-1': true,
        'feed-padding': $store.state.res.commentNumber == 0
      }">
        <!-- 帖子内容 -->
        <!-- 图片 -->
        <div class="feed-doc" id="imgListFeed" v-if="$store.state.res.int_type === 0">
          <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          <!--  判断是否在app de预览 -->
          <!-- 图片排列  需判断GIF -->
          <div v-if="$store.state.GET_MESSAGE_STATE">
            <div class="feeder-img flex flex-pack-justify" v-if="$store.state.content.images && $store.state.content.images.length == 1">
              <div class="feeder-img-list feeder-img-list-cell-1" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)" :key="index">
                <!-- <img class="feed-cover-list" v-lazy="$com.makeFileUrl(img.link)" v-preview="$com.makeFileUrl(img.link)"> -->
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <div class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">                
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <div class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
              <div class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="cover_img_type" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
                <span class="cover_img_type" v-else-if="img.width / img.height >= 3 ">全景</span>
                <span class="cover_img_type" v-else-if="img.height / img.width >= 3">长图</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 视频 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 1">
          <div class="video-doc">
            <div class="videoNav flex flex-align-center">
              <img class="access-not" v-lazy="$store.state.res.blogo" @click="toCommunity">
              <span class="communityName ellipsis flex-1">{{ $store.state.res.communityName }}</span>
              <div>
                <!-- 关注补丁 -->
                <mt-button :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn cursor" @click="tjFocus">
                  <span v-if="$store.state.is_follow">已关注</span>
                  <span v-else>
                    <!-- <span class="focus-icon">+</span> -->
                    <span>关注</span>
                  </span>
                </mt-button>
              </div>
            </div>
            <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          </div>
        </div>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <div class="feed-doc" v-else-if="$store.state.res.int_type === 2">
          <div class="feeder-img feeder-img-bgcover" v-if="$store.state.res.bigcover">
            <!-- 大封面 -->
            <img class="feed-cover feed-cover-bgcover" :src="defaultImg" data-index= "0"  :data-src="$com.makeFileUrl($store.state.res.bigcover)" 
            >
            <div class="hide-over"></div>
          </div>
          <div class="feeder-img feeder-img-cover" v-else>
            <!-- 小封面 -->
            <img class="feed-cover feed-cover-cover" :src="defaultImg" data-index= "0" :data-src="$com.makeFileUrl($store.state.res.cover)">
            <div class="hide-over"></div>
          </div>
          <div class="feeder-content" id="tjimg" >
            <!-- 标题 -->
            <div class="feeder-title feeder-title-2 feeder-title-3"> {{ $store.state.res.title }} </div>
            <!-- 阅读量 -->
            <div class="feed-messagebord-type flex flex-align-center flex-pack-justify" v-if="$store.state.res.int_category === 1">
              <span> {{ $com.createTime($store.state.res.long_time_line, 'yy.mm.dd') }}前截止</span>
              <span>
                <span class="feed-publication-number">投稿 {{$store.state.res.collectionTotalCount}}</span>
                <span>赞 {{ $store.state.res.like }}</span>
              </span>
            </div>
            <div class="read-num" v-else>阅读 <span class="incrviewnum">{{ $store.state.incr_view }}</span></div>
            <div v-if="$store.state.res.int_category != 1" class="summary tj-sum" v-html="$store.state.content.html" @click="openClick($event)">
            </div>
            <div v-else>
              <div class="summary" v-html="$store.state.content.html" @click="openClick($event)">
              </div>
              <div class="feeder-info flex flex-pack-justify flex-align-center">
                <span>
                  <span>阅读 <span class="incrviewnum">{{ $store.state.incr_view }}</span></span>
                </span>
                <span>
                  <span style="margin-right: 10px;">
                    <span v-if="$store.state.res.isOffical">官方出品</span>
                    <span v-else>{{ $store.state.res.communityName }} @{{ $store.state.res.username }}</span>
                  </span>
                  <span>{{ $com.getCommonTime($store.state.res.long_publish_time, 'yy.mm.dd') }}</span>
                </span>
              </div>
            </div>
            <!-- 神议论列表 -->
            <div v-if="$store.state.res.int_category === 3">
              <ul class="feeder-comments">
                <li class="feeder-comments-cell flex flex-align-start" v-for="(item, index) in $store.state.discuss" :key="index">
                  <div class="feeder-comment-info flex flex-align-center flex-pack-end">
                    <i v-lazy:background-image="$com.makeFileUrl(item.avatar)"></i>
                  </div>
                  <div class="flex-1">
                    <div class="feeder-comment-nickname flex flex-pack-justify">
                      <span>{{ item.nickname }}</span>
                      <!-- <span>{{ $com.getCommonTime(item.createTime, 'yy/mm/dd') }}</span> -->
                      <span>{{ item.message_time }}</span>
                    </div>
                    <!-- 纯文本 link text-->
                    <div v-if="item.type === 0" class="feeder-comment">
                      <span v-if="item.weblink" v-html="item.newText"></span>
                      <span v-else>{{ item.text }}</span>
                    </div>
                    <!-- 包含图片 -->
                    <div v-else-if="item.type === 1" class="feeder-comment">
                      <div v-if="$store.state.GET_MESSAGE_STATE" style="position:relative;">
                        <img class="feeder-comment-img" data-index="99" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :data-src="$com.makeFileUrl(item.image.link)" :src="defaultImg"
                        >
                        <!-- <span class="cover_img_type" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span> -->
                      </div>
                      <img v-else class="feeder-comment-img" :style="{
                        height: item.image.height * 73 / item.image.width + 'vw'
                      }" :data-src="$com.makeFileUrl(item.image.link)" :src="defaultImg">
                    </div>
                    <!-- 包含贴子 -->
                    <div v-else-if="item.type === 3" @click="tofeed(item.feed.feedId)" class="feeder-comment flex flex-align-center feeder-comment-3">
                      <div class="feeder-comment-3-cover flex">
                        <i v-if="item.feed.imageUrl" v-lazy:background-image="$com.makeFileUrl(item.feed.imageUrl)"></i>
                      </div>
                      <div>
                        <div class="feeder-comment-3-title">{{ item.feed.title }}</div>
                        <div class="feeder-comment-3-summary">{{ item.feed.summary }}</div>
                      </div>
                    </div>
                    <!-- 包含视频 -->
                    <div v-else-if="item.type === 2">
                      <div v-if="$store.state.GET_MESSAGE_STATE">
                        <div class="imgbox feed-imgbox">
                          <video :src="item.video.src" controls="controls" preload="none" 
                            :poster="item.video.imageUrl" :data-cover="item.video.imageUrl">
                          </video>
                        </div>
                      </div>
                      <div v-else class="imgbox feed-imgbox-else feed-video-bg" 
                      @click="showVid2(item.video.vid)" 
                      :data-vid="item.video.vid" :data-bg="item.video.imageUrl" :style="{
                          backgroundImage: 'url('+defaultImg+')',
                          }">
                        <div class="flex flex-align-center flex-pack-center feed-imgbox-else-child" :data-vid="item.video.vid">
                          <span class="icon-shipin-2" :data-vid="item.video.vid"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-if="$store.state.content.end_html" class="god-discuss-end-tag summary" v-html="$store.state.content.end_html" @click="openClick($event)"></div>
            </div>
          </div>
        </div>
        <!-- 发帖者信息 -->
        <div v-if="$store.state.res.int_category != 1" class="feeder-info flex flex-pack-justify flex-align-center">
          <span class="flex-1 ellipsis" v-if="$store.state.res.int_category === 3">
            <span>
              <span>{{ $store.state.res.className }} @{{ $store.state.res.user.fullname }}</span>
            </span>
          </span>
          <span class="flex-1 ellipsis" v-else>
            <span>
              <span v-if="$store.state.res.isOffical">官方出品</span>
              <span v-else>{{ $store.state.res.communityName }} @{{ $store.state.res.user.fullname }}</span>
            </span>
          </span>
          <span style="margin-left: 10px">{{ $com.getCommonTime($store.state.res.long_publish_time, 'yy.mm.dd hh:MM') }}</span>
        </div>
      </div>
      <!-- 分割线 -->
      <div v-if="$store.state.GET_MESSAGE_STATE && $store.state.res.commentNumber > 0" class="split-box"></div>
      <!-- 留言板 -->
      <div 
        :class="{
        'feed-2': true,
        'flex-1': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)}" v-if="$store.state.GET_MESSAGE_STATE && $store.state.res.commentNumber > 0">
        <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
        <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
        <div :class="{
          'message-box':!($store.state.res.int_type === 2 && $store.state.res.int_category === 1),
          'flex': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1), 
          'flex-v': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)}" v-if="$store.state.res.int_category != 1 ">
          <div class="message-num">
            {{ $store.state.res.commentNumber }} 条留言
          </div>
          <div :class="{
            'flex-1': !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)
            }">
            <ul class="feed-messagebord-list" v-if="$store.state.messagelist.data && $store.state.messagelist.data.length > 0">
              <li class="feed-messagebord-list-cell" v-for="(item, index) in $store.state.messagelist.data" :key="index">
                <div class="messager-info flex flex-align-center flex-pack-justify">
                  <div class="messager-info-div flex flex-align-center" v-if="item.user">
                    <img v-lazy="$com.makeFileUrl(item.user.avatar)">
                    <div class="flex flex-v">
                      <span class="messager-name" v-if="item.user.attributes && item.user.attributes.roster">{{ item.user.attributes.roster.name }}</span>
                      <span class="messager-name" v-else>{{ item.user.fullname }}</span>
                      <span class="messager-time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                    </div>
                  </div>
                  <div class="icon-group flex flex-align-center">
                    <!-- 留言补丁 -->
                    <!-- <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="toMessage(item)"> -->
                    <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="downApp">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAADfElEQVRYR+1XXWgcVRT+zp3dTUikwUalIkIeqg+FvjQgIqVds7O7vbO7goXFB/+ebLEUKkJ9kJaCWpAiVBARf0Awvsg+VJmduZnZbRhFqQ9GxD+wULSU1iI1UMmPTXbukYnZdkh2TffnSTJPwz3nfN8337lz5g7h1kVFK3uIgcNgbAeQiMX6datBuAjGh1f/mH19ZmZmeS0wNRcsmX2TgCP9Yr4NnDOOqu1vKUjKzA4B8QOABpN4enh4y6eVSmXpNkA7Skmn04mhodSjxPwJgDvBvM+ZqntxkBWHitI8zKC3GPyRq+rPdsTSRXJBZl8BcBygNxzlH10nqCCzLwM4CdBJR/nHuuDoqKQgcwcAfhfg9xxVP7gpaK19mw5ttKF6cigaCQaJg2A4VVXz42RFaT4HwgO00DhlB8G1mzPNSm+DTh41hPjOdr3JvrasILPfABhnxt9GcnDUtu2FiEBK82EBOvcvGb3jKP9Qk7hgZSfBeAoACy122p73U1xUTw4VpWkzqAjg8vzi8lgQBI0I/LF8fnsodESUIqLjVdd/rUla3GeeYqJoviyQET5YrU5f7pugXC43nBQ632DjnOd5v8eBV9rJYqw6VVORG81YuVw2FueuW5rCX1z37Pm+tmyjDdpNvKeWdUO4Uc2moP+jQ+YLAJ0G6H1H+Qc2esJe45ZlHiOmV0F82nHrL6772pfy+V1a6BkA80xkua7/Ra+k7eoty9xJTNGh7F5i7K9O1c6sExQtFGTuY4CfXA3OArjRAnRZg59Qqv51O8JSKX2XDlMOmO9vkROd0+9eme3A51VVmwCgWwoaHx9Pbrtn9ATAzwPY+h8OzULQXsfxf1ybY5rmyGBSTDN4V9t6xhyIJucXl14KgmBubd7NQ34sIKSUo0RkxJPDMKSE0G8DeByMK0LTbtv3f23mrEz0BPtgPALgPJMuAQN/xTEGGg2dGBn5s1KphO0EtxLU9uGklAMCDQdABuALTI3drhtcja8z8FsjpD2+71/qZh92JCgiSKfTdwwPpc6C+SECfb8UIpsw+AMCSgCuaIR7lJq+0I2Y1b3VeWkmkxkdTInoTdwBIGrLFoCvJZDc+5lSP3eOeKuiY4eapcXixH06NL4kYIwZ142kmLBt79texHTtUJN09UzkaeAZpWpf9SqmZ0ERQLlcTvXzL7frlvXDjVYY/wDEM9MuxdT8/QAAAABJRU5ErkJggg==" alt="">
                    </p>
                    <!-- 点赞补丁 -->
                    <p class="supports cursor" @click="toSupport(item, index)">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAgCAYAAABgrToAAAADz0lEQVRYR82YXWgcVRTH/2c2tXWtWBS0aovFl9So1MY3P17andm9d7apL7FaScEv1BeFiB8UkYKIWKmgL340KJhICvtQsDtzNzvb6kORIsTWQrU+VDS0IVYCFkzBZHf+MmiW3e1m2SRrJ+f53HN+c849554zgg5KVjk7yDADsVYBODF1cXp4fHx8bjkuZDmH58/29/cnZv669KWAu+rsCX6wZtl3pFSaWKqfjgBqbQ8KcQDgn4C8LyKXSD4HoAeC75LXrXsgl8tVlgLZGUBlTwiwEcROrxB8FYH09T14fWUueRrAJoTMemMlLxZA103dhVB+BDDpmWADAM6DuMp+G8BeAG95JngzFsCstp8n8RGIUa8Q7K6F0Gn7GbFwkMSQXwiejQXQVXaUOi3Cp/J+6fNaiKxydhE8BOCQZ4LHrzrgTsfZWE7wFwCVa9aEtx8+fHS6FsLNOE9DOCTEUD6OCGplfybAkyIYzvvBnsYIZbV9gMQgwDc8U4ru46JlyVX8X3QOAvg7RNc9xphzjd5dbf8EYnMI2W5M8dii6QBcAai1YwvCR4Ry7UIGKXIryHR0XgQv5P3g40ZdpWzHAsaiqhZiBIJyM3sEy4LE8bwZG67tAPO6dYCusl8G8F4z8CbGL1Mw6PvBJ80ca53OCMOogKy2IicY9fz6LhCdqwKmUqkbVq+S3wF0ici+EDxf8xUKxKMAfApyEqIcSteYMeaPVs5d17mfFd7bCtEi15KyD4KbLPLhI4XS8VqbVcBsNr2FlfCUQE7nTXFLXbvQzisk9xPY75vgtbYisgglV9mjAB4DMeAVgpGmgEqltlqQ7wU4mTdB71UG/BXAHSHYa0zp5IoCzGQy3QmpnCVx0S8E6xsLpZriuCKotfOikB9AMOL5wUDjzYgd0NV2HoRLwR7fD6JWUyexAiqlVlsoT5NMwirf5vvfTK0wQGebBR4FcMozwdZmhR9rBLWy3xXg1VbtK1ZAV9lRS7mv1VsdG6DWej3C2UkRuZxcu+7GXC43u6JSrLU9IMQXEHieH2QXenhii6CrUiOAPEHKS36h+OFKAxSt7CkBbq6wvLlQ+PrnFQW4I72tN7QS4wB/80xpU6u5oprivkymuyKVswAuJCcm78ydOVO9tNkOTzNZ7bxD8nVAPvVMMVrwF5TagdVylR0t2ncDOA9BNBv+K8QtADYAnILIhUVMUleqEmtI9kSjOCx5yPOK37YLCKW29wisnES/LP5fmSFlb6vimHffbGmyXDfVbZUTC+4ky2Gfk3I5DBPnisXiTDt2lrzVtWO8Ezr/AEKTND+nargIAAAAAElFTkSuQmCC" v-if="!item.isLike">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAeCAYAAABAFGxuAAACcUlEQVRYR83XT2jTUBgA8O97SxFkgn/YpiAq6smbdhcZA9Ema5JueBJkFw968qDibl5a8Doc4lHB0y5FmGtfXpsErCJFQfGmgh6EghdlijKRtX2fNJujq01WFtfkXd973/fjS/K+F4SYDvwfLsNQR5Fw2ovFIM+5XQ0bNzRsUtfOS6BHHml1SAC6yYU7FwYXCpZMJhP7R/bWgGCkA9EYSMDhxUXn81ZxoWCmeW4cJHvWNTnhZV6yH0QD01O3APB2t+REmLNKdjYimPocAMZ8ks9y4cz0HWaaqaMg8UPbS7/BgIi5ohVBxTJp9R4hXPWrCCJNFy13vq8VmzLU0YakKiImfBJLpYlHHtt2rW+wKT11sgnIAeBAQNIyF056q6jWvvXjYnLi7CnJ2CUEHPwbkCTN87LrGoZ6kRGoALhHkjQDKuVtJYBPDOBJIAzhZ5PooRDum27rPJimacOJAfkRAHe1LyLCa1bJvmvq2h0Auh6mAj57fzClfqxQqHztnPdghjGRRpKic7IPsFb/OiOE89QHpmWQqBABrJHYUR9aWKh8jxeMoMpLTtcDeu1RRlMxIspaJTfn+/IbRjQwCXRaCPdF3GDfdg7uHsrn8814wRDy3HIu+La01eOi/4+SEK5YlnM/djCliYeCemlUX+U7LpwTQZ0kIhjOcWHfiB1MAhpC2P+0wHZoFBX7zZSlfYXC61/xqhiSyy1X3eym4lVM19UxBtD6sdgwtul2McOFM9sTLJsF9uqlWiQAfZvvY28bko2Xy+WlnmBrizCTUY9jna1fFhuM1YQQX3RdP6hIObxZsKB5qdDK8vLK+0ql0uglzh+lOIUuSynHSQAAAABJRU5ErkJggg==" v-else>
                    </p>
                  </div>
                </div>
                <div class="messager-content">{{ item.content }}</div>
                <div v-if="item.replyNumber > 0">
                  <ul class="messager-comments">
                    <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" v-if=" commentIndex <= 3" :key="commentIndex">
                      <span>{{ commentItem.user.fullname }}：</span>
                      <span class="messager-comment">{{ commentItem.content }}</span>
                    </li>
                    <!-- 更多回复补丁 -->
                    <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="downApp">
                    <!-- <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="morereply(item)"> -->
                      <span>共{{ item.replyNumber }}条回复</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="$store.state.GET_MESSAGE_STATE && !($store.state.res.int_type === 2 && $store.state.res.int_category === 1)">
        <div class="learn-more" v-if="$store.state.res.commentNumber > 0 && showMore" @click="downApp">
          <span class="flex flex-align-center flex-pack-center">
            <span>点击参与更多讨论</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 测试 feed流 -->
    <div v-if="$store.state.GET_MESSAGE_STATE && $store.state.res.int_type === 2 && $store.state.res.int_category === 1" class="works">
      <div class="title">
        <span>精彩投稿（{{ $store.state.res.commentNumber }}）</span>
      </div>
      <dp-feed v-if="$store.state.feed_list.length > 0"></dp-feed>
      <no-thing v-else></no-thing>
    </div>
    <div class="tj-dialog" @click.self="hiddenTextArea" v-if="visibleMessage">
      <div class="dpTextArea flex flex-v">
        <mt-field placeholder="写下你的评论" type="textarea" v-model="textarea" rows="5" class="tj-textarea flex-1"></mt-field>
        <div class="flex flex-align-end flex-pack-end">
          <mt-button type="default" size="small" class="cancel" @click="cancel">取 消</mt-button>
          <mt-button type="primary" size="small" @click="sure">确 定</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import noThing from "~/components/nothing";
export default {
  name: "Feed",
  async asyncData({ params, store, app, query }) {
    try {
      let para = {
        subjectid: params.id
      };
      // 获取贴子详情
      let res = await app.$axios.$get(
        `${api.command.show}?subjectid=${params.id}`
      );
      if (res.code != 0) {
        // 贴子被删除状态
        store.commit("GET_EXIST_STATUS", false);
      } else {
        // 在外部浏览器时 不可看的状态
        // 在PC预览 可看的状态
        if (store.state.GET_MESSAGE_STATE) {
          // pc端的状态
          if (query.view && query.view === "pre") {
            store.commit("GET_EXIST_STATUS", true);
          } else if (
            res.result.int_verify === 0 ||
            ((res.result.int_verify === -1 &&
              res.result.int_category != 4 &&
              res.result.int_category != 6) ||
              res.result.bool_delete)
          ) {
            store.commit("GET_EXIST_STATUS", false);
          } else {
            store.commit("GET_EXIST_STATUS", true);
          }
        }
        // 视频贴 特殊处理
        if (res.result.int_type === 1) {
          store.commit("SET_NO_NAV", false);
        }
        // 验证content
        if (res.result.content) {
          var content = JSON.parse(res.result.content);
          // 解析长图文html
          if (res.result.int_type === 2) {
            let _html = await $async.makeHtmlContent(
              content.html,
              store.state.GET_MESSAGE_STATE
            );
            if (_html) {
              content.html = _html;
            }
            if (res.result.int_category === 3 && content.end_html) {
              let end_html = await $async.makeHtmlContent(
                content.end_html,
                store.state.GET_MESSAGE_STATE
              );
              if (end_html) {
                content.end_html = end_html;
              }
            }
          }
          if (content.discuss) {
            var discuss = await content.discuss.map(x => {
              if (x.text) {
                let reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
                let res = x.text.match(reg);
                if (res) {
                  x.weblink = true;
                  res.map(y => {
                    // 正则替换文本
                    let tag = `<a href="${y}" target="_blank">${y}</a>`;
                    let newtag = x.text.replace(reg, tag);
                    x.newText = newtag;
                  });
                } else {
                  x.weblink = false;
                }
              }
              return x;
            });
            store.commit("SET_DISSCUSS", discuss);
          }
          // 返回在渲染页面之前得结果
          store.commit("SET_CONTENT", content);
        }
        store.commit("SET_RES", res.result);
      }
    } catch (err) {
      store.commit("GET_EXIST_STATUS", false);
      throw err;
    }
  },
  head() {
    return {
      title:
        this.$store.state.res.int_type === 2 && this.$store.state.res.title
          ? this.$store.state.res.title
          : this.$store.state.content.text &&
            this.$store.state.content.text.substring(0, 10)
    };
  },
  components: {
    noThing
  },
  data() {
    return {
      textarea: "",
      item: {},
      visibleMessage: false,
      isLike: false,
      defaultImg:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAGmAQMAAAAZMJMVAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURefn5ySG6Q8AAAA+SURBVHja7cExAQAAAMKg9U9tCj+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAvwGcmgABBZ8R+wAAAABJRU5ErkJggg==",
      loading: 1, // 按钮执行状态
      disabled: false, // 按钮可用状态
      res: {},
      content: {
        html: ""
      },
      isActive: true,
      // 投稿类型
      vid: "",
      messagelist: "",
      showMore: false
    };
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path.indexOf("/feed/morereply") > -1 ||
      to.path.indexOf("/group") > -1
    ) {
      this.$store.commit("SET_NO_NAV", false);
    } else {
      this.$store.commit("SET_NO_NAV", true);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (typeof window != "undefined") {
      if (document.getElementById("wrapper")) {
        document.getElementById("wrapper").scrollTop = 0;
      }
    }
    next();
  },
  methods: {
    // 跳转栏目主页
    toCommunity() {
      location.href = `/community/${this.$store.state.res.communityid}`;
    },
    // 跳转到更多回复页面
    morereply(item) {
      sessionStorage.setItem("item", JSON.stringify(item));
      location.href =
        "/feed/morereply?sid=" + item.subjectid + "&cid=" + item.commentid;
    },
    // 需要登录的操作 先判断后执行
    async tjFocus() {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // 进行其他 ajax 操作
        self.$store.dispatch("get_focus_stat", {
          communityid: self.$store.state.res.communityid,
          flag: self.$store.state.is_follow ? 0 : 1
        });
        return;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            // url: location.href
            url: `${location.protocol}//${
              location.hostname
            }/redirect?redirectUrl=${location.href}`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // int_type
    // 0-图片,1-视频,2-长图文 （判断贴子类型）
    // 贴子类型：int_category（判断是否有留言功能）
    // 0 - 普通贴子(用户投到栏目的) 有
    // 1 - 征稿(栏目运营人员发出) 没有留言功能
    // 2 - 投稿到征稿(用户投的)
    // 3 - 神议论(班长合成的)
    // 5 - 官方普通(栏目运营人员发出的)
    // 在app端 神议论贴子 打开原生视频
    showVid2(vid) {
      location.href = `/?vid=${vid}`;
    },
    // 在app端 长图文贴子 打开原生视频
    openClick(event) {
      if (!this.$store.state.GET_MESSAGE_STATE && event.target.dataset.vid) {
        location.href = `/?vid=${event.target.dataset.vid}`;
      }
    },
    // 打开 神议论里的贴子
    tofeed(fid) {
      if (this.$store.state.GET_MESSAGE_STATE) {
        this.$router.push({ path: `/feed/${fid}` });
      } else {
        location.href = `closer://feed/${fid}`;
      }
    },
    // 留言操作
    async toMessage(item) {
      let self = this;
      self.item = item;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        // self.visibleMessage = true;
        self.$store.commit("SET_MESSAGE_ITEM", item);
        self.$store.commit("SET_VISIBLE_MESSAGE", true);
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url: `${location.protocol}//${
              location.hostname
            }/redirect?redirectUrl=${location.href}`
            // url: location.href
          });
        } else {
          // 显示登录弹窗
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // h5下载补丁
    async downApp() {
      let self = this;
      let result = await self.$store.dispatch("down_adcookies", {
        webUdid: true,
        deviceType: self.$store.state.nvgtype,
        deviceVersion: self.$store.state.nvgversion,
        adid: window.sessionStorage.getItem("h5Adid") || "closer-share" // 栏目id
      });
      if (result) {
        if (this.$route.path.indexOf("/community") > -1) {
          location.href = `${api.downHost}?downurl=closer://community/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/feed") > -1) {
          location.href = `${api.downHost}?downurl=closer://feed/${
            this.$route.params.id
          }`;
        } else if (this.$route.path.indexOf("/group") > -1) {
          location.href = `${api.downHost}?downurl=closer://group/${
            this.$route.params.id
          }`;
        } else {
          location.href = `${api.downHost}`;
        }
      }
    },
    // 点赞操作
    async toSupport(item, index) {
      let self = this;
      // 渲染页面前 先判断cookies token是否存在
      if (Cookie.get("token")) {
        self.support(item);
      } else {
        // 前期仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            //url: location.href
            url: `${location.protocol}//${
              location.hostname
            }/redirect?redirectUrl=${location.href}`
          });
        } else {
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
    // 点赞接口 closer_reply.like
    async support(item) {
      let self = this;
      try {
        let para = {
          subjectid: item.subjectid,
          commentid: item.commentid,
          flag: item.isLike ? 0 : 1
        };
        let data = await self.$axios.$post(`${api.admin.like}`, para);
        if (data.code === 0) {
          self.$set(item, "isLike", !item.isLike);
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
    // 社区信息
    // 外部分享时调用
    async communityFocusStat() {
      let self = this;
      let communityFocusStat = await self.$axios.$get(
        `${api.community.show}?communityid=${self.$store.state.res.communityid}`
      );
      if (communityFocusStat.code === 0) {
        // 获取关注状态
        if (communityFocusStat.result.isFollowed) {
          self.$store.commit(
            "SET_FOCUS_STAT",
            communityFocusStat.result.isFollowed
          );
        }
      }
    },
    // 征稿时，显示征稿列表
    async paperList() {
      let self = this;
      if (
        self.$store.state.GET_MESSAGE_STATE &&
        self.$store.state.res.int_type === 2 &&
        self.$store.state.res.int_category === 1
      ) {
        let feeds = await self.$axios.$get(
          `${api.command.collections}?subjectid=${self.$route.params.id}`
        );
        if (feeds.code === 0) {
          let arr = await feeds.result.data.map(x => {
            if (x.content) {
              x.content = JSON.parse(x.content);
            }
            return x;
          });
          self.$store.commit("SET_FEED_LIST", arr);
        }
      } else {
        return;
      }
    },
    // 阅读数量
    async incrView() {
      let self = this;
      try {
        let para = {
          subjectid: self.$route.params.id
        };
        let view = await self.$axios.$get(
          `${api.command.incr_view}?subjectid=${
            self.$route.params.id
          }&timestamp=${Date.now()}`
        );
        // 静态增加 阅读量
        if (view.code === 0) {
          self.$store.commit("GET_INCR_VIEW", view.result);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  beforeMount() {
    let self = this;
    // 验证code是否存在
    if (self.$route.query.code) {
      self.$store.dispatch("get_code_by_login", {
        code: self.$route.query.code,
        type: "else"
      });
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      // 获取阅读量
      self.incrView();
      if (self.$store.state.GET_MESSAGE_STATE) {
        // 栏目关注状态
        self.communityFocusStat();
        // 获取留言列表
        self.$store.dispatch("message_list", {
          subjectid: self.$route.params.id
        });
        // 征稿列表
        self.paperList();
        self.showMore = true;
      }
      if (typeof window != "undefined") {
        // 贴子封面异步加载
        let tjcover = document.querySelector(".feed-cover");
        if (tjcover && tjcover.dataset.src) {
          setTimeout(() => {
            tjcover.src = tjcover.dataset.src;
          }, 0);
        }
        let tjimg = document.getElementById("tjimg");
        // 长图文图片异步加载
        if (tjimg) {
          let tjimg2 = tjimg.getElementsByTagName("img");
          if (tjimg2) {
            Array.prototype.forEach.call(tjimg2, function(x, i) {
              if (x.dataset.src) {
                setTimeout(() => {
                  x.src = x.dataset.src;
                }, 500);
              }
            });
          }
        }
        // 视频封面异步加载
        let videobg = document.querySelectorAll(".feed-video-bg");
        if (videobg) {
          Array.prototype.forEach.call(videobg, function(x, i) {
            if (x.dataset.bg) {
              setTimeout(() => {
                x.style.backgroundImage = `url('${x.dataset.bg}')`;
              }, 500);
            }
          });
        }
      }
    });
  }
};
</script>
<style>
.feed2,
.feed-box,
.message-box {
  height: 100%;
}
.feed-box-0 {
  min-height: calc(100vh - 13.07vw);
}

.feed-box-1 {
  min-height: calc(100vh - 56.25vw);
}

.videofeed {
  height: calc(100% - 56.25vw);
}
.videofeed .box {
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 56.25vw;
  box-sizing: border-box;
}
.learn-more {
  margin-top: 8px;
  line-height: 49px;
  font-size: 16px;
  color: #409eff;
  padding-top: 44px;
  height: 49px;
}
.more-img {
  width: 6.75px;
  height: 10.5px;
  margin-left: 5px;
}
.lg-preview-nav-arrow {
  border-top: 2px solid #333 !important;
  border-left: 2px solid #333 !important;
}
.feeder-comments .dp-border-show {
  border-left: 1px solid #fddb00;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
}
.tiejin-imgbox {
  background: #fff;
  width: 100%;
  min-height: 28.27vw;
  position: relative;
}
.tiejin-imgbox > span {
  color: #fff;
  font-size: 14vw;
  position: absolute;
  height: 28vw;
  width: 56vw;
  text-align: center;
  line-height: 1.5;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.tiejin-imgbox > img {
  width: 100%;
  height: auto;
}
.tiejin-videobox {
  width: 100%;
  height: 56.25vw;
  position: relative;
  background: #333;
}
.tiejin-videobox > video {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
}
.tiejin-videobox-native {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 56.25vw;
  position: relative;
}
.tiejin-videobox-native > div {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
}
.tiejin-iframe {
  width: 100%;
  min-height: 212px;
}
.icon-shipin-2 {
  background: url("data:image/png;base64,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");
  background-size: cover;
  width: 13vw;
  height: 13vw;
}
</style>
<style scoped lang="less">
@import "../../assets/css/feedid.less";
</style>
