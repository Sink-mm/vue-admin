<template>
	<el-menu default-active="2" router  @open="handleOpen" @close="handleClose" 
	 background-color="#334e66" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
	 <!-- :collapse="isCollapse" -->
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-goods"></i>
				<span>商品管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/goods/category">商品分类 </el-menu-item>
				<el-menu-item index="/goods/release">发布商品</el-menu-item>
				<el-menu-item index="/goods/list">商品列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-files"></i>
				<span>订单管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/order/list">订单列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-setting"></i>
				<span>账户设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/user/info">账户信息</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/user/list">用户列表</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span>权限设置</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/auth/role">用户角色</el-menu-item>
				<el-menu-item index="/auth/menu">菜单权限</el-menu-item>
			</el-menu-item-group>
		</el-submenu>

	</el-menu>
	<!-- <div class="leftmenu">
		<p>
			<router-link to="/article/list">文章列表</router-link>
		</p>
		<p>
			<router-link to="/article/release">发布文章</router-link>
		</p>
		<p>
			<router-link to="/article/edit">编辑文章</router-link>
		</p>
		
	</div> -->
</template>

<script>
	export default {
		props: ['isCollapse'],
		
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.leftmenu {
		/* width: 200px; */
		/* background-color: #8b8bd0; */
		/* color: #fff; */
		/* height: 100vh */
	}

	a {
		text-decoration: none;
		color: #FFFFFF;
	}

	/* .leftmenu>p>a{
		color: #FFFFFF;
		text-decoration: none;
		display: block;
		height: 40px;
		line-height: 40px;
		text-align: center;
	}
	.leftmenu>p>a:hover{
		background-color: rgba(171,171,255,0.5);
	} */
</style>
