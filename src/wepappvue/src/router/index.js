import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Crud from '../components/Crud'
import User from '../components/User'
import Carrier from "../components/Carrier";
import store from '../store/index'
import Calendar from '../components/Calendar'


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
        component: Carrier
    },
    {
        path: '/Calendar',
        name: 'Calendar',
        component: Calendar
    }
]
const router = new VueRouter({
    routes,
})

router.beforeEach(async (to,from,next)=>{
    let response = await Vue.axios.get("/current_user");
    await store.dispatch("setLoggedInUser",response.data);
    let isLoggedIn = store.state.isLoggedIn;
    let userRank = store.getters.getRank;

    console.log(isLoggedIn)
    console.log(response)

    // make sure if user is logged, user will not be able to see login page
    console.log(isLoggedIn)
    if(to.name === "Login" && isLoggedIn){
        console.log("You already login")
        return next({name:"Home"});
    }
    if(to.name !== "Login" && !isLoggedIn){
        console.log("Please login first")
        return next({name:"Login"});
    }
    if(to.name === "Carrier" && isLoggedIn && userRank < 1){
        console.log("You are not allowed to be here")
        return next({name:"Home"});
    }
    else{
        //just go
        next();
    }
});


export default router;