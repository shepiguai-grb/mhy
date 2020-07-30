//引入角色管理数据库列表
import { requestJsList } from '../../util/request'

//state是装数据的集合
const state = {
    //列表数据
    list: []
}

//mutations是用来修改state里的数据，是同步操作
const mutations = {
    //修该list数据,state是当前仓库里数据的集合(名字随意取，第一个参数都是)
    changeList(state, arr) {
        state.list = arr
    }
}

//actions用来触发mutations，一般对后端数据有操作，都通过这个来对接组件来操作，是异步操作
const actions = {
    //context是当前仓库本身(名字随意取)，不能直接做修改，可以触发mutations来修改
    //一般对数据进行增删改操作后，就调用vuex向后端发起请求操作好的数据进行渲染
    //简单来说就是向后端请求数据的时候就通过vuex请求
    requestList(context) {
        requestJsList().then((res) => {
            context.commit('changeList', res.data.list)
        })
    }
}

//让前端或者后端获取数据都通过getters获取
// 比如要修改某个数据名字时该数据用量还大要是每一个都改就很慢，这时候就只需要统一改这里
const getters = {
    list(state) {
        return state.list
    }
}

//vuex在main里引入后可以直接在任何组件里，用this.$store获取到仓库
//import { mapGetters, mapActions } from 'vuex'  mapGetters和mapActions这两个属性，直接就是对接的getters和actions获取数据的

export default {
    state,
    mutations,
    actions,
    getters,
    // namespaced: true有这个属性能让我们能在该模块下取到想要的值，默认是false
    namespaced: true
}