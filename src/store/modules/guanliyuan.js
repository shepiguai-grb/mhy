import { requestGlyList, requestGlyAll } from '../../util/request'

const state = {
    //列表数据
    list: [],
    //一页的数量
    size: 2,
    //数据总量
    total: 0,
    //当前页码
    page: 1
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr
    },
    //修改总数
    changeTotal(state, num) {
        state.total = num
    },
    //修改当前页码
    changePage(state, page) {
        state.page = page
    }
}

const actions = {
    //获取列表数据内容
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestGlyList(params).then((res) => {
            //如果没有取到数据
            // if (res.data.list.length == 0 && context.state.page > 1) {
            //     context.commit("changePage", context.state.page - 1);
            //     context.dispatch("requestList")
            //     return;
            // }
            context.commit('changeList', res.data.list)
        })
    },
    //获取列表数据总数量
    requestTotal(context) {
        requestGlyAll().then((res) => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    //页面新修改页码
    changePage(context, page) {
        context.commit('changePage', page)
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    // namespaced: true有这个属性能让我们能在该模块下取到想要的值，默认是false
    namespaced: true
}