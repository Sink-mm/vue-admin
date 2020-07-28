<template>
	<div class="login-bg">
		<el-card class="box-card login-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" style="font-size: 9px;"
			 size="mini">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input  v-model="ruleForm.password" show-password autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkpass">
					<el-input  v-model="ruleForm.checkpass" show-password autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="nickname">
					<el-input v-model="ruleForm.nickname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio v-model="ruleForm.sex" label="男">男</el-radio>
					<el-radio v-model="ruleForm.sex" label="女">女</el-radio>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item prop="type">
					<el-checkbox-group v-model="ruleForm.type">
						<el-checkbox label="同意本站用户协议" name="type"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleRegister('ruleForm')">注册</el-button>
					<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
				</el-form-item>
			</el-form>
			<div class="action-box">
				<router-link to="/login">登录账户</router-link>
				<router-link to="/">忘记密码</router-link>
			</div>
		</el-card>
	</div>
</template>

<script>
	import {Admin} from '@/api/index';
	// console.log(User);
	
	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					if (this.ruleForm.checkpass !== '') {
						this.$refs.ruleForm.validateField('checkpass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var checkPhone = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('手机号不能为空'));
				} else {
					const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
					console.log(reg.test(value));
					if (reg.test(value)) {
						callback();
					} else {
						return callback(new Error('请输入正确的手机号'));
					}
				}
			};
			return {
				ruleForm: {
					username: '',
					nickname: '',
					password: '',
					checkpass: '',
					sex: '男',
					tel: '',
					type: []
				},
				rules: {
					nickname: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							message: '长度至少两个字符',
							trigger: 'blur'
						}
					],
					username: [{
							required: true,
							message: '请输入账户名',
							trigger: 'blur'
						},
						{
							min: 2,
							message: '长度至少两个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '请输入6-18位密码',
							trigger: 'blur'
						}
					],
					checkpass: [{
							required: true,
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 6,
							max: 18,
							message: '请输入6-18位密码',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别'
					}],
					tel: [{
						validator: checkPhone,
						required: true,
						trigger: 'blur'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请同意本站用户协议',
						trigger: 'change'
					}],
				}
			};
		},
		methods: {
			handleRegister(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					let { status, msg,data } = await Admin.register({...this.ruleForm});
					// .then(({ status, msg }) => 
					if (status) {
						//储存token uid role
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						//成功
						this.$message({
							message: msg,
							type: 'success'
						});
						this.$router.replace('/goods/list');
					} else {
						//失败
						this.$message.error(msg);
					}
				});
			}
		}
	}
</script>

<style >
	.login-bg {
		height: 100vh;
		background: url(../assets/img/login-bg.jpg) top center no-repeat;
		background-size: cover;
		position: relative;
	}

	.login-card {
		position: absolute;
		right: 40px;
		top: 50%;
		transform: translateY(-50%);
	}
	a{
		color: #31404E;
		text-decoration: none;
	}
	.action-box{
		font-size: 13px;
		display: flex;
		justify-content: space-between;
	}
</style>
