import store from './store/index'

export default function(funcName){
    return store.state.user.security.securities.some(se=>se == funcName)
}