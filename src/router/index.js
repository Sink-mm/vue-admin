import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue';

  const routes = [
  {
    path: '/login',
  	alias:'/',
    name: 'Login',
    component:  () => import('@/views/Login.vue'),
  	meta:{requiresAuth:false},
  },
  {
    path: '/register',
    name: 'Register',
    component:  () => import('@/views/Register.vue'),
  	meta:{requiresAuth:false},
  },
  {
    path: '/goods/',
    name: 'Goods',
    component:  Layout,
  	meta:{requiresAuth:true},
  	children: [
  		{
  		  path: 'list',
  		  name: 'List',
  		  component:  () => import('@/views/Goods/List.vue')
  		},
		{
		  path: 'category',
		  name: 'Category',
		  component:  () => import('@/views/Goods/Category.vue')
		},
		{
		  path: 'release',
		  name: 'Release',
		  component:  () => import('@/views/Goods/Release.vue')
		},
		{
		  path: 'edit/:id',
		  name: 'Edit',
		  component:  () => import('@/views/Goods/Edit.vue'),
		  props:true
		},
  	]
  },
  {
    path: '/order/',
    name: 'Order',
    component:  Layout,
  	meta:{requiresAuth:true},
  	children: [
  		{
  		  path: 'list',
  		  name: 'List',
  		  component:  () => import('@/views/Order/List.vue')
  		},
  	]
  },
  {
    path: '/user/',
    name: 'User',
    component:  Layout,
  	meta:{requiresAuth:true},
  	children: [
  		{
  		  path: 'info',
  		  name: 'Info',
  		  component:  () => import('@/views/User/Info.vue')
  		},
		{
		  path: 'list',
		  name: 'List',
		  component:  () => import('@/views/User/List.vue')
		},
  	]
  },
  {
    path: '/auth/',
    name: 'Auth',
    component:  Layout,
  	meta:{requiresAuth:true},
  	children: [
  		{
  		  path: 'role',
  		  name: 'Role',
  		  component:  () => import('@/views/Auth/Role.vue')
  		},
  		{
  		  path: 'menu',
  		  name: 'Menu',
  		  component:  () => import('@/views/Auth/Menu.vue')
  		},
  	]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
	// console.log(to);
	// console.log(from);
	//登录 注册不进行校验 直接放行
	// if(to.name=="Login" || to.name=="Register"){
	// 	next();
	// 	return;
	// }
	
	// console.log(to.matched);
	//根据meta原信息校验路由是否需要登录授权
	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	//不需要登录授权 直接放行
	if(!isRequiresAuth){
		next();
		return;
	}
	//校验token
	let token = sessionStorage.token;
	
	if(token) {
		//有token 立即放行
		next();
		return;
	}
	//无token 强制跳转登录
	Message.error('无效的token，请重新登录');
	setTimeout(()=>{
		next(`/login?redirect=${to.path}`);
	},2000);
})

export default router
