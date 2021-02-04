import post from '../util'

export default {
    namespaced: true,
    state: {
        search: {}
    },
    mutations: {
        pushSearchResult(state, payload) {
            if (!payload) return state.search = {};
            if (!state.search[payload.type]) {
                state.search[payload.type] = payload.data
                return
            }
            if (payload.isUnshift) {
                state.search[payload.type].unshift(...payload.data)
            } else {
                state.search[payload.type].push(...payload.data)
            }
        }
    },
    actions: {
        search({commit}, {index, size, condition, type, isUnshift}) {
            return post(`curriculum/search/${type}/${index}/${size}`, condition, res => {
                commit('pushSearchResult', {data: res.data, type, isUnshift})
                return res.data.length
            })
        }
    },
    getters: {
        renderList: state => type => state.search[type].reduce((rl, currItem, index) => index % 2 == 1 ? rl : rl.push(index + 1 == state.search[type].length ? [state.search[type][index]] : [state.search[type][index], state.search[type][index + 1]]) ? rl : rl, []),
        coursesSize: state => type => state.search[type].length
    }
}