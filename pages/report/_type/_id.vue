<template>
    <div id="report">
        <div class="report">
            <div>{{ res.token }}</div>
            <div class="title">
                举报 
                <span v-if="$route.params.type==='f'">
                    <span v-if="res.data.double_latitude !== -999">{{ res.data.className }}</span>
                    <span v-else>{{ res.data.communityName }}</span> 
                    的帖子：
                    <span v-if="res.data.title" style="color:#94928E">{{ res.data.title }}</span>
                </span>
                <span v-else>
                    <span>{{ res.data.name }}</span>
                    的栏目：
                </span>
            </div>
            <RadioGroup v-model="reportinfo" @on-change="reportChange" class="radio-group flex">
                <Radio v-for="(item, index) in res.list" :label="item.reportTypeId" :key="index">
                    <span>{{ item.reportContents }}</span>
                </Radio>
                <!-- <Radio label="垃圾营销">
                    <span>垃圾营销</span>
                </Radio>
                <Radio label="不实信息">
                    <span>不实信息</span>
                </Radio>
                <Radio label="有害信息">
                    <span>有害信息</span>
                </Radio>
                <Radio label="违法信息">
                    <span>违法信息</span>
                </Radio>
                <Radio label="淫秽色情">
                    <span>淫秽色情</span>
                </Radio>
                <Radio label="人身攻击我">
                    <span>人身攻击我</span>
                </Radio>
                <Radio label="抄袭我的内容">
                    <span>抄袭我的内容</span>
                </Radio>
                <Radio label="违规有奖活动">
                    <span>违规有奖活动</span>
                </Radio> -->
            </RadioGroup>
            <div>
                <textarea name="reportcon" rows="4" class="reportcon" v-model="reportcon" placeholder="如果你有更多信息，会帮助我们加速处理哦"></textarea>
            </div>
        </div>
        <div class="btn">
            <Button type="primary" :loading="loading===2" @click="repo" :disabled="disabled" long>
                <span v-if="loading===1">举 报</span>
                <span v-else-if="loading===2">正在举报</span>
                <span v-else>已举报，受理中</span>
            </Button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
    name: 'report-id',
    // 设置title
    head() {
        return {
            title: '举报'
        }
    },
    async asyncData ({ params, error, app, store }) {
        try {
            // let head = await app.$axios.$head()
            // 举报栏目
            if (params.type === 'c') {
                let para = {
                    communityid: params.id
                }
                let para1 = {
                    reportType: "community"
                }
                let [ list, data ] = await Promise.all([
                    app.$axios.$post(`${api.command.reportType}`, para1),
                    app.$axios.$post(`${api.command.show}`, para)
                ])
                // console.log(';data ===', data)
                if (list.code === 0) {
                    // console.log(';list===', list)
                } else {
                    error({ message: `错误代码:${list.code}, ${list.result}` })
                }
                return { 
                    res: {
                        data: data.result,
                        list: list.result.data,
                        token: store.state.GET_APP_TOKEN || '不存在'
                    }
                }
            }else {
                // 举报贴子
                let para = {
                    subjectid: params.id
                }
                let para1 = {
                    reportType: "subject"
                }
                let [ list, data ] = await Promise.all([
                    app.$axios.$post(`${api.command.reportType}`, para1),
                    app.$axios.$post(`${api.command.show}`, para)
                ])
                // console.log(';data ===', data)
                if (list.code === 0) {
                    // console.log(';list===', list)
                } else {
                    error({ message: `错误代码:${list.code}, ${list.result}` })
                }
                return { 
                    res: {
                        data: data.result,
                        list: list.result.data,
                        token: store.state.GET_APP_TOKEN || '不存在'
                    }
                }
            }
        } catch(err) {
            error({ message: `${err}` })
        }
    },    
    computed: {
        content() {
           return JSON.parse(this.res.content)
        }
    },
    data() {
        return {
            loading: 1, // 按钮执行状态
            disabled: false, // 按钮可用状态
            // res: {},
            reportinfo: '',
            reportcon: ''
        }
    },
    methods: {
        // 点击单选按钮时变化
        reportChange(item) {
            console.log(item)
            // 监听按钮状态
            this.disabled = false;
            this.loading = 1;
        },
        // 举报
        async repo() {
            let self = this;
            self.$loadingbar.start();
            if (!self.reportinfo) {
                self.$loadingbar.error();
                self.$message.warning('请选择举报信息！');
                return
            }
            self.loading = 2;
            try{
                let para = {
                    reportType: self.$route.params.type === 'f' ? 'subject' : 'community',
                    reportCode: self.reportinfo,
                    objectId: self.$route.params.id,
                    comments: ''
                }
                let data = await self.$axios.$post(`${api.command.report}`, para)
                if (data.code === 0) {
                    self.disabled = true;
                    self.loading = 3;
                    self.$loadingbar.finish()
                }else {
                    self.$loadingbar.error();
                    self.$message.error(data.result)
                }
            } catch(err) {
                self.$message.error(err)
                self.$loadingbar.error();
            }
        }
    },
    mounted() {
        console.log(this.res)
    }
}
</script>
<style type="text/css">
    .dp-text-color{
        color: #FDDB00;
    }
    #report .ivu-radio-group {
        display: flex;
        flex-wrap: wrap;
    }
    #report .ivu-radio-wrapper{
        margin-right: 0;
        width: 50%;
        font-size: 13px;
        margin-bottom: .3rem;
    }
</style>
<style scoped="scoped">
    #report {
        font-size: 13px;
        margin-top: .8rem;
    }
    .report {
        padding: 0.2rem;
        box-sizing: border-box;
        background: #fff;
    }
    .title{
        margin-bottom: .4rem
    }
    .desc {
        background: #f4f4f4;
        padding: 0.2rem 0.1rem;
        margin: 0 0 0.6rem;
    }
    /*.imgbox {
        width: 2.0rem;
        height: 1.125rem;
        margin-right: 0.1rem;
        box-sizing: border-box;
    }
    .imgbox>img{
        width: 100%;
        height: 100%;
    }*/
    .btn {
        padding:  0.2rem;
        margin-top: .3rem;
    }
    .reportcon {
        vertical-align: bottom;
        background: #f4f4f4;
        display: inline-block;
        width: 100%;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    }
    .reportcon:focus{
        outline: 0;
        box-shadow: 0 0 0 2px rgba(253,219,0,.2);
    }
    .reportcon:focus, .reportcon:hover {
        border-color: #FDDB00;
    }
</style>