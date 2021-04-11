import resolvedPost from "@/store/ResovePost";

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
            return resolvedPost(`class/search/${type}/${index}/${size}`, condition, res => {
                res.forEach(clazz=>{
                    clazz.clazzUsers=null
                    clazz.organization = {
                        organizationId: clazz.organization?.organizationId,
                        organizationName: clazz.organization?.organizationName
                    }
                    clazz.ccs = clazz.ccs.map(cc=>{
                        return {
                            curriculumId: cc.curriculum.curriculumId,
                            curriculumName: cc.curriculum.curriculumName,
                            curriculumDescription: cc.curriculum.curriculumDescription,
                            curriculumCover: cc.curriculum.curriculumCover,
                            curriculumStatus: cc.curriculum.curriculumStatus
                        }
                    })
                })
                commit('pushSearchResult', {data: res, type, isUnshift})
                return res.length
            })
        }
    },
    getters: {
        renderList: state => type => state.search[type].reduce((rl, currItem, index) => index % 2 == 1 ? rl : rl.push(index + 1 == state.search[type].length ? [state.search[type][index]] : [state.search[type][index], state.search[type][index + 1]]) ? rl : rl, []),
        clazzSize: state => type => state.search[type].length
    }
}