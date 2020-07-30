// sessionStorage存储值方法：sessionStorage.setItem('值')
// sessionStorage取值方法：sessionStorage.getItem('值')

export const state = {
    //用户刷新页面user就会变成null，所以直接判断user的值来判断用户是否刷新，如果用户刷新，user就取出sessionStorage存储的用户信息
    //注意：取出来要转换会原来的类型，因为存的时候转成了字符串类型
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}

export const mutations = {
    change(state, user) {
        state.user = user
        //vuex有个问题就是刷新也页面后，存储的值(即用户信息)就会没有，这里就会造成用户登陆了后如果刷新页面就会弹出到登录页
        //所以我们用一个刷新页面不会消失的东西(即sessionStorage)，来存储用户信息，实现刷新不会清空用户信息
        if (user) {
            //注意：sessionStorage存进去的数据会直接变成字符串，导致数据会发生变化，所以要先转成字符串在存进去
            sessionStorage.setItem('user', JSON.stringify(state.user))
        } else {
            sessionStorage.removeItem('user')
        }
    }
}

export const actions = {
    changeUser(context, obj) {
        context.commit('change', obj)
    }
}

export const getters = {
    user(state) {
        return state.user
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