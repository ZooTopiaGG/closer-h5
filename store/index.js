import Coms from '~/assets/js/utils.js'
export const state = () => ({
    GET_MESSAGE_STATE: false
})

export const mutations = {
    getUserAgent (state) {
        // console.log(Coms.isCloserApp())
        if (Coms.isCloserApp()) {
            state.GET_MESSAGE_STATE = false
        } else {
            state.GET_MESSAGE_STATE = true
        }
    }
}
