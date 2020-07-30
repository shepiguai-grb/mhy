import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import { state, mutations, getters } from "./mutations"
import actions from "./actions"
import menu from './modules/menu'
import juese from './modules/juese'
import guanliyuan from './modules/guanliyuan'
import cate from './modules/cate'
import spec from './modules/spec'
import goods from './modules/goods'
import vip from "./modules/vip";
import banner from "./modules/banner";
import ms from "./modules/ms";
import login from './modules/login'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        menu,
        juese,
        guanliyuan,
        cate,
        spec,
        goods,
        vip,
        banner,
        ms,
        login
    }
})