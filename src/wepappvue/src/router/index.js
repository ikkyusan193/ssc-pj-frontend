import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Crud from '../components/Crud'
import User from '../components/User'
import store from '../store/index'


Vue.use(VueRouter)
const routes = [
    {
        //THIS DEFINE THE STARTING PAGE
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Clients',
        name: 'Crud',
        component: Crud
    },
    {
        path: '/Users',
        name: 'User',
        component: User
    },
    {
        path: '/Carriers',
        name: 'Carrier',
    },

]
const router = new VueRouter({
    routes,
})

router.beforeEach(async (to,from,next)=>{
    let response = await Vue.axios.get("/current_user");
    await store.dispatch("setLoggedInUser",response.data);
    let isLoggedIn = store.state.isLoggedIn;
    // make sure if user is logged, user will not be able to see login page
    console.log(isLoggedIn)
    if(to.name === "Login" && isLoggedIn){
        console.log("You already login")
        return next({name:"Home"});
    }
    if(to.name !== "Login" && !isLoggedIn){
        return next({name:"Login"});
    }else{
        // just go
        next();
    }
});


export default router;