import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        username: null,
        role: "",
    },
    mutations: {
        setIsLoggedIn(state, isLoggedIn){
            state.isLoggedIn =  isLoggedIn;
        },
        setUsername(state, username){
            state.username = username;
        },
        setRole(state, role){
            state.role = role;
        },
    },
    actions: {
        setLoggedInUser({commit},payload){
            commit("setIsLoggedIn", payload.loggedIn);
            commit("setUsername", payload.username);
            commit("setRole", payload.role);
        },
        clearUser({commit}){
            commit("setIsLoggedIn", false);
            commit("setUsername", null);
            commit("setRole", "");
        },
    },
    getters:{
        getCurrentLoggedInUser: state => state.username
    },
    modules: {},
})