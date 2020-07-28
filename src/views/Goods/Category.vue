<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商品分类</span>
			</div>
			<el-tree ref="tree" lazy :load="loadNode" node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => openRemoveModal(node,data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加节点" :visible.sync="insertModalShow">
			<el-form :model="insertForm" :rules="rules" ref="insertForm">
				<el-form-item label="名称" label-width="80px" class="item">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" class="item" prop="img" label-width="80px">
					<single-upload :url="insertForm.img" type="/api/upload/common" @success="handleUploadSuccess" @remove="insertForm.img = '' "></single-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button @click="handleInsertNode" type="primary">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑节点" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules="rules" ref="editForm">
				<el-form-item label="名称" label-width="80px" class="item">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" class="item" prop="img" label-width="80px">
					<single-upload :url="editForm.img" type="/api/upload/common" @success="handleUploadSuccess" 
					@remove="editForm.img = '' "></single-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button @click="handleUpdateNode" type="primary">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		props: ['id'],
		components: {
			SingleUpload
		},
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId: '',
					img: '',
				},
				editForm: {
					id: '',
					name: '',
					pId: '',
					img: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
				rules: {
					name: [{
							required: true,
							message: '请输入分类名',
							trigger: 'blur'
						},
						{
							min: 2,
							message: '长度至少两个字符',
							trigger: 'blur'
						}
					],
				}
			}
		},
		methods: {
			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回节点数据的方法
				if (node.level == 0) {
					let {status,data} = await Goods.subcate({pId: 0});
					console.log(status);
					if (status) {
						return resolve(data);
					}
				}
				console.log(node);
				//父级节点id
				let {id} = node.data;
				//获取子节点数据
				let {status,data} = await Goods.subcate({pId: id});
				console.log(status);
				if (status) {
					return resolve(data);
				}
			},
			//打开编辑模态框
			openEditModal(node, data) {
				this.editForm = { ...data};
				this.node = node;
				this.editModalShow = true;
			},
			//编辑节点
			async handleUpdateNode() {
				//表单验证
				//发送ajax
				let {status,msg} = await Goods.edit({ ...this.editForm});
				if (status) {
					this.$message.success(msg);
					//更新节点
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			//打开插入modal
			openInsertModal(node, data) {
				//node:节点对象
				//data:节点数据
				console.log(node, data);
				this.node = node;
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			//插入节点
			async handleInsertNode(insertForm) {
				//表单校验
				//校验通过 发送ajax
				let {status,msg,data} = await Goods.insert({ ...this.insertForm});
				if (status) {
					this.$message.success(msg);
					//插入新的tree节点
					this.$refs.tree.append({ ...data,...this.insertForm}, this.node);
					this.insertModalShow = false;
				}
			},
			openRemoveModal(node, data) {
				let id = data.id;
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let {status} = await Goods.remove({id});
					if (status) {
						this.$refs.tree.remove({ ...data});
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
			handleUploadSuccess({ status, msg, src }) {
				this.editForm.img = src;
				this.insertForm.img = src;
			},
		}
	}
</script>

<style>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.item .el-form-item__label {
		text-align: left;
	}
</style>
