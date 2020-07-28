<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="40px">
				</el-table-column>
				<el-table-column label="头像" sortable>
					<template slot-scope="scope">
						<el-avatar :src="scope.row.avatar" class="head_pic" style="width: 40px;"></el-avatar>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账户">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名" sortable>
				</el-table-column>
				<el-table-column prop="sex" label="性别" sortable>
				</el-table-column>
				<el-table-column prop="tel" label="手机" sortable>
				</el-table-column>
				<el-table-column prop="role_name" label="角色" sortable>
					<template slot-scope="scope">
						<el-tag :type="scope.row.role_name=='超级管理员' ?'danger':''">
						{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录" sortable>
				</el-table-column>
				<el-table-column prop="login_count" label="登录次数" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link>
							<el-button size="mini" type="primary" plain icon="el-icon-edit" 
							@click="openEditModal(scope.row,scope.$index)"></el-button>
						</el-link>
						<el-button size="mini" type="danger" plain icon="el-icon-delete" style="margin-left: 10px;"
						@click="handleDelete(scope.row.id,scope.$index)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 编辑 -->
			<el-dialog title="修改信息" :visible.sync="editModalShow">
				<el-form :model="editform" label-width="80px">
					<el-form-item label="姓名" class="item" prop="username">
						<el-input  v-model="editform.fullname" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="性别" prop="sex" class="item">
						<el-radio v-model="editform.sex" label="男">男</el-radio>
						<el-radio v-model="editform.sex" label="女">女</el-radio>
					</el-form-item>
					<el-form-item label="手机" class="item" prop="tel">
						<el-input v-model="editform.tel"></el-input>
					</el-form-item>
					<el-form-item label="权限" class="item" prop="role">
						<el-select v-model="editform.role"   placeholder="请选择一级分类">
							<el-option v-for="option in options_1st" :key="option.id" :label="option.name" 
							:value="option.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="头像" class="item" prop="avatar">
						<single-upload :url="editform.avatar" type="/api/upload/avatar" @success="handleUploadSuccess"
						@remove="editform.avatar = '' "></single-upload>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="editModalShow = false">取 消</el-button>
					<el-button @click="handleUpdateNode" type="primary">保 存</el-button>
				</div>
			</el-dialog>

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
			return {
				tableData: [

				],
				editModalShow: false,
				form: {
					username:'',
					sex:'',
					tel:'',
					avatar:'',
				},
				editform: {
					fullname:'',
					sex:'',
					tel:'',
					role:'',
					avatar:'',
				},
				options_1st:[],
			}
		},
		created() {
			//获取列表数据
			this.loadlist();
			
		},
		async mounted() {
			this.options_1st = await this.loadSubcate();
			
		},
		methods: {
			async loadlist() {
				let { status, total, data } = await User.list();
				if (status) {
					this.tableData = data;

				}
			},
			async loadSubcate(id){
				let {status,data} =await Auth.list({id});//id
				if(status){
					return data;
				}
			},
			
			
			
			handleUploadSuccess({ status, msg, src}) {
				this.editform.avatar = src;
			},
			
			//打开编辑模态框
			openEditModal(data,index) {
				this.editform = { ...data};
				this.editModalShow = true;
			},
			//编辑节点
			async handleUpdateNode() {
				//表单验证
				//发送ajax
				let {status,msg} = await User.edit({ ...this.editform});
				if (status) {
					this.loadlist();
					this.$message.success(msg);
					//更新节点
					this.editModalShow = false;
				}
			},
			
			handleDelete(id,i) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async ({ value }) => {
					let { status} = await User.remove({id:id});
					if (status) {
						//更新dom
						this.tableData.splice( i,1 );
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
				
			},

		},
	}
</script>

<style>
	.item .el-form-item__label {
		text-align: left;
	}
</style>
