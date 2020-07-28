<template>
  <div class="login-bg">
	<el-card class="box-card login-card">
	  <div slot="header" class="clearfix">
	    <span>登录</span>
	  </div>
	  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
	  	<el-form-item label="账户" prop="username">
	  		<el-input type="username" v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder="请输入账户名"></el-input>
	  	</el-form-item>
	  	<el-form-item label="密码" prop="password">
	  		<el-input type="password" v-model="ruleForm.password" show-password prefix-icon="el-icon-key" placeholder="请输入密码"></el-input>
	  	</el-form-item>
	  	<el-form-item>
	  		<el-button type="primary" @click="handleLogin('ruleForm')">登录</el-button>
	  	</el-form-item>
	  </el-form>
	  <div class="action-box">
	  	<router-link to="/register">注册账户</router-link>
	  	<router-link to="/">忘记密码</router-link>
	  </div>
	</el-card>
  </div>
</template>

<script>
	import { Admin } from '@/api/index';
	console.log(Admin);
	export default{
		data(){
			return {
				ruleForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户名',
							trigger: 'blur'
						},
						{
							min: 2,
							message: '请输入至少两个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 18,
							message: '请输入3-18位密码',
							trigger: 'blur'
						}
					],
				}
				
			}
		},
		methods: {
			handleLogin(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					let { status, msg, data } = await Admin.login({ ...this.ruleForm });
					// .then(({ status, msg }) => 
					if (status) {
						//成功
						this.$message({
							message: msg,
							type: 'success'
						});
						//储存token uid role
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						//push后退可以回到原页面
						//replace后退不能回到原页面
						// this.$router.push('/article/list');
						//是否有redirect参数
						let { redirect } = this.$route.query;
						if (redirect) {
							this.$router.replace(redirect);
						} else {
							//默认跳转路由
							this.$router.replace('/goods/list');
						}
		
					} else {
						//失败
						this.$message.error(msg);
					}
				});
			}
		},
	}
	
</script>

<style>
	.login-bg{
		height: 100vh;
		background: url(../assets/img/login-bg.jpg) no-repeat top center ;
		background-size: cover;
		position: relative;
	}
	.login-card {
		position: absolute;
		right: 40px;
		top: 50%;
		transform: translateY(-50%);
	}
	
	a {
		color: #31404E;
		text-decoration: none;
	}
	
	.action-box {
		font-size: 13px;
		display: flex;
		justify-content: space-between;
	}
</style>
