import { requestGoodsList, requestGoodsAll } from '../../util/request'

const state = {
    //列表数据
    list: [],
    //一页的数量
    size: 2,
    //数据总数量
    total: 0,
    //当前页码
    page: 1
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr
    },
    //修改数据总数量
    changeTotal(state, num) {
        state.total = num
    },
    //修改当前页码
    changePage(state, page) {
        state.page = page
    },
}

const actions = {
    //获取列表数据
    requestList(context) {
        const params = {
            page: context.state.page,
            size: context.state.size
        }
        requestGoodsList(params).then((res) => {
            // console.log(res)
            //判断如果当前页没有数据，且当前页数大于1，就页数减1再重新渲染数据
            if (res.data.list.length == 0 && context.state.page > 1) {
                //commit和dispatch都是调用引号里的函数，后面进行传参，区别就是commit是同步操作，dispatch是异步操作
                context.commit('changePage', context.state.page - 1)
                context.dispatch('requestList')
                return
            }
            context.commit('changeList', res.data.list)
        })
    },
    //获取总数量
    requestTotal(context) {
        requestGoodsAll().then((res) => {
            context.commit('changeTotal', res.data.list[0].total)
        })
    },
    //修改页码
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
    namespaced: true
}