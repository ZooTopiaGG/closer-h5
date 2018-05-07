export const state = () => ({
    GET_MESSAGE_STATE: false,
    GET_APP_TOKEN: '',
    content: '',
    res: {},
    messagelist: {},
    postType: '',
    discuss: {},
    options: {},
    exist: true,
    group_res: [],
    group_info: {}
})

export const mutations = {
    GET_USER_AGENT (state, para) {
        // 通过中间件。判断在路由之前执行
        let nvg = para.toLowerCase();
        let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1;
        state.GET_MESSAGE_STATE = !_result
    },
    GET_APP_TOKEN (state, para) {
        state.GET_APP_TOKEN = para
    },
    SET_CONTENT (state, para) {
        state.content = para
    },
    SET_RES (state, para) {
        state.res = para
    },
    SET_MESSAGE (state, para) {
        state.messagelist = para
    },
    SET_POSTTYPE (state, para) {
        state.postType = para
    },
    SET_DISSCUSS (state, para) {
        state.discuss = para
    },
    SET_OPTIONS (state, para) {
        state.options = para
    },
    GET_EXIST_STATUS (state, para) {
        state.exist = para
    },
    SET_GROUP_RES (state, para) {
        state.group_res = para
    },
    SET_GROUP_INFO (state, para) {
        state.group_info = para
    }
}
export const actions = {
    // async getFeedDetails({ commit }, { subjectid }) {
    //     try {
    //         let para = {
    //             subjectid: subjectid
    //         }
    //         let para1 = {
    //             pagesize: 5,
    //             pagenum: 1,
    //             subjectid: subjectid
    //         }
    //         let [res, messagelist] = await Promise.all([
    //             this.$axios.$post(`${api.command.show}`, para),
    //             this.$axios.$post(`${api.command.comments}`, para1)
    //         ])
    //         console.log('res???==', res)
    //         console.log('messagelist?????===', messagelist)
    //         // 获取迷药
    //         if (res.result.content) {
    //             var content = JSON.parse(res.result.content)
    //             if (content.discuss) {
    //                 var discuss = content.discuss
    //             }
    //             if (res.result.int_type === 2) {
    //                 var options = {
    //                     str: content.html,
    //                     flg: 'class="flex flex-pack-center" data-pimg="has-editor-img"',
    //                     splitStr1: 'p', // 分割img父级标签 没有则 不填
    //                 };
    //                 // 在前端处理
    //                 // let htmls = self.$com.regexImg(options)
    //             }
    //         }
    //         // 投稿类型
    //         var postType = ''
    //         switch (res.result.int_post_limit) {
    //             case 0: postType = '图片';
    //             break;
    //             case 1: postType = '视频';
    //             break;
    //             case 2: postType = '长图文';
    //             break;
    //             case 3: postType = '全部';
    //             break;
    //             default: postType = '全部'
    //         }
    //         console.log(';ressssss==sdada')
    //         // 返回在渲染页面之前得结果
    //         commit('SET_CONTENT', content)
    //         commit('SET_RES', res.result)
    //         commit('SET_MESSAGE', messagelist.result)
    //         commit('SET_POSTTYPE', postType)
    //         commit('SET_DISSCUSS', discuss)
    //         commit('SET_OPTIONS', options)
    //         // return {
    //         //     res: res.result,
    //         //     content: content,
    //         //     messagelist: messagelist.result,
    //         //     options: options,
    //         //     postType: postType,
    //         //     discuss: discuss
    //         // }
    //     } catch(err) {
    //         throw err
    //     }
    // }
}
