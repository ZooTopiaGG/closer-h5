<template>
  <div id="feed" :class="{ videofeed: $store.state.res.int_type === 1}">
    <div class="box">
      <div class="feed-1">
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
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 2">
              <div class="feeder-img-list feeder-img-list-cell-2" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">                
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex" v-else-if="$store.state.content.images && $store.state.content.images.length == 3 || $store.state.content.images && $store.state.content.images.length > 4">
              <div class="feeder-img-list feeder-img-list-cell-3" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
              </div>
            </div>
            <div class="feeder-img flex flex-pack-justify" v-else-if="$store.state.content.images && $store.state.content.images.length == 4">
              <div class="feeder-img-list feeder-img-list-cell-4" v-for="(img, index) in $store.state.content.images" v-lazy:background-image="$com.makeFileUrl(img.link)"
                :key="index">
                <img class="feeder-cover-list" :data-src="$com.makeFileUrl(img.link)" :data-index="index">
                <span class="gif" v-if="img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1">GIF图</span>
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
                <mt-button :type="$store.state.is_follow ? 'default' : 'primary'" size="small" class="flex tj-focus-btn cursor" @click="tjFocus">
                  <span v-if="$store.state.is_follow">已关注</span>
                  <span v-else>
                    <span class="focus-icon">+</span>
                    <span>关注</span>
                  </span>
                </mt-button>
              </div>
            </div>
            <div class="feeder-title feeder-title-2">{{ $store.state.content.text }}</div>
          </div>
        </div>
        <!-- res.int_type==2长图文。int_category=== 3神议论 1是征稿 -->
        <div class="feed-doc" id="imgLongFeed" v-else-if="$store.state.res.int_type === 2">
          <div class="feeder-img feeder-img-bgcover" v-if="$store.state.res.bigcover">
            <!--  判断是否在app 内 需要预览 -->
            <img class="feed-cover feed-cover-bgcover" :src="defaultImg" data-index= "0"  :data-src="$com.makeFileUrl($store.state.res.bigcover)" 
            >
            <div class="hide-over"></div>
          </div>
          <div class="feeder-img feeder-img-cover" v-else>
            <!--  判断是否在app 内 需要预览 -->
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
              <div class="summary" v-html="$store.state.content.html">
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
                        <span class="gif" v-if="item.image.link.indexOf('.gif') > -1 || item.image.link.indexOf('.GIF') > -1">GIF图</span>
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
                          <video :src="item.video.src" controls="controls" preload="none" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow"
                            x5-video-player-type="h5" x5-video-orientation="portraint" x5-playsinline="true" x5-video-player-fullscreen="h5"
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
              <!-- <span v-if="$store.state.res.isOffical">官方出品</span> -->
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
      <div v-if="$store.state.GET_MESSAGE_STATE" class="split-box"></div>
      <!-- 留言板 -->
      <div class="feed-2" v-if="$store.state.GET_MESSAGE_STATE">
        <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
        <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
        <div v-if="$store.state.res.int_category != 1 ">
          <div class="message-num">
            {{ $store.state.res.commentNumber }} 条留言
          </div>
          <ul class="feed-messagebord-list" v-if="messagelist.data && messagelist.data.length > 0">
            <li class="feed-messagebord-list-cell" v-for="(item, index) in messagelist.data" :key="index">
              <div class="messager-info flex flex-align-center flex-pack-justify">
                <div class="messager-info-div flex flex-align-center">
                  <img v-lazy="$com.makeFileUrl(item.user.avatar)">
                  <div class="flex flex-v">
                    <span class="messager-name">{{ item.user.fullname }}</span>
                    <span class="messager-time">{{ $com.getCommonTime(item.long_publish_time, 'yy-mm-dd hh:MM') }}</span>
                  </div>
                </div>
                <div class="icon-group flex flex-align-center">
                  <p class="flex flex-align-center cursor messages" style="margin-right:10px" @click="toMessage(item)">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAADfElEQVRYR+1XXWgcVRT+zp3dTUikwUalIkIeqg+FvjQgIqVds7O7vbO7goXFB/+ebLEUKkJ9kJaCWpAiVBARf0Awvsg+VJmduZnZbRhFqQ9GxD+wULSU1iI1UMmPTXbukYnZdkh2TffnSTJPwz3nfN8337lz5g7h1kVFK3uIgcNgbAeQiMX6datBuAjGh1f/mH19ZmZmeS0wNRcsmX2TgCP9Yr4NnDOOqu1vKUjKzA4B8QOABpN4enh4y6eVSmXpNkA7Skmn04mhodSjxPwJgDvBvM+ZqntxkBWHitI8zKC3GPyRq+rPdsTSRXJBZl8BcBygNxzlH10nqCCzLwM4CdBJR/nHuuDoqKQgcwcAfhfg9xxVP7gpaK19mw5ttKF6cigaCQaJg2A4VVXz42RFaT4HwgO00DhlB8G1mzPNSm+DTh41hPjOdr3JvrasILPfABhnxt9GcnDUtu2FiEBK82EBOvcvGb3jKP9Qk7hgZSfBeAoACy122p73U1xUTw4VpWkzqAjg8vzi8lgQBI0I/LF8fnsodESUIqLjVdd/rUla3GeeYqJoviyQET5YrU5f7pugXC43nBQ632DjnOd5v8eBV9rJYqw6VVORG81YuVw2FueuW5rCX1z37Pm+tmyjDdpNvKeWdUO4Uc2moP+jQ+YLAJ0G6H1H+Qc2esJe45ZlHiOmV0F82nHrL6772pfy+V1a6BkA80xkua7/Ra+k7eoty9xJTNGh7F5i7K9O1c6sExQtFGTuY4CfXA3OArjRAnRZg59Qqv51O8JSKX2XDlMOmO9vkROd0+9eme3A51VVmwCgWwoaHx9Pbrtn9ATAzwPY+h8OzULQXsfxf1ybY5rmyGBSTDN4V9t6xhyIJucXl14KgmBubd7NQ34sIKSUo0RkxJPDMKSE0G8DeByMK0LTbtv3f23mrEz0BPtgPALgPJMuAQN/xTEGGg2dGBn5s1KphO0EtxLU9uGklAMCDQdABuALTI3drhtcja8z8FsjpD2+71/qZh92JCgiSKfTdwwPpc6C+SECfb8UIpsw+AMCSgCuaIR7lJq+0I2Y1b3VeWkmkxkdTInoTdwBIGrLFoCvJZDc+5lSP3eOeKuiY4eapcXixH06NL4kYIwZ142kmLBt79texHTtUJN09UzkaeAZpWpf9SqmZ0ERQLlcTvXzL7frlvXDjVYY/wDEM9MuxdT8/QAAAABJRU5ErkJggg==" alt="">
                  </p>
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
                  <li class="messager-comments-cell" style="color: #5e97cd;" v-if="item.replyNumber > 3" @click="morereply(item)">
                    <span>共{{ item.replyNumber }}条回复</span>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <!-- <div class="learn-more" v-if="messagelist.count && messagelist.count>10">
            <span @click="learnMore" class="flex flex-align-center flex-pack-center">
              <span v-if="loading === 1">查看更多留言</span>
              <span v-else-if="loading===2" class="flex flex-align-center">
                <span>正在加载</span>
                <mt-spinner :size="16" type="triple-bounce" color="#495060" style="margin-left:5px"></mt-spinner>
              </span>
              <span v-else>到底了，没有更多了</span>
            </span>
          </div> -->
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
      messagelist: ""
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
            url: location.href
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
    // 查看更多
    learnMore() {
      this.loading = 2;
      setTimeout(() => {
        this.loading = 3;
        this.isActive = false;
      }, 3000);
    },
    // 在app端 神议论贴子 打开原生视频
    showVid2(vid) {
      location.href = `/?vid=${vid}`;
    },
    // 在app端 长图文贴子 打开原生视频
    openClick(event) {
      if (event.target.dataset.vid) {
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
        self.visibleMessage = true;
      } else {
        // 前期 仅微信 后期再做微博，qq等授权， 所以在其他浏览器 需使用默认登录
        if ($async.isWeiXin()) {
          // 通过微信授权 获取code
          await self.$store.dispatch("get_wx_auth", {
            url: location.href
          });
        } else {
          // 显示登录弹窗
          self.$store.commit("SET_VISIBLE_LOGIN", true);
        }
      }
    },
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
            url: location.href
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
    // 留言列表
    async messageList() {
      let self = this;
      try {
        let para1 = {
          pagesize: 10,
          pagenum: 1,
          subjectid: self.$route.params.id
        };
        let data = await self.$axios.$post(`${api.command.comments}`, para1);
        if (data.code === 0) {
          self.messagelist = data.result;
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
        let para = {
          subjectid: self.$route.params.id,
          pagenum: 1,
          pagesize: 10
        };
        let feeds = await self.$axios.$post(`${api.command.collections}`, para);
        if (feeds.code === 0) {
          let arr = await feeds.result.data.map(x => {
            if (x.content) {
              x.content = JSON.parse(x.content);
            }
            return x;
          });
          self.$store.commit("SET_FEED_LIST", arr);
        }
      }
    },
    // 隐藏留言框
    hiddenTextArea() {
      this.visibleMessage = false;
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
        self.communityFocusStat();
        self.messageList();
        self.paperList();
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
.learn-more {
  margin-top: 8px;
  height: 36px;
  line-height: 36px;
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
.video-player {
  margin: 2.668vw 0;
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
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 56.25vw;
  position: relative;
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
<style scoped>
#feed {
  padding: 0 0 4vw;
  box-sizing: border-box;
  font-size: 13px;
  padding-bottom: 0;
}
/* 视频特殊处理 */
.videofeed .box {
  height: calc(177.87vw - 56.25vw);
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 56.25vw;
}
.feed-h5-videos {
  width: 100%;
  height: 56.25vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0 1px 5px #efefef;
}
.feed-h5-videos-player {
  width: 100%;
  height: 56.25vw;
  overflow: hidden;
  background: #333;
}
.works {
  padding-top: 5.34vw;
}

.works {
  padding-bottom: 4vw;
  position: relative;
}

.works .title {
  text-align: left;
  margin-left: 4.67vw;
}

.feeder-info,
.feed-messagebord-type,
.feed-messagebord,
.feed-messagebord-list,
.feeder-title,
.read-num,
.feeder-comments {
  padding: 0 4vw;
}
.feeder-comment {
  font-size: 15px;
}
.read-num {
  margin-bottom: 2.668vw;
  color: #888;
}

.feeder-title {
  font-size: 18px;
  margin-bottom: 2.668vw;
  font-weight: bold;
  white-space: pre-line;
  line-height: 1.6;
}

.feeder-title-2 {
  font-weight: 400;
  /* margin: 4vw 0 2.13vw; */
}
.feeder-title-3 {
  font-size: 20px;
  font-weight: bold;
}
.feeder-cover {
  padding: 4vw 4vw 0;
}

.feeder-cover > img {
  width: 21.87vw;
  height: 8.54vw;
}

.feeder-content {
  margin-top: 5.34vw;
}

.feeder-img {
  width: 100%;
  flex-wrap: wrap;
}
.feed-imgbox {
  width: 100%;
  height: 48vw;
  position: relative;
  border-radius: 3px;
}
.feed-imgbox > video {
  width: 100%;
  height: 48vw;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
}
.feed-imgbox-else {
  background-position: center center;
  background-repeat: no-repeat;
  width: 100%;
  height: 48vw;
  position: relative;
  border-radius: 3px;
}
.feed-imgbox-else > div.feed-imgbox-else-child {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}
.hide-over {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  z-index: 99;
}

.messager-info-div > img {
  width: 9.07vw;
  height: 9.07vw;
  max-width: 68px;
  max-height: 68px;
  border-radius: 100%;
  margin-right: 1.33vw;
  margin-bottom: 3px;
}

.feeder-info {
  margin: 2.668vw 0;
}

.videoNav {
  height: 60px;
}
.feeder-info {
  color: #94928e;
}

.feed-messagebord {
  height: 10.67vw;
  border-bottom: 1px solid #eee;
}

.feed-messagebord-type {
  margin-bottom: 2.668vw;
  color: #94928e;
  font-size: 14px;
}

.feeder-title {
  text-align: justify;
}

.feed-publication-number {
  margin-right: 2.67vw;
}

.feed-messagebord-left {
  font-size: 15px;
  color: #444;
  font-weight: 600;
}

.messager-comment {
  color: #495060;
}

.messager-name {
  font-size: 14px;
}

.feed-messagebord-list-cell {
  border-bottom: 1px solid #eee;
  padding: 2.668vw 0 0;
}

.messager-content {
  margin: 2.668vw 0;
  line-height: 1.6;
  text-align: justify;
  font-size: 15px;
}

.messager-time {
  font-size: 12px;
  color: #999;
}

.feeder-img-list {
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.feeder-img-list:nth-child(3n) {
  margin-right: 0 !important;
}
.feeder-img-list-cell-1 {
  width: 100%;
  height: 100%;
}
.feeder-img-list-cell-2 {
  width: 49.5%;
  height: 0;
  padding-bottom: 49.5%;
}
.feeder-img-list-cell-3 {
  width: 33%;
  height: 0;
  padding-bottom: 33%;
  margin-bottom: 0.5%;
  margin-right: 0.5%;
}
.feeder-img-list-cell-4 {
  width: 49.5%;
  height: 0;
  padding-bottom: 49.5%;
  margin-bottom: 1%;
}
.icon-add {
  font-size: 14px;
  margin-right: 2px;
}
.feeder-img-bgcover {
  position: relative;
  width: 100%;
  height: 124vw;
}
.feeder-img-cover {
  position: relative;
  width: 100%;
  height: 57vw;
}
.feed-cover-bgcover {
  display: block;
  position: relative;
  width: 100%;
  height: 124vw;
}
.feed-cover-cover {
  display: block;
  position: relative;
  width: 100%;
  height: 57vw;
}
.feed-cover-list {
  width: 100%;
  display: block;
}

.feeder-cover-list {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  display: block;
}

.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
}

.feeder-comments,
.god-discuss-end-tag {
  margin-top: 6.66vw;
}

.feeder-comments-cell {
  box-sizing: border-box;
  border-bottom: 1px solid rgb(243, 243, 243);
  margin-bottom: 2.668vw;
  padding: 2.67vw 2.67vw;
}

.feeder-comment-info {
  margin-top: 0.66vw;
  width: 13vw;
}

.feeder-comment-info > i {
  margin-right: 2.67vw;
  width: 9.07vw;
  height: 9.07vw;
  max-width: 68px;
  max-height: 68px;
  border-radius: 100%;
  background-size: cover;
  background-position: 50% 50%;
}

.feeder-comment-3 {
  height: 16.54vw;
  box-sizing: border-box;
  padding: 2.67vw;
  border-radius: 6px;
  border: 1px solid #d7d7d9;
  background: #f6f6f6;
}

.feeder-comment-3-cover > i {
  display: block;
  margin-right: 2.67vw;
  width: 11.47vw;
  height: 11.47vw;
  max-width: 86px;
  max-height: 86px;
  border-radius: 6px;
  background-size: cover;
  background-position: center center;
}

.feeder-comment-3-title {
  font-size: 15px;
  height: 15px;
  line-height: 1;
  overflow: hidden;
  margin-bottom: 2.67vw;
}

.feeder-comment-3-summary {
  font-size: 12px;
  height: 12px;
  line-height: 1;
  color: rgba(148, 146, 142, 1);
  overflow: hidden;
}

.feeder-comment-nickname {
  font-size: 13px;
  color: rgba(148, 146, 142, 1);
  margin-bottom: 2.4vw;
  line-height: 1;
}

.feeder-comment-img {
  width: 73vw;
  border-radius: 3px;
}

.messager-comments {
  padding: 1.335vw 2.67vw;
  background-color: #f4f4f4;
  margin-bottom: 2.67vw;
}

.messager-comments-cell {
  box-sizing: border-box;
  padding: 0.67vw 0;
}
.summary {
  text-align: justify;
}

.message-num {
  height: 10.67vw;
  line-height: 10.67vw;
  padding: 0 4vw;
  box-sizing: border-box;
  font-size: 16px;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 2.67vw;
  font-weight: bold;
}
.messages > img {
  width: 18px;
  height: 15px;
}
.supports > img {
  width: 19px;
  height: 15px;
}

.dpTextArea {
  width: 100%;
  padding: 0 4vw 4vw;
  background: #fff;
  min-height: 180px;
  box-sizing: border-box;
  padding-top: 13.07vw;
}

.tj-btn {
  width: 100%;
}

.tj-code-btn {
  height: 6.9vw;
  margin: 0 2px 0 5px;
  font-size: 14px;
}

.title {
  height: 8vw;
  line-height: 8vw;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2vw;
}
.cancel {
  margin-right: 2.67vw;
}
</style>
