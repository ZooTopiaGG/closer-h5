<template>
    <div id="group" :class="{  
        flex:true,
        commonbox: true,
        'flex-v':true }">
        <div class="member">
            <div class="title">群组成员 {{ $store.state.group_info.group_user_info.length + 1 }}</div>
            <ul :class="{
                group: true, 
                flex: true, 
                'flex-align-center': true,
                lookGroup: loadingmore
            }">
                <li v-if="$store.state.group_info.group_info.group" class="flex flex-v flex-align-center flex-pack-center">
                    <img v-if="$store.state.group_info.group_info.group.attributes.monitor.user.avatar" 
                        :src="$com.makeFileUrl($store.state.group_info.group_info.group.attributes.monitor.user.avatar, 'src', 60)" 
                        :onerror="defaultErrorImg">
                    <img v-else src="http://file-sandbox.tiejin.cn/avatar/u/8Vrm1jbf4B?v=1525248878082?s=500" :onerror="defaultErrorImg">
                    <span>{{ $store.state.group_info.group_info.group.attributes.monitor.user.fullname }}</span>
                </li>
                <li v-for="(item, index) in $store.state.group_info.group_user_info" :key="index" class="flex flex-v flex-align-center flex-pack-center">
                    <img v-if="item.props.roster.avatar" :src="$com.makeFileUrl(item.props.roster.avatar, 'src', 60)" :onerror="defaultErrorImg">
                    <img v-else src="http://file-sandbox.tiejin.cn/avatar/u/8Vrm1jbf4B?v=1525248878082?s=500" :onerror="defaultErrorImg">
                    <span>{{ item.props.roster.name }}</span>
                </li>
            </ul>
            <div class="more flex flex-align-center flex-pack-center" @click="lookmore">
                <span>所有群成员</span>
                <span v-if="!loadingmore" class="iconfont icon-ICONbiaozhun_fuzhi-"></span>
                <span v-else class="iconfont icon-ICONbiaozhun_fuzhi-1"></span>
            </div>
        </div>
        <div class="intro">
            <div class="title">群简介</div>
            <div class="content">
                <p>{{ $store.state.group_info.group_info.announcement }}</p>
            </div>
        </div>
        <div class="split-box"></div>
        <div class="works flex-1">
            <div class="title">群作品</div>
            <ul v-if="$store.state.group_res.length > 0" class="feed-list flex-1">
                <li class="feed-list-cell" @click="tofeeddetails(item)" v-for="(item, index) in $store.state.group_res" :key="index">
                    <div class="feed-box">
                        <div class="feed-cell-content">
                            <div class="columnname flex flex-align-center">
                                <img v-if="item.blogo" :src="item.blogo" :onerror="defaultErrorImg">
                                <img v-else src="http://file-sandbox.tiejin.cn/avatar/u/8Vrm1jbf4B?v=1525248878082?s=500" :onerror="defaultErrorImg">
                                <span class="name flex-1">{{ item.communityName }}</span>
                                <span class="time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</span>
                            </div>
                            <!-- 贴子详情 -->
                            <!-- 纯图片类型 int_type == 0-->
                            <div class="feedmain" v-if="item.int_type === 0">
                                <div v-if="item.content.text" class="feedtitle">
                                    {{ item.content.text }}
                                </div>
                                <div v-if="item.content.images.length == 1" class="flex flex-pack-justify feedimgcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" 
                                        v-lazy:background-image="$com.makeFileUrl(img.link)" 
                                        :style="{width: '100%',height:'0',paddingBottom:'56.25%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}" :key="index">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images.length == 2" class="flex flex-pack-justify feedimgcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" 
                                        v-lazy:background-image="$com.makeFileUrl(img.link)"
                                        :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}" :key="index">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images.length == 3 || item.content.images.length > 4" class="flex feedimgcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" 
                                        v-lazy:background-image="$com.makeFileUrl(img.link)"
                                        :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%',backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                        <span 
                                        class="gif"
                                        v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                        >GIF图</span>
                                    </div>
                                </div>
                                <div v-if="item.content.images === 4" class="flex flex-pack-justify feedimgcontent">
                                    <div class="feeder-img-list" v-for="(img, index) in item.content.images" 
                                        v-lazy:background-image="$com.makeFileUrl(img.link)"
                                        :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                      
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
                                    <img 
                                        v-lazy="$com.makeFileUrl(item.cover)" 
                                        :src="$com.makeFileUrl(item.cover, 'src', 624)" 
                                        :onerror="defaultErrorImg">
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
            <div v-else class="nocon">
                暂无群作品
            </div>
        </div>
        <div class="footer">
            <mt-button type="primary" size="small" class="circle-btn">
                打开贴近群组
            </mt-button>
        </div>
    </div>
</template>
<script>
    export default {
        middleware: 'group',
        data() {
            return {
                defaultErrorImg: 'this.src="' + require('~/assets/images/default.jpeg') + '"',
                id: '',
                loadingmore: false
            }
        },
        methods: {
            tofeeddetails(item) {
                // console.log(item.subjectid)
                this.$router.push( { path: `/feed/${item.subjectid}` } )
            },
            lookmore() {
                this.loadingmore = !this.loadingmore
            }
        },
        mounted() {
            // 在前端执行播放视频 先判断 只能在mounted中执行
            let self = this
            console.log('this.group_info====', self.$store.state.group_info)
            console.log('this.group_res====', self.$store.state.group_res)
            if (self.$store.state.group_res.length > 0) {
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
    }
</script>
<style scoped>
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
        position: relative;
    }
    .works .title {
        margin-left: 0.35rem;
    }
    .group {
        flex-wrap: wrap;
        height: 4rem;
        overflow: hidden;
    }
    .lookGroup {
        height: auto;
        overflow-y: auto;
    }
    .group li {
        width: 20%;
        margin-bottom: 0.15rem;
        height: 2rem;
        box-sizing: border-box;
    }
    .group li>img {
        max-width: 1.2rem;
        max-height: 1.2rem;
        width: 100%;
        height: auto;
        display: block;
        border-radius: 100%;
        margin-bottom: .1rem
    }
    .group li span{
        height: 24px;
        line-height: 24px;
        overflow: hidden;
    }
    .more {
        margin: .3rem 0 0.2rem
    }
    /*feed流*/
    .feed-list-cell {
        border-bottom: 1px solid #e9e9e9;
        margin-bottom: .4rem;
        padding-bottom: .35rem;
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
    .feedcontent {
        font-size: 13px;
        max-height: 75px;
        overflow: hidden;
    }
    .feedimgcontent {
        flex-wrap: wrap;
    }
    .feeder-img-list:nth-child(3n) {
        margin-right: 0 !important;
    }
    .feedtitle, .feedcontent {
        text-align: justify;
        padding: 0 .35rem; 
    }
    .prism-player {
        margin-bottom: .3rem;
    }
</style>
