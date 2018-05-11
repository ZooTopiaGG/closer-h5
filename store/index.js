export const state = () => ({
    GET_MESSAGE_STATE: false,
    GET_APP_TOKEN: '',
    content: '',
    res: {},
    messagelist: {},
    postType: '',
    discuss: {},
    options: false,
    exist: true,
    group_res: [],
    group_info: {},
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
