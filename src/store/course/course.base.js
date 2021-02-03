import post from '../util'
export default {
    namespaced: true,
    state: {
        search: {}
    },
    mutations: {
        pullSearchResult(state, payload) {
            if (!state.search[payload.type]) {
                state.search[payload.type] = payload.data
            }
            if (payload.isUnshift) {
                state.search[payload.type].unshift(...payload.data)
            } else {
                state.search[payload.type].push(...payload.data)
            }
        }
    },
    actions: {
        search({ commit }, { index, size, condition, type, isUnshift }) {
            return post(`curriculum/search/${index}/${size}`, condition, res => {
                console.log(res.data);
                commit('pullSearchResult', { data: res.data, type, isUnshift })
                return res.data.length
            })
        }
    },
    getters: {
        renderList: state => type => state.search[type].reduce((rl,currItem,index)=>index%2==1?rl:rl.push([state.search[type][index],state.search[type][index+1]])?rl:rl,[])
    }
}