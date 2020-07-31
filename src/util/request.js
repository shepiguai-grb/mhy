import axios from "axios"
import qs from "qs"  //一般添加数据，要用来转换成后端需要的数据类型
import store from '../store/index'
import { warningAlert } from './alert'
import router from '../router/index'

//请求拦截
axios.interceptors.request.use((config) => {
    // console.log(config) 
    //除了登录请求，其他的每次请求都得给config的headers设置authorization属性，值为token
    //这个值后端用来验证用户的每次操作，如果不设置请求头，那除了登录请求接口其他的接口都无法访问
    if (config.url != baseUrl + '/api/userlogin') {
        config.headers.authorization = store.state.login.user.token
    }
    return config
})

//响应拦截
axios.interceptors.response.use((res) => {
    //判断登录是否过期，即是否会掉线
    if (res.data.msg == '登录已过期或访问权限受限') {
        warningAlert(res.data.msg)
        router.push('/login')
    }
    return res;
})


const baseUrl = '/api'
// const baseUrl = ''


//登录请求
export const requestLogin = ((params) => {
    return axios({
        url: baseUrl + '/api/userlogin',
        method: 'post',
        data: qs.stringify(params)
    })
})

//菜单***************************************************************************
//添加请求
export const requestadd = (params) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: 'post',
        data: qs.stringify(params)
    })
}

//菜单列表
export const requestMenuList = (params) => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: params
    })
}

//修改请求
export const requestedit = (params) => {
    return axios({
        url: baseUrl + '/api/menuedit',
        method: 'post',
        data: qs.stringify(params)
    })
}

//获取指定一条数据
export const requestDetail = (params) => {
    return axios({
        url: baseUrl + '/api/menuinfo',
        method: 'get',
        params: params
    })

}

//删除请求
export const requestdel = (params) => {
    return axios({
        url: baseUrl + '/api/menudelete',
        method: 'post',
        data: qs.stringify(params)
    })
}


//角色*******************************************************************************

//添加请求
export const requestJsAdd = (params) => {
    return axios({
        url: baseUrl + '/api/roleadd',
        method: 'post',
        data: qs.stringify(params)
    })
}
//角色列表
export const requestJsList = () => {
    return axios({
        url: baseUrl + '/api/rolelist',
        method: 'get'
    })
}

//获取指定一条角色信息
export const requestJsDetail = (params) => {
    return axios({
        url: baseUrl + '/api/roleinfo',
        method: 'get',
        params: params
    })
}

//修改请求
export const requestJsEdit = (params) => {
    return axios({
        url: baseUrl + '/api/roleedit',
        method: 'post',
        data: params
    })
}

//删除请求
export const requestJsDel = (params) => {
    return axios({
        url: baseUrl + '/api/roledelete',
        method: 'post',
        data: params
    })
}


//管理员********************************************************************************

//添加请求
export const requestGlyAdd = ((params) => {
    return axios({
        url: baseUrl + '/api/useradd',
        method: 'post',
        data: qs.stringify(params)
    })
})

//管理员总数
export const requestGlyAll = (() => {
    return axios({
        url: baseUrl + '/api/usercount',
        method: 'get'
    })
})

//管理员列表
export const requestGlyList = ((params) => {
    return axios({
        url: baseUrl + '/api/userlist',
        method: 'get',
        params: params
    })
})

//获取一条管理员信息
export const requestGlyDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/userinfo',
        method: 'get',
        params: params
    })
})

//管理员修改
export const requestGlyEdit = ((params) => {
    return axios({
        url: baseUrl + '/api/useredit',
        method: 'post',
        data: qs.stringify(params)
    })
})

//管理员删除
export const requestGlyDel = ((params) => {
    return axios({
        url: baseUrl + '/api/userdelete',
        method: 'post',
        data: qs.stringify(params)
    })
})




//商品分类*****************************************************************************
//添加分类
export const requestCateAdd = ((params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/cateadd',
        method: 'post',
        data: formData
    })
})

//分类列表
export const requestCateList = ((params) => {
    return axios({
        url: baseUrl + '/api/catelist',
        method: 'get',
        params: params
    })
})

//获取一条商品信息
export const requestCateDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/cateinfo',
        method: 'get',
        params: params
    })
})

//分类修改
export const requestCateEdit = ((params) => {
    var formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/cateedit',
        method: 'post',
        data: formData
    })
})

//分类删除
export const requestCateDel = ((params) => {
    return axios({
        url: baseUrl + '/api/catedelete',
        method: 'post',
        data: qs.stringify(params)
    })
})

//商品规格*******************************************************************
//规格添加
export const requestSpecAdd = ((params) => {
    return axios({
        url: baseUrl + '/api/specsadd',
        method: 'post',
        data: qs.stringify(params)
    })
})

//规格总数(用于计算分页)
export const requestSpecAll = (() => {
    return axios({
        url: baseUrl + '/api/specscount',
        method: 'get'
    })
})

//规格列表数据
export const requestSpecList = ((params) => {
    return axios({
        url: baseUrl + '/api/specslist',
        method: 'get',
        params: params
    })
})

//规格一条数据
export const requestSpecDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/specsinfo',
        method: 'get',
        params: params
    })
})

//规格修改
export const requestSpecEdit = ((params) => {
    return axios({
        url: baseUrl + '/api/specsedit',
        method: 'post',
        data: qs.stringify(params)
    })
})

//规格删除
export const requestSpecDel = ((params) => {
    return axios({
        url: baseUrl + '/api/specsdelete',
        method: 'post',
        data: qs.stringify(params)
    })
})

//商品管理******************************************************************************
//商品添加
export const requestGoodsAdd = ((params) => {
    //添加的数据里有文件(例如图片、音频...)就得通过formdata处理
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/goodsadd',
        method: 'post',
        data: formData
    })
})

//商品总数(用于分页)
export const requestGoodsAll = (() => {
    return axios({
        url: baseUrl + '/api/goodscount',
        method: 'get'
    })
})

//商品列表
export const requestGoodsList = ((params) => {
    return axios({
        url: baseUrl + '/api/goodslist',
        method: 'get',
        params: params
    })
})

//获取一条商品信息
export const requestGoodsDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/goodsinfo',
        method: 'get',
        params: params
    })
})

//商品修改
export const requestGoodsEdit = ((params) => {
    //修改时也可能会改图片文件所以也得要formdata
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/goodsedit',
        method: 'post',
        data: formData
    })
})

//商品删除
export const requestGoodsDel = ((params) => {
    return axios({
        url: baseUrl + '/api/goodsdelete',
        method: 'post',
        data: qs.stringify(params)
    })
})

//会员管理******************************************************************************
//会员列表
export const requestVipList = ((params) => {
    return axios({
        url: baseUrl + '/api/memberlist',
        method: 'get',
        params: params
    })
})

//获取一条会员信息
export const requestVipDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/memberinfo',
        method: 'get',
        params: params
    })
})

//会员修改
export const requestVipEdit = ((params) => {
    return axios({
        url: baseUrl + '/api/memberedit',
        method: 'post',
        data: params
    })
})

//轮播图管理**************************************************************************************
//添加
export const requestLbtAdd = ((params) => {
    //添加的数据里有文件(例如图片、音频...)就得通过formdata处理
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/banneradd',
        method: 'post',
        data: formData
    })
})

//轮播图列表
export const requestLbtList = ((params) => {
    return axios({
        url: baseUrl + '/api/bannerlist',
        method: 'get',
        params: params
    })
})

//获取一条数据
export const requestLbtDetail = ((params) => {
    //添加的数据里有文件(例如图片、音频...)就得通过formdata处理
    // let formData = new FormData()
    // for (let i in params) {
    //     formData.append(i, params[i])
    // }
    return axios({
        url: baseUrl + '/api/bannerinfo',
        method: 'get',
        params: params
    })
})

//修改
export const requestLbtEdit = ((params) => {
    //添加的数据里有文件(例如图片、音频...)就得通过formdata处理
    let formData = new FormData()
    for (let i in params) {
        formData.append(i, params[i])
    }
    return axios({
        url: baseUrl + '/api/banneredit',
        method: 'post',
        data: formData
    })
})
//删除
export const requestLbtDel = ((params) => {
    return axios({
        url: baseUrl + '/api/bannerdelete',
        method: 'post',
        data: params
    })
})

//秒杀活动***********************************************************************************
//添加
export const requestMsAdd = ((params) => {
    return axios({
        url: baseUrl + '/api/seckadd',
        method: 'post',
        data: params
    })
})

//列表数据
export const requestMsList = ((params) => {
    return axios({
        url: baseUrl + '/api/secklist',
        method: 'get',
        params: params
    })
})

//获取一条秒杀数据
export const requestMsDetail = ((params) => {
    return axios({
        url: baseUrl + '/api/seckinfo',
        method: 'get',
        params: params
    })
})

//修改
export const requestMsEdit = ((params) => {
    return axios({
        url: baseUrl + '/api/seckedit',
        method: 'post',
        data: params
    })
})

//删除
export const requestMsDel = ((params) => {
    return axios({
        url: baseUrl + '/api/seckdelete',
        method: 'post',
        data: params
    })
})