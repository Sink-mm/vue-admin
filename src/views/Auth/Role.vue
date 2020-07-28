<template>
	<div>
		<el-col :span="11">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>角色列表</span>
					<el-button @click="openInsertModal" style="float: right; padding: 3px 6px;width: 80px;height: 30px;" icon="el-icon-circle-plus-outline"
					 type="primary" plain>添加角色</el-button>
				</div>
				<template>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="id" label="#">
						</el-table-column>
						<el-table-column prop="name" label="角色">
							<template slot-scope="scope">
								<el-tag :type="scope.row.name=='超级管理员' ?'danger':''">
									{{scope.row.name}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="address" label="操作">
							<template slot-scope="scope">
								<el-button size="mini" type="primary" plain icon="el-icon-edit" :disabled="scope.row.name=='超级管理员'" @click="handleEdit(scope.row.name,scope.row.id,scope.$index)"></el-button>
								<el-button size="mini" type="danger" plain icon="el-icon-delete" :disabled="scope.row.name=='超级管理员'" @click="handleDelete(scope.row.id,scope.$index)"></el-button>
								<el-button size="mini" type="primary" plain icon="el-icon-setting" @click="handleSetting(scope.row.id)"></el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-card>
		</el-col>
		<el-col :span="13">
			<el-card class="box-card config-card" v-for="(item,index) in config">
				<div slot="header" class="clearfix">
					<i class="el-icon-collection-tag" style="color: #409eff; font-size: 14px;"></i>
					<span style="color: #409eff; font-size: 14px;">{{item.name}}</span>
					<el-switch v-model="item.checked" style="float: right; padding: 3px 0" @change="changeAll(item.id,index)"></el-switch>
				</div>

				<div v-for="(it,idx) in item.children" class="text item">
					<span style="color: #909399; font-size: 12px; display: inline-block;">{{it.name}}</span>
					<el-switch v-model="it.checked" style="float: right; " @change="changeSingle(it.id,idx,index)"></el-switch>
				</div>
			</el-card>
		</el-col>
	</div>
</template>

<script>
	import { Auth } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [

				],
				editform: { id: 0, name: '' },
				config: [],
				cardVisible: false,
				value: '',
				role_id: '',
				configEdit: {
					role_id: '',
					menu_id: '',
				},
			}
		},
		created() {
			//获取列表数据
			this.loadlist();
		},
		methods: {
			async loadlist() {
				let { status, total, data } = await Auth.list();
				if (status) {
					this.tableData = data;
					console.log(this.tableData[0]);
				}
			},
			//添加角色
			openInsertModal() {
				this.$prompt("请输入添加的角色名称", "添加角色", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符',
					})
					.then(async ({ value }) => {
						let { status, data } = await Auth.insert({ name: value });
						if (status) {
							//更新dom
							this.tableData.push({ name: value, ...data });
							this.$message.success('添加成功');
						}
					})
					.catch(({ value }) => {
						this.$message.info('取消添加');
					})
			},
			//编辑
			handleEdit(name, id, i) {
				this.$prompt("请编辑角色名称", "编辑角色", {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符',
						inputValue: name,
					})
					.then(async ({ value }) => {
						this.editform.id = id;
						this.editform.name = value;

						let { status, data } = await Auth.edit({ ...this.editform });
						console.log(data);
						if (status) {
							//更新dom
							this.loadlist();
							// this.tableData[i].name = value;
							this.$message.success('编辑成功');
						}
					})
					.catch(({ value }) => {
						this.$message.info('取消编辑');
					})
			},
			handleDelete(id, i) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async ({ value }) => {
					let { status } = await Auth.remove({ id });
					if (status) {
						//更新dom
						this.tableData.splice(i, 1);
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
			async handleSetting(id) {
				this.configEdit.role_id = id;
				this.cardVisible = true;
				let { status, data } = await Auth.setting({ id: id });
				if (status) {
					this.config = data;
					console.log(this.config);
				}
			},
			async changeAll(menu_id, index) {
				//赋值
				this.configEdit.menu_id = menu_id;
				if (!this.config[index].checked) {
					// console.log(this.configEdit);
					let { status, data } = await Auth.setremove(this.configEdit);
					for (var i = 0; i < this.config[index].children.length; i++) {
						this.config[index].children[i].checked = false;
						var id = this.config[index].children[i].id;
						this.configEdit.menu_id = id;
						let { status, data } = await Auth.setremove(this.configEdit);
					}
				} else {
					let { status, data } = await Auth.setadd(this.configEdit);
					for (var i = 0; i < this.config[index].children.length; i++) {
						this.config[index].children[i].checked = true;
						var id = this.config[index].children[i].id;
						this.configEdit.menu_id = id;
						let { status, data } = await Auth.setadd(this.configEdit);
					}
				}
			},
			async changeSingle(menu_id, index, index_pa) {
				// console.log(menu_id,index,index_pa);
				this.configEdit.menu_id = menu_id;
				if (!this.config[index_pa].children[index].checked) {
					let { status, data } = await Auth.setremove(this.configEdit);
					var num = 0;
					for (var i = 0; i < this.config[index_pa].children.length; i++) {
						if (this.config[index_pa].children[i].checked) {
							num++;
						}
					}
					if (num >= 1) {
						this.config[index_pa].checked = true;
						this.configEdit.menu_id = this.config[index_pa].id;
						let { status, data } = await Auth.setadd(this.configEdit);
					} else {
						this.config[index_pa].checked = false;
						this.configEdit.menu_id = this.config[index_pa].id;
						let { status, data } = await Auth.setremove(this.configEdit);
					}
				} else {
					let { status, data } = await Auth.setadd(this.configEdit);
					var num = 0;
					for (var i = 0; i < this.config[index_pa].children.length; i++) {
						if (this.config[index_pa].children[i].checked) {
							num++;
						}
					}
					if (num >= 1) {
						this.config[index_pa].checked = true;
						this.configEdit.menu_id = this.config[index_pa].id;
						let { status, data } = await Auth.setadd(this.configEdit);
					} else {
						this.config[index_pa].checked = false;
						this.configEdit.menu_id = this.config[index_pa].id;
						let { status, data } = await Auth.setremove(this.configEdit);
					}
				}
			},
		}
	}
</script>

<style>
	/* .box-card {
		width: 600px;
	} */
</style>
