import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import course_base from "./course/course.base";
import optional from "@/store/optional";

import security from './security'
import post from './util'
import createPersistedState from "vuex-persistedstate"
import {Resolver} from "fastjson_ref_resolver";
import resolvedPost from "@/store/ResovePost";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signUp: false,
        actionSheet:{
            show: false
        },
        myself:{},
        allSecurity: [],
        messages:[],
        contactors:[]
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
        },
        loadMessage(state,payload){
            state.messages = payload
        },
        updateContactors(state,payload){
            state.contactors = payload
        },
        reset(state){
            // todo
            state.signUp=false
            state = {}
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
        },
        loadMessages({commit},options){
            return post('message/load',options||{status:'未读'})
                .then(res=>{
                    commit('loadMessage',JSON.stringify(res.data))
                    return new Resolver(res.data).resolve()
                })
        },
        loadContactors({commit,state}){
            post('message/contactors',{self:state.myself})
                .then(res=>{
                    commit('updateContactors',JSON.stringify(res.data))
                    return res.data
                })
        }
    },
    getters:{
        myself:(state)=>{
            return state.myself
        },
        messages:state =>new Resolver(JSON.parse(state.messages)).resolve(),
        contactors: state => new Resolver(JSON.parse(state.contactors)).resolve()
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]

})
