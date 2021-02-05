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
        }
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
        }
    },
    actions: {
        login({commit}, data) {
            return post('login', data, res => {
                if (res.data != 'success') return false
                commit('changeSignUp', true)
                commit('user/updateUserName', data, {root: true})
                return true
            }, true)
        },
        register(store, data) {
            return post('register', data, res => {
                return res.data
            })
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]
})
