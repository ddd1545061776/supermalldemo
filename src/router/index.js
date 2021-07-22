import Vue from 'vue'
import Router from 'vue-router'
const Home=()=>import ('@/views/home/Home')
const Cart=()=>import ('@/views/cart/Cart')
const Category=()=>import ('@/views/category/Category')
const Profile=()=>import ('@/views/profile/Profile')
Vue.use(Router)

const router= new Router({
  mode:"history",//可以去掉url上面的#
  routes: [
    {
      path: '',
      redirect:"/home"
    },
    {
      path:"/home",
      component:Home
    },
    {
      path:"/cart",
      component:Cart
    },
    {
      path:"/category",
      component:Category
    },
    {
      path:"/profile",
      component:Profile
    },
  ]
})
export default router