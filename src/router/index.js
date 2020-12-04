import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index';


Vue.use(VueRouter)

const rejectAuthuser = (to,from, next) => {
  if (store.state.isLogin === true) {
    //alert("already logined..")
    next("/Home")
  }
  else {
    next()
  }
}

const onlyAuthuser = (to,from, next) => {
  if (store.state.isLogin === false) {
    //alert("need login first .. ")
    next("/Login")
  }
  else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    children: [
      {
        path: ":id",
        name: "profileDetail",
        component: () => import(/* webpackChunkName: "profileDetail" */ '../views/ProfileDetail.vue')
      }
    ]
  },
  {
    path: '/Users',
    name: 'Users',
    beforeEnter: onlyAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Users" */ '../views/Users.vue'),
    children: [
      {
        path: ":id",
        name: "userDetail",
        component: () => import(/* webpackChunkName: "userDetail" */ '../views/userDetail.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    beforeEnter: rejectAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  {
    path: '/ScrapInput',
    name: 'ScrapInput',
    beforeEnter: onlyAuthuser,
    //beforeEnter: rejectAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ScrapInput" */ '../views/ScrapInput.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
