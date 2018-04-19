export const state = () => ({
    GET_MESSAGE_STATE: false
})

export const mutations = {
    GET_USER_AGENT (state, para) {
        // 通过中间件。判断在路由之前执行
        let nvg = para.toLowerCase();
        let _result = nvg.indexOf('closer-ios') > -1 || nvg.indexOf('closer-android') > -1;
        state.GET_MESSAGE_STATE = !_result
    }
}
