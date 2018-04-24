<template>
    <div id="report">
        <div class="report">
            <div class="title">
                举报 
                <span v-if="res.double_latitude !== -999">{{ res.className }}</span>
                <span v-else>{{ res.communityName }}</span> 
                的贴子： 
                <span v-if="res.title" style="color:#94928E">{{ res.title }}</span>
            </div>
            <!-- <div class="desc flex flex-align-start" v-if="res.title">
                <div>
                    <span class="dp-text-color" v-if="res.communityName">{{ res.communityName }}</span>：
                    <span>{{ res.title }}</span>
                </div>
            </div> -->
            <RadioGroup v-model="reportinfo" @on-change="reportChange" class="radio-group flex">
                <Radio label="垃圾营销">
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
                </Radio>
            </RadioGroup>
            <div>
                <textarea name="reportcon" rows="4" class="reportcon" v-model="reportcon" placeholder="如果你有更多信息，会帮助我们加速处理哦"></textarea>
            </div>
        </div>
        <div class="btn">
            <Button type="primary" :loading="loading===2" @click="repo" :disabled="disabled" long>
                <span v-if="loading===1">举报</span>
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
    async asyncData ({ params }) {
        let para = {
            subjectid: params.id
        }
        let { data } = await axios.post(
            `http://api-sandbox.tiejin.cn/command/closer_subject.show`, 
            qs.stringify(para))
        return { res: data.result }
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
        reportChange() {
            // 监听按钮状态
            this.disabled = false;
            this.loading = 1;
        },
        // 举报
        repo() {
            let self = this;
            self.$loadingbar.start();
            if (!self.reportinfo) {
                self.$loadingbar.error();
                self.$message.warning('请选择举报信息！');
                return
            }
            self.loading = 2;
            setTimeout(() => {
                self.disabled = true;
                self.loading = 3;
                self.$loadingbar.finish()
            }, 3000)
        }
    },
    mounted() {}
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