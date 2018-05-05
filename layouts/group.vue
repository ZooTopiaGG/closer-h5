<template>
    <div id="group">
        <div class="member">
            <div class="title">群组成员 10</div>
            <ul class="group flex flex-align-center">
                <li v-for="item in 10" :key="item" class="flex flex-v flex-align-center flex-pack-center">
                    <img src="http://file-sandbox.tiejin.cn/avatar/u/8Vrm1jbf4B?v=1525248878082?s=500">
                    <span>小李</span>
                </li>
            </ul>
        </div>
        <div class="intro">
            <div class="title">群简介</div>
            <div class="content">
                <p>
                    九张科幻感十足的图，将成都这座城市赋予了十足的科幻感和未来感。原图作者“手指断了a”精彩演绎九张科幻感十足的图，将成都这座城市赋予了十足的科幻感和未来感。原图作者“手指断了a”精彩演绎未来感。原图作者“手指断了a”精彩演绎未来感。原图作者“手指
                </p>
            </div>
        </div>
        <div class="split-box"></div>
        <div class="works">
            <div class="title">群作品 3</div>
            <ul class="feed-list flex-1">
                <li class="feed-list-cell"  v-for="(item, index) in $store.state.group_res" :key="index">
                    <div class="feed-box">
                        <div class="feed-cell-content">
                            <div class="columnname flex flex-align-center">
                                <img v-if="item.blogo" :src="item.blogo">
                                <img v-else src="http://file-sandbox.tiejin.cn/avatar/u/8Vrm1jbf4B?v=1525248878082?s=500">
                                <span class="name flex-1">{{ item.communityName }}</span>
                                <span class="time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</span>
                            </div>
                            <!-- 贴子详情 -->
                            <!-- 纯图片类型 int_type == 0-->
                            <div class="feedmain" v-if="item.int_type === 0">
                                <div v-if="item.content.text" class="feedtitle">
                                    {{ item.content.text }}
                                </div>
                                <div v-if="item.content.images.length == 1" class="flex flex-pack-justify feedcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" style="width: 100%;height:100%;" :key="index">
                                        <img class="feed-cover-list" :src="$com.makeFileUrl(img.link, 'src', 624)">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images.length == 2" class="flex flex-pack-justify feedcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src', 312)+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}" :key="index">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images.length == 3 || item.content.images.length > 4" class="flex feedcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src', 208)+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images === 4" class="flex flex-pack-justify feedcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%',backgroundImage:'url('+$com.makeFileUrl(img.link, 'src', 312)+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                      
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 视频贴 int_type == 1-->
                            <div class="feedmain" v-else-if="item.int_type === 1">
                                <div class="prism-player" id="J_prismPlayer" :vid="item.content.videos[0].vid" :cover="item.content.videos[0].cover">
                                </div>
                                <div v-if="item.content.text" class="feedtitle">{{ item.content.text }}</div>
                            </div>
                            <!-- 长图文有封面 int_type == 2 int_category=== 3神议论 1是征稿-->
                            <div class="feedmain" v-else-if="item.int_type === 2">
                                <div v-if="item.cover" class="feedcover flex">
                                    <img :src="$com.makeFileUrl(item.cover, 'src', 624)">
                                </div>
                                <div class="feedtype">
                                    <div v-if="item.title" class="feedtitle">
                                        {{ item.title }}
                                    </div>
                                    <div v-if="item.content.summary" class="feedcontent">
                                        {{ item.content.summary }}
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="feeddata flex flex-pack-justify flex-align-center">
                                <label class="flex flex-align-center">
                                    <i class="icon iconfont icon-share"></i>
                                    <span>{{ item.long_share }}</span>
                                </label>
                                <label class="flex flex-align-center">
                                    <i class="icon iconfont icon-message"></i>
                                    <span>{{ item.commentNumber }}</span>
                                </label>
                                <label class="flex flex-align-center">
                                    <i class="icon iconfont icon-upvote"></i>
                                    <span>{{ item.like }}</span>
                                </label>
                            </div> -->
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <Button type="primary" shape="circle" size="large">打开贴近群组</Button>
        </div>
    </div>
</template>
<script>
    export default {
        middleware: 'group',
        data() {
            return {
                id: ''
            }
        },
        mounted() {
            // 在前端执行播放视频 先判断 只能在mounted中执行

            let self = this
            console.log('this.group_res====', self.$store.state.group_res)
            self.$store.state.group_res.map(x => {
                if (x.int_type === 1) {
                    let res = self.$axios.$get(`${api.command.videos}`)
                    .then(res => {
                        self.id = `J_prismPlayer_${x.content.videos[0].vid}`
                        // console.log('ressss===', this.$store.state.content.videos[0].vid)
                        let player = new Aliplayer({
                            // id: self.id,
                            id: 'J_prismPlayer',
                            width: '100%',
                            autoplay: false,
                            prismType: 2,
                            vid : x.content.videos[0].vid,
                            playauth : '',
                            playsinline: true, //app内播放设置
                            qualitySort: 'desc', //清晰度切换
                            cover: x.content.videos[0].imageUrl,
                            accessKeyId: res.result.accessKeyId,
                            securityToken: res.result.securityToken,
                            accessKeySecret: res.result.accessKeySecret
                        }, function(player){
                            console.log('播放器创建好了。')
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
    }
</script>
<style scoped>
    #group {
        height: 100vh;
        overflow: auto;
    }
    .member, .intro{
        padding: 0 0.2rem 0.2rem;
    }
    .title {
        margin-bottom: .2rem;
        font-size: 16px;
        margin-left: 0.15rem;
    }
    .content {
        padding: 0 .15rem .15rem;
        text-align: justify;
        font-size: 14px;
        color: #808080;
    }
    .member, .works {
        padding-top: .4rem;
    }
    .works {
        padding-bottom: .2rem;
    }
    .works .title {
        margin-left: 0.35rem;
    }
    .group {
        flex-wrap: wrap;
    }
    .group li {
        width: 20%;
        margin-bottom: 0.15rem;
    }
    .group li>img {
        width: 60px;
        height: 60px;
        display: block;
        border-radius: 100%;
        margin-bottom: .1rem
    }
    /*feed流*/
    .feed-list-cell {
        border-bottom: 1px solid #e9e9e9;
        margin-bottom: .4rem;
    }
    .columnname>img {
        width: 1.64rem;
        height: .64rem;
        border-radius: 0 4px 4px 0;
        margin-right: .3rem
    }
    .columnname {
        padding-right: .35rem;
        box-sizing: border-box;
        margin-bottom: .2rem;
    }
    .name {
        font-size: 16px;
    }
    .time {
        color: #808080;
    }
    .feedtype {
        padding: .35rem 0
    }
    .feedcover>img {
        width: 100%;
        height: 100%;
    }
    .feedtitle {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 0.2rem;
    }
    .feedtitle, .feedcontent {
        text-align: justify;
        padding: 0 .35rem; 
    }
    .prism-player {
        margin-bottom: .3rem;
    }
</style>
