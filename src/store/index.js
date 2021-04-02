import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import course_base from "./course/course.base";
import optional from "@/store/optional";

import security from './security'
import post from './util'
import createPersistedState from "vuex-persistedstate"
import {Resolver} from "fastjson_ref_resolver";


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
        contactors:[],
        sessions:[]
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
        },
        updateSessions(state,payload){
            state.sessions = payload
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
        },
        pushSession({state,commit},payload){
            let map = JSON.parse(window.localStorage.getItem('sessions'))
            if (!map) {
                map = {}
            }
            if (!map[state.myself.userId]){
                map[state.myself.userId] = []
            }
            if(!map[state.myself.userId].some(opposite=>opposite.userName===payload.userName))
                map[state.myself.userId].push(payload)
            commit('updateSessions',map[state.myself.userId])
            window.localStorage.setItem('sessions',JSON.stringify(map))
        },
        popSession({state,commit},payload){
            let map = JSON.parse(window.localStorage.getItem('sessions'))
            if (payload)
                map[state.myself.userId].splice(map[state.myself.userId].indexOf(payload),1)
            commit('updateSessions',map[state.myself.userId])
            window.localStorage.setItem('sessions',JSON.stringify(map))
        }
    },
    getters:{
        myself:(state)=>{
            return state.myself
        },
        messages:state =>{
            if (state.messages.length===0) return state.messages
            return new Resolver(JSON.parse(state.messages)).resolve()
        },
        contactors: state => new Resolver(JSON.parse(state.contactors)).resolve(),
        getSessions(state){
            return state.sessions||[]
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]

})
