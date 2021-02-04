export default {
    namespaced: true,
    state: {
        homeTopBarHeight: 0
    },
    mutations: {
        setHomeTopBarHeight(state,height){
            state.homeTopBarHeight = height
        }
    }
}