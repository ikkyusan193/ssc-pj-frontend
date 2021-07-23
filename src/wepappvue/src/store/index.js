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
        getCurrentLoggedInUser: state => state.username,
        getRank(state){
            if (state.role === 'ROLE_ADMIN'){
                return 1;
            }
            return 0;
        },
        getDrawer(state){
            let adminDrawer = [
                { title: 'Home', icon: 'mdi-home-city', route: '/' },
                { title: 'Add/Modify Users', icon: 'mdi-account',route:'/Users'},
                { title: 'Add/Modify Client', icon: 'mdi-account-multiple-plus', route: '/Clients' },
                { title: 'Add/Modify Carrier', icon: 'mdi-file-document-outline', route: '/Carriers' },
                { title: 'Calendar', icon: 'mdi-calendar', route: '/Calendar' },
            ]
            let userDrawer = [
                { title: 'Home', icon: 'mdi-home-city', route: '/' },
                { title: 'Add/Modify Users', icon: 'mdi-account',route:'/Users'},
                { title: 'Add/Modify Client', icon: 'mdi-account-multiple-plus', route: '/Clients' },
                { title: 'Calendar', icon: 'mdi-calendar', route: '/Calendar' },
            ]
            if (state.role === 'ROLE_ADMIN'){
                return adminDrawer;
            }
            return userDrawer;
        },
    },
    modules: {},
})