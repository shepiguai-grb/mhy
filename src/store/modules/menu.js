//引入菜单数据库列表
import { requestMenuList } from "../../util/request"
const state = {
    //数据库列表数据
    list: []
}

const mutations = {
    //修改列表
    changeList(state, arr) {
        state.list = arr
    }
}

const actions = {
    requestList(context) {
        requestMenuList({ istree: true }).then((res) => {
            context.commit('changeList', res.data.list)
        })
    }
}

const getters = {
    list(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    // namespaced: true这个属性能让我么能在该模块下取到想要的值，默认是false
    namespaced: true
}