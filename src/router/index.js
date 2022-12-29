import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginPage from '../authentication/LoginPage.vue'
import RegistrationPage from '../authentication/RegistrationPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import NewUserPage from '../views/NewuserPage.vue'
import EdituserPage from '../views/EdituserPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
   redirect: 'Login'
  },
  {
    path: '/EdituserPage/:id?',
    name: 'EdituserPage',
    component: EdituserPage
  },
  {
    path: '/NewUserPage',
    name: 'NewUserPage',
    component: NewUserPage
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: DashboardPage
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   component: 
  // },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  }


]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
