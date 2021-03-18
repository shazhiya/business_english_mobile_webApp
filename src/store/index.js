import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import course_base from "./course/course.base";
import optional from "@/store/optional";

import security from './security'
import post from './util'
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signUp: false,
        actionSheet:{
            show: false
        },
        myself:{},
        allSecurity: []
    },
    modules: {
        user, security, course_base, optional
    },
    mutations: {
        changeSignUp(state, flag) {
            state.signUp = flag
        },
        updateActionSheet(state,payload){
            state.actionSheet = payload
        },
        updateMyself(state,payload){
            state.myself = payload
        },
        updateALlSecurity(state,payload){
            state.allSecurity = payload
        }
    },
    actions: {
        login({commit}, data) {
            return post('login', data, res => {
                if (res.data !== 'success') return false
                commit('changeSignUp', true)
                return true
            }, true)
        },
        register(store, data) {
            return post('register', data, res => {
                return res.data
            })
        },
        loadMyself({commit,state}){
            return post('user/getProfileByUsername', state.myself, res => {
                commit('updateMyself', res.data)
            })
        },
        loadALlSecurity({commit}){
            return post('security/allSecurity',{},res=>{
                commit('updateALlSecurity',res.data)
            })
        }
    },
    getters:{
        myself:(state)=>{
            return state.myself
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]

})
