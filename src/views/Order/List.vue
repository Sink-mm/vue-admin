<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>订单列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="50px">
				</el-table-column>
				<el-table-column width="600px">
					<template slot-scope="scope">
						<el-table :data="scope.row.goodsList" >
							<el-table-column prop="id" >
								<template slot-scope="scope">
									<img :src="scope.row.img_md" class="head_pic" style="width: 60px;" />
								</template>
							</el-table-column>
							<el-table-column prop="name"  width="300px">
							</el-table-column>
							<el-table-column prop="goods_price" label="单价">
							</el-table-column>
							<el-table-column prop="goods_num" label="数量">
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column prop="payment" label="付款总额" sortable>
				</el-table-column>
				<el-table-column prop="create_time" label="下单时间" sortable>
				</el-table-column>
				<el-table-column prop="status" label="状态" sortable>
				</el-table-column>
				<el-table-column prop="" label="操作" >
					<template slot-scope="scope">
						<el-link>
							<el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
						</el-link>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	import { Order } from '@/api/index';
	export default {
		data() {
			return {
				tableData: [],
			}
		},
		created() {
			this.loadlist();
		},
		methods: {
			async loadlist() {
				let { status, msg, data } = await Order.list();
				if (status) {
					this.tableData = data;
				}
			},

		},
	}
</script>

<style>
</style>
