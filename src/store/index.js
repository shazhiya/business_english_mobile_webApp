import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import clazz from "./clazz";
import optional from "@/store/optional";

import security from './security'
import post from './util'
import createPersistedState from "vuex-persistedstate"
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
        contactors:[],
        sessions:[]
    },
    modules: {
        user, security, clazz, optional
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
            return resolvedPost('message/load',options||{status:'未读'})
                .then(res=>{
                    res.forEach(mess=>{
                        mess.sendUser = {
                            userId: mess.sendUser.userId,
                            userName: mess.sendUser.userName,
                            userHeadicon: mess.sendUser.userHeadicon
                        }
                        mess.targetUser = {
                            userId: mess.targetUser.userId,
                            userName: mess.targetUser.userName,
                            userHeadicon: mess.targetUser.userHeadicon
                        }
                    })
                    commit('loadMessage',res)
                    return res
                })
        },
        loadContactors({commit,state}){
            resolvedPost('message/contactors',{self:state.myself})
                .then(res=>{
                    res.forEach(contact=>{
                        contact.contactor = {
                            userId: contact.contactor.userId,
                            userName: contact.contactor.userName,
                            userHeadicon: contact.contactor.userHeadicon
                        }
                        contact.self = null
                    })
                    commit('updateContactors',res)
                    return res
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
                map[state.myself.userId]?.splice(map[state.myself.userId].indexOf(payload),1)
            commit('updateSessions',map[state.myself.userId])
            window.localStorage.setItem('sessions',JSON.stringify(map))
        }
    },
    getters:{
        myself:(state)=>{
            return state.myself
        },
        messages:state =>{
            return state.messages
        },
        contactors: state => state.contactors,
        getSessions(state){
            return state.sessions||[]
        }
    },
    plugins: [createPersistedState({storage: window.sessionStorage})]

})
