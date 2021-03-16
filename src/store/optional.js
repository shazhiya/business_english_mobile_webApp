export default {
    namespaced: true,
    state: {
        // this is real margin-top...
        homeTopBarHeight: '-57px'
    },
    mutations: {
        setHomeTopBarHeight(state,height){
            state.homeTopBarHeight = height
        }
    }
}