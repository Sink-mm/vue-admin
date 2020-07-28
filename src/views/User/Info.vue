<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>账户信息</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-width="120px" style="padding: 0px 160px;">
				<el-form-item label="账户" class="item" prop="username">
					<el-input v-model="form.username" :disabled="true" placeholder="admin"></el-input>
				</el-form-item>
				<el-form-item label="姓名" class="item" prop="fullname">
					<el-input v-model="form.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex" class="item">
					<el-radio v-model="form.sex" label="男">男</el-radio>
					<el-radio v-model="form.sex" label="女">女</el-radio>
				</el-form-item>
				<el-form-item label="手机" class="item" prop="tel">
					<el-input v-model="form.tel"></el-input>
				</el-form-item>
				<el-form-item label="权限" class="item" prop="role">
					<el-select v-model="form.role" placeholder="请选择一级分类">
							<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像" class="item" prop="avatar">
					<single-upload :url="form.avatar" type="/api/upload/avatar" @success="handleUploadSuccess" @remove="form.avatar = '' "></single-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  @click="handleSave('form')">修改</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { User,Auth } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		props: ['id'],
		components: {
			SingleUpload
		},
		data() {
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
				form: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					role: '',
					avatar: '',
				},
				options: [],
				rules: {
					fullname: [{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, message: '长度至少两个字符', trigger: 'blur' }
					],
					sex: [{ required: true, message: '请选择性别' }],
					tel: [{ validator: checkPhone, required: true, trigger: 'blur' }],
					role: [{ required: true, message: '请选择权限' }],
					avatar: [{ required: true, message: '请上传头像' }],
				}
			}
		},
		created() {
			this.loadlist();
		},
		methods: {
			async loadlist() {
				var id = sessionStorage.uid;
				let { status, data } = await User.info({ id });
				if (status) {
					this.form = data;
				}

				let role = await Auth.list();
				if (role.status) {
					this.options = role.data;
				}
			},
			handleUploadSuccess({ status, msg, src }) {
				this.form.avatar = src;
			},
			handleSave(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					let { status, msg } = await User.edit({ ...this.form });
					// .then(({ status, msg }) => 
					if (status) {
						//成功
						this.$message({
							message: msg,
							type: 'success'
						});
			
					} else {
						//失败
						this.$message.error(msg);
					}
				});
			},
		}
	}
</script>

<style>
	.item .el-form-item__label {
		text-align: left;
	}
</style>
