<template>
    <div id="feed">
        <lg-preview></lg-preview>
        <div v-if="exist">
            <div class="feed-1">
                <div v-if="$store.state.GET_MESSAGE_STATE && res.blogo" class="feeder-cover">
                    <img class="access-not" :src="$com.makeFileUrl(res.blogo, 'src')">
                </div>
                <!-- 发帖者信息 -->
                <div v-if="$store.state.GET_MESSAGE_STATE" class="feeder-info">
                    <span v-if="res.double_latitude != -999">{{ res.className }}</span>
                    <span v-else>官方出品</span>
                    <span>@{{ res.username }}出品</span> <span class="dp-text-color"> / </span> <span>{{ $com.getCommonTime(res.long_update_time, 'yy-mm-dd hh:MM') }}</span>
                </div>
                <!-- 帖子内容 -->
                <!-- 图片 -->
                <div class="feed-doc" v-if="res.int_type === 0">
                    <div class="feeder-title">{{ content.text }}</div>
                    <!--  判断是否在app de预览 -->
                    <!-- 图片排列  需判断GIF -->
                    <div v-if="$store.state.GET_MESSAGE_STATE">
                        <div class="feeder-img flex flex-pack-justify" v-if="content.images.length == 1">
                            <div class="feeder-img-list" v-for="(img, index) in content.images" style="width: 100%;height:100%;" :key="index">
                                <img class="feed-cover-list" v-preview="$com.makeFileUrl(img.link)" :src="$com.makeFileUrl(img.link, 'src')">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 2" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}" :key="index">
                                <img class="feeder-cover-list " v-preview="$com.makeFileUrl(img.link)">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex" v-else-if="content.images.length == 3 || content.images.length > 4" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                <img class="feeder-cover-list" v-preview="$com.makeFileUrl(img.link)">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 4" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%',backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                <img class="feeder-cover-list" v-preview="$com.makeFileUrl(img.link)" >
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                    </div>
                    <!-- 在app内   -->
                    <div v-else>
                        <div class="feeder-img flex flex-pack-justify" v-if="content.images.length == 1">
                            <div class="feeder-img-list" v-for="(img, index) in content.images" style="width: 100%;height:100%;" :key="index">
                                <img class="feed-cover" :src="$com.makeFileUrl(img.link, 'src')">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 2" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '50%',height:'0',paddingBottom:'50%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat'}" :key="index">
                                <img class="feeder-cover-list">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex" v-else-if="content.images.length == 3 || content.images.length > 4" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '33%',height:'0',paddingBottom:'33%',marginBottom:'0.5%', marginRight: '0.5%', backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                <img class="feeder-cover-list">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                        <div class="feeder-img flex flex-pack-justify" v-else-if="content.images.length == 4" >
                            <div class="feeder-img-list" v-for="(img, index) in content.images" :style="{width: '49.5%',height:'0',paddingBottom:'49.5%',marginBottom: '1%',backgroundImage:'url('+$com.makeFileUrl(img.link, 'src')+')', backgroundSize: 'cover', backgroundPosition:'center center', backgroundRepeat: 'no-repeat' }" :key="index">
                                <img class="feeder-cover-list">
                                <span 
                                class="gif"
                                v-if= "img.link.indexOf('.gif') > -1 || img.link.indexOf('.GIF') > -1"
                                >GIF图</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 视频 -->
                <div class="feed-doc" v-else-if="res.int_type === 1">
                    <div class="feeder-title">{{ content.text }}</div>
                    <div class="prism-player" id="J_prismPlayer" :vid="content.videos[0].vid" :cover="content.videos[0].cover"></div>
                </div>
                <!-- 长图文。int_category=== 3神议论 1是征稿 -->
                <div class="feed-doc" v-else-if="res.int_type === 2">
                    <div v-if="$store.state.GET_MESSAGE_STATE" class="feeder-title" >{{ res.title }}</div>
                    <div class="feeder-img" style="position:relative;" v-if="res.cover">
                        <!--  判断是否在app 内 需要预览 -->
                        <img v-if="$store.state.GET_MESSAGE_STATE" class="feed-cover" style="width: 100%;display:block;" v-preview="$com.makeFileUrl(res.cover)" :src="$com.makeFileUrl(res.cover)">
                        <img v-else class="feed-cover" style="width: 100%; display:block;" :src="$com.makeFileUrl(res.cover, 'src')">
                        <div v-if="!$store.state.GET_MESSAGE_STATE" class="hide-over"></div>
                    </div>
                    <div class="feeder-content">
                        <div class="summary" id="summary" v-html="htmls"></div>
                        <ul class="feeder-comments" v-if="res.int_category === 3">
                            <li class="feeder-comments-cell dp-border-show" v-for="(item, index) in content.discuss" :key="index">
                                <div v-if="item.type === 0" class="feeder-comment">{{ item.text }}</div>
                                <div v-else-if="item.type === 1" class="feeder-comment">
                                    <img v-if="$store.state.GET_MESSAGE_STATE" class="feeder-comment-img" v-preview="$com.makeFileUrl(item.image.link)" :src="$com.makeFileUrl(item.image.link, 'src')">
                                    <img v-else class="feeder-comment-img" :src="$com.makeFileUrl(item.image.link, 'src')">
                                </div>
                                <div class="feeder-comment-info flex flex-align-center flex-pack-end">
                                    <i :style="{ backgroundImage: 'url('+item.avatar+')', backgroundSize: 'cover' }"></i>
                                    <span>{{ item.nickname }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div v-if="$store.state.GET_MESSAGE_STATE" class="split-box"></div>
            <!-- 留言板 -->
            <div class="feed-2" v-if="$store.state.GET_MESSAGE_STATE">
                <div>
                    <div class="feed-messagebord-type flex flex-align-center" v-if="res.int_category === 1">
                        <span>投稿类型：</span>
                        <span><span>{{ postType }}</span> <span class="dp-text-color">/</span> <span>{{ $com.createTime(res.long_update_time, '年/月/日') }}截止</span></span>
                    </div>
                    <div class="feed-messagebord flex flex-align-center flex-pack-justify">
                        <span class="feed-messagebord-left" v-if="res.int_category === 1">投稿 {{ res.commentNumber }}</span>
                        <!-- <span class="feed-messagebord-left" v-else-if="res.int_category === 0 || res.int_category === 5|| res.int_category === 3">留言 {{ res.commentNumber }}</span> -->
                        <span class="feed-messagebord-left" v-else>留言 {{ res.commentNumber }}</span>
                        <span>赞 {{ res.like }}</span>
                    </div>
                </div>
                <!-- 留言列表 用int_category 判断 0 1 3 5 暂时用else-if -->
                <!-- <div v-if="res.int_category === 0 || res.int_category === 5 || res.int_category === 3 "> -->
                <div v-if="res.int_category != 1 ">
                    <ul class="feed-messagebord-list" >
                        <li class="feed-messagebord-list-cell" v-for="(item, index) in messagelist.data" :key="index">
                            <div class="messager-info flex flex-align-center">
                                <img :src="$com.makeFileUrl(item.user.avatar)">
                                <span>{{ item.user.fullname }}</span>
                            </div>
                            <div class="messager-content">{{ item.content }}</div>
                            <!-- 评论列表 -->
                            <div v-if="item.replyNumber > 0">
                                <ul class="messager-comments" v-if="item.replyNumber <=3">
                                    <li class="messager-comments-cell" v-for="(commentItem, commentIndex) in item.sonList" :key="commentIndex">
                                        <span>{{ commentItem.user.fullname }}：</span><span class="messager-comment">{{ commentItem.content }}</span>
                                    </li>
                                </ul>
                                <ul class="messager-comments" v-else>
                                    <li class="messager-comments-cell" style="color: #5E97CD">{{ item.replyNumber }}条回复</li>
                                </ul>
                            </div>
                            <div class="messager-time">{{ $com.getCommonTime(item.long_update_time, 'yy-mm-dd hh:MM') }}</div>
                        </li>
                    </ul>
                    <Button v-if="messagelist.count>1" type="text" :loading="loading===2" long @click="learnMore" class="learn-more">
                        查看更多留言
                    </Button>
                </div>
            </div>
        </div>
        <div class="not-exist" v-else>
            <span>贴子已经被删除</span>
        </div>
    </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'Feed',
    // computed: {
    //     ...mapGetters([
    //         // true 显示 ，false 不显示
    //         'GET_MESSAGE_STATE'
    //     ])
    // },
    head() {
        return {
            // 可以使用this
            title: this.content.text || this.res.title
        }
    },
    async asyncData({ params }) {
        // 获取详情
        let para = {
            subjectid: params.id
        }
        // 获取留言列表
        let para1 = {
            subjectid: params.id,
            pagenum: 1,
            pagesize: 5
        }
        let [res, messagelist] = await Promise.all([
            axios.post(`${api.base}${api.command.show}`, qs.stringify(para)),
            axios.post(`${api.base}${api.command.comments}`, qs.stringify(para1))
        ])
        // 获取视频密钥等
        if (res.data.result.content) {
            var content = JSON.parse(res.data.result.content)
            if (res.data.result.int_type === 2) {
                var options = {
                    str: content.html,
                    flg: 'class="flex flex-pack-center" data-pimg="has-editor-img"',
                    splitStr1: 'p', // 分割img父级标签 没有则 不填
                };
                // 在前端处理
                // let htmls = self.$com.regexImg(options)
            }
            
        }
        // 返回在渲染页面之前得结果
        return {
            res: res.data.result,
            content: content,
            messagelist: messagelist.data.result,
            options: options
        }
    },
    computed: {
        htmls() {
            let options = {
                str: this.content.html,
                flg: 'class="flex flex-pack-center" data-pimg="has-editor-img"',
                splitStr1: 'p', // 分割img父级标签 没有则 不填
            }
           return this.$com.regexImg(options)
        }
    },
    data() {
        return {
            loading: 1, // 按钮执行状态
            disabled: false, // 按钮可用状态
            res: {},
            content: {},
            messagelist: {},
            isActive: true,
            // htmls: '',
            exist: true,
            // 投稿类型
            postType: '',
            // GET_MESSAGE_STATE: true,
            options: {}
        }
    },
    methods: {
        // int_type
        // 0-图片,1-视频,2-长图文 （判断贴子类型）
        // 贴子类型：int_category（判断是否有留言功能）
        // 0 - 普通贴子(用户投到栏目的) 有
        // 1 - 征稿(栏目运营人员发出) 没有留言功能
        // 2 - 投稿到征稿(用户投的)
        // 3 - 神议论(班长合成的)
        // 5 - 官方普通(栏目运营人员发出的)
        learnMore() {
            this.loading = 2;
            setTimeout(() => {
                this.loading = 1;
                this.isActive = false;
            }, 3000)
        },
        // 点击单选按钮时变化
        reportChange() {
            // 监听按钮状态
            this.disabled = false;
            this.loading = 1;
        },
    },
    mounted() {
        // 在前端执行播放视频 先判断 只能在mounted中执行
        if (this.res.int_type === 1) {
            axios.get(`${api.base}${api.command.videos}`)
            .then(res => {
                let player = new Aliplayer({
                    id: 'J_prismPlayer',
                    width: '100%',
                    autoplay: false,
                    prismType: 2,
                    vid : this.content.videos[0].vid,
                    playauth : '',
                    cover: this.content.videos[0].imageUrl,
                    accessKeyId: res.data.result.accessKeyId,
                    securityToken: res.data.result.securityToken,
                    accessKeySecret: res.data.result.accessKeySecret
                }, function(player){
                    console.log('播放器创建好了。')
                })
            })
            
        }
    }
}
</script>
<style>
    .learn-more.ivu-btn-text:focus{
        box-shadow: none;
    }
    .lg-preview-nav-arrow{
        border-top: 2px solid #333 !important;
        border-left: 2px solid #333 !important;
    }

    .feeder-comments .dp-border-show {
        border-left: 1px solid #FDDB00;
        border-right: 0;
        border-top: 0;
        border-bottom: 0;
    }
</style>
<style scoped>
    #feed{
        padding: 0 0 .3rem;
        box-sizing: border-box;
        font-size: 13px;
    }
    .feed-doc {
        padding-bottom: .3rem;
    }
    .feeder-info,
    .feed-messagebord-type,
    .feed-messagebord,
    .feed-messagebord-list,
    .feeder-title,
    .feeder-comments{
        padding: 0 0.3rem;
    }
    .feeder-title {
        font-size: 15px;
        margin-bottom: .2rem;
        font-weight: bold;
    }
    .summary{
        text-align: justify;
    }
    .feeder-cover{
        padding: .3rem .3rem 0;
    }
    .feeder-cover>img{
        width: 1.64rem;
        height: .64rem;
    }
    .feeder-img{
        width: 100%;
        flex-wrap: wrap;
        margin-bottom: 0.2rem;
    }
    .hide-over {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 9;
        background:linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0));
    }
    .messager-info > img{
        width: .48rem;
        height: .48rem;
        border-radius: 100%;
        margin-right: 0.1rem;
    }
    .feeder-info, .prism-player{
        margin: .2rem 0;
    }
    .feed-messagebord{
        height: .8rem;
        border-bottom: 1px solid #eee;
    }
    .feed-messagebord-type {
        height: 0.8rem;
        color: #444;
        font-weight: bold;
    }
    .feed-messagebord-left {
        font-size: 15px;
        color: #444;
        font-weight: 600;
    }
    .messager-comment {
        color: #444;
        font-weight: 600;
    }
    .feed-messagebord-list-cell{
        border-bottom: 1px solid #eee;
        padding: .2rem 0;
    }
    .messager-content{
        margin: .2rem 0;
    }
    .messager-time{
        font-size: 12px;
        color: #999;
    }
    .feeder-img-list {
        position:relative; 
        overflow:hidden;
    }
    .feeder-img-list:nth-child(3n){
        margin-right: 0 !important;
    }
    .feed-cover-list {
        width: 100%;
        display: block;
    }
    .feeder-cover-list{
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        display: block;
    }
    .gif {
        position:absolute; 
        right: 0; 
        bottom: 0;
        font-size: 12px;
    }
    .feeder-comments {
        margin-top: .2rem;
    }
    .feeder-comments-cell {
        box-sizing: border-box;
        background-color: #f4f4f4;
        margin-bottom: .2rem;
        padding: .2rem;
    }
    .feeder-comment-info {
        margin-top: .1rem;
        line-height: 1
    }
    .feeder-comment-info>i {
        margin-right: .1rem;
        width: 16px;
        height: 16px;
        border-radius: 100%;
    }
    .messager-comments {
        padding: .1rem .2rem;
        background-color: #f4f4f4;
        margin-bottom: .2rem;
    }
    .messager-comments-cell {
        box-sizing: border-box;
        padding: .05rem 0;
    }
    .not-exist {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .feeder-comment-img {
        max-width: 2.4rem;
    }
</style>
