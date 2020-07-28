<template>
	<div class="navbar">
		<div class="left">
			<div class="logo">
				<img src="../assets/img/logo.png" alt="">
			</div>
			<!-- <el-radio-group >
				<el-button :lable="!isShow" type="primary" icon="el-icon-s-fold"></el-button>
			</el-radio-group> -->
			<div>
				<i @click="handleclick" class="el-icon-s-fold"></i>
			</div>
		</div>
		<div class="right">
			<el-menu class="el-menu-demo" mode="horizontal" background-color="#31404E" text-color="#fff" active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<span class="el-dropdown-link" v-model="person" style="color: white;">
							<el-avatar :src="person.avatar" :size='30' class="img"></el-avatar>
							{{person.username}}
						</span>
					</template>
					<el-menu-item index="1-1">消息</el-menu-item>
					<el-menu-item index="1-2">设置</el-menu-item>
					<el-menu-item index="1-3">退出</el-menu-item>
				</el-submenu>
			</el-menu>

		</div>

	</div>
</template>

<script>
	import { User } from '@/api/index'
		export default {
			data() {
				return {
					person: [],
				}
			},
			created() {
				//获取数据
				this.loadinfo();
			},
			methods: {
				handleclick() {
					this.$emit('change');
				},
				async loadinfo() {
					var id = sessionStorage.uid;
					let { status, data } = await User.info({ id });
					if (status) {
						this.person = data;
					}
	
				},
			}
		}
</script>

<style>
	.navbar {
		background-color: #31404E;
		color: #fff;
		height: 60px;
		line-height: 55px;
		display: flex;
		justify-content: space-between;
	}

	.left {
		display: flex;
	}

	.right {
		display: flex;
		margin-right: 30px;
		/* height: 20px; */
	}

	.logo>img {
		height: 60px;
	}

	.picture>img {
		width: 30px;
		height: 30px;
	}

	.picture {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		margin-top: 10px;
	}

	.right>span {
		line-height: 60px;
		display: inline-block;
		margin-right: 5px;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.def {
		width: 30px;
		margin-right: 5px;
		border-radius: 100%;
	}
</style>
