<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商品列表</span>
			</div>
			<el-table   style="width: 100%" :data="tableData">
				<el-table-column prop="" label="商品名称" width="510">
					<template slot-scope="scope">
						<div class="goods">
							<div>
								<img :src="scope.row.img_md" class="head_pic" style="width: 60px;" />
							</div>
							<div class="name">
								<span prop="name">{{scope.row.name}}</span><br />
								<span prop="articleNo">商品编号：{{scope.row.articleNo}}</span>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格" sortable>
				</el-table-column>
				<el-table-column prop="inventory" label="库存" sortable>
				</el-table-column>
				<el-table-column prop="create_time" label="发布时间" sortable>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-link :href="`#/goods/edit/${scope.row.id}`">
							<el-button size="mini" type="primary" plain icon="el-icon-edit"
							 ></el-button>
						</el-link>
						<!-- <el-link>
							<el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
						</el-link> -->
						<el-button size="mini" type="danger" plain icon="el-icon-delete" style="margin-left: 10px;"
						@click="handleDelete(scope.row.id,scope.$index)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block" style="height: 30px;padding-top: 10px;">
				<el-pagination @size-change="handleSizeChange" 
				@current-change="handleCurrentChange"
				 :current-page="pageIndex" :page-sizes="[4, 8, 16, 32]" 
				 :page-size="pageSize" background layout=" prev, pager, next,sizes,total"
				 :total="total" style="float: right;">
				</el-pagination>
			</div>

		</el-card>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
				pageIndex: 1,
				pageSize: 4,
				total: 0,
			}
		},
		created() {
			this.loadlist();
		},
		methods: {
			async loadlist() {
				let { status, goods, total} = await Goods.list({pageSize:this.pageSize,pageIndex:this.pageIndex});
				if (status) {
					this.tableData = goods;
					this.total = total;
				}
			},
			handleSizeChange(size) {
				this.pageSize = size;
				this.loadlist();
			},
			handleCurrentChange(page) {
				this.pageIndex = page;
				this.loadlist();
			},
			handleDelete(id,i) {
				this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async ({ value }) => {
					let { status} = await Goods.removegood({id:id});
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
	.goods {
		display: flex;
		padding: 20px 0;
		box-sizing: border-box;
	}

	.name {
		width: 450px;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>
