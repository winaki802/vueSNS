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
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {keepAlive: true},
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
        component: () => import(/* webpackChunkName: "profileDetail" */ '../views/ProfileDetail.vue'),
        meta: {keepAlive: true},
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
        component: () => import(/* webpackChunkName: "userDetail" */ '../views/userDetail.vue'),
        meta: {keepAlive: true},
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
    meta: {keepAlive: true},
  },
  {
    path: '/Signin',
    name: 'Signin',
     beforeEnter: onlyAuthuser,
    component: () => import(/* webpackChunkName: "Signin" */ '../views/Signin.vue'),
    meta: {keepAlive: true},
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
    meta: {keepAlive: true},
  },

  {
    path: '/ScrapOutHistory',
    name: 'ScrapOutHistory',
    beforeEnter: onlyAuthuser,
    //beforeEnter: rejectAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ScrapOutHistory" */ '../views/ScrapOutHistory.vue'),
    meta: {keepAlive: true},
  },

  {
    path: '/ScrapDailyReport',
    name: 'ScrapDailyReport',

    component: () => import(/* webpackChunkName: "ScrapDailyReport" */ '../views/ScrapDailyReport.vue'),
    meta: {keepAlive: true},
  },

  {
    path: '/ItemCode',
    name: 'ItemCode',
    beforeEnter: onlyAuthuser,
    //beforeEnter: rejectAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ItemCode" */ '../views/ItemCode.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/Customer',
    name: 'Customer',
    beforeEnter: onlyAuthuser,
    //beforeEnter: rejectAuthuser,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Customer" */ '../views/Customer.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/DrawerRight',
    name: 'DrawerRight',
    beforeEnter: onlyAuthuser,

    component: () => import(/* webpackChunkName: "DrawerRight" */ '../views/DrawerRight.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/DrawerLeft',
    name: 'DrawerLeft',
    beforeEnter: onlyAuthuser,

    component: () => import(/* webpackChunkName: "DrawerLeft" */ '../views/DrawerLeft.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/Feed',
    name: 'Feed',
    beforeEnter: onlyAuthuser,
    component: () => import(/* webpackChunkName: "Feed" */ '../views/Feed.vue'),
    meta: {keepAlive: true},
  },
   {
    path: '/PostItem',
    name: 'PostItem',

    component: () => import(/* webpackChunkName: "PostItem" */ '../views/PostItem.vue'),
    meta: {keepAlive: true},
  },
  {
    path: '/PostReply',
    name: 'PostReply',

    component: () => import(/* webpackChunkName: "PostReply" */ '../views/PostReply.vue'),
    meta: {keepAlive: true},
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
