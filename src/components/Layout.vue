<template>
	<el-container style="min-height: 100vh;">
		<el-header style="padding: 0;">
			<NavBar @change="handleChange($event)"></NavBar>
		</el-header>
		<el-container>
			<!-- <el-aside width="200px" > -->
			<LeftMenu :isCollapse="isCollapse"></LeftMenu>
			<!-- </el-aside> -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';

	export default {
		components: {
			NavBar,
			LeftMenu
		},
		data() {
			return {
				isCollapse: false
			}
		},
		methods: {
			handleChange() {
				if (this.isCollapse == true) {
					this.isCollapse = false;
				} else {
					this.isCollapse = true;
				}
			}
		}

	}
</script>

<style>
	.el-header {
		box-sizing: content-box;
		padding: 0;
	}
</style>
