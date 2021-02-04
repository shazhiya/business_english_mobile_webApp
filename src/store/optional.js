export default {
    namespaced: true,
    state: {
        // this is really margin-top...
        homeTopBarHeight: '-57px'
    },
    mutations: {
        setHomeTopBarHeight(state,height){
            state.homeTopBarHeight = height
        }
    }
}