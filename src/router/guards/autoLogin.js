import store from "@/store";
import {Notify} from 'vant'
export default function (to, from, next) {
    if (store.state.signUp) return false
    if (to.name === 'register' || to.name === 'resetPassword'||to.name === 'login'|| to.path===''||to.path==='/') return false
    if (window.localStorage.getItem('remember')) {
        return store
            .dispatch('login', JSON.parse(window.localStorage.getItem('userAccount')))
            .then(res => {
                if (res){
                    Notify({
                        message: '自动登录成功',
                        type: 'success'
                    })
                    next()
                    return true
                }else {
                    Notify({
                        message: '自动登录失败',
                        type: 'danger'
                    })
                    return false
                }
            }).catch(err => {
                Notify({
                    message: '网络错误',
                    type: 'danger'
                })
                throw err
            })
    }
    return false
}