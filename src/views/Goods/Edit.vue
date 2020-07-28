<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑商品</span>
			</div>
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="商品分类" class="item">
					<el-col :span="5">
						<el-select v-model="form.cate_1st" @change="handleCate_1stChange"   placeholder="请选择一级分类">
							<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
							<el-option v-for="option in options_2nd" :key="option.id"  :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_3rd" placeholder="请选择二级分类">
							<el-option v-for="option in options_3rd" :key="option.id"  :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="商品名称" class="item" prop="name">
					<el-input v-model="form.name" style="width: 550px;"></el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							商品标题名称长度至少3个字符，最长200个汉字</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品卖点" class="item">
					<el-input type="textarea" :rows="2" v-model="form.hotPoint" style="width: 550px;">
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							商品卖点不能超过140个汉字</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品价格" class="item">
					<el-input v-model="form.price" style="width: 150px;">
						<template slot="append">元</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							价格必须是0-999999之间的数字，且不能高于市场价</div>
					</el-col>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</div>
					</el-col>
				</el-form-item>
				<el-form-item label="市场价" class="item">
					<el-input v-model="form.marketPrice" style="width: 150px;">
						<template slot="append">元</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
					</el-col>
				</el-form-item>
				<el-form-item label="成本价" class="item">
					<el-input v-model="form.cost" style="width: 150px;">
						<template slot="append">元</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录
							，非必填选项，不会在前台销售页面中显示</div>
					</el-col>
				</el-form-item>
				<el-form-item label="折扣" class="item">
					<el-input v-model="form.discount" style="width: 150px;">
						<template slot="append">折</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							根据销售价与市场价比例自动生成不需要编辑</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品库存" class="item">
					<el-input v-model="form.inventory" :precision="0" style="width: 150px;">
						<template slot="append">件</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							价格必须是0-999999之间的整数</div>
					</el-col>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品货号" class="item">
					<el-input v-model="form.articleNo" style="width: 150px;">
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							商品货号是商家管理商品的编号，买家不可见</div>
					</el-col>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品主图" class="item">
					<single-upload :url="form.img_md" type="/api/upload/goods" 
					@success="handleUploadSuccess" @remove="form.img_md = '' "></single-upload>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间
							选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品轮播图" class="item" prop="slider">
					<!-- <div v-for="(item, index) in fileList" :key="index"> -->
					<!-- <span v-for="(item, index) in fileList" :key="index">
					<img  :src="item" :alt="item" style="height: 150px;width: 150px; padding: 3px">
					</span> -->
					<el-upload
					  action="/api/upload/slider" :file-list="fileList" :auto-upload="true"
					  list-type="picture-card"
					  :on-preview="handlePictureCardPreview"
					  :on-remove="handleRemove"
					  :on-success="handleSuccess"
					  :before-upload="beforeAvatarUpload">
					  <i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，
							建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-col>
				</el-form-item>
				<div class="mes">商品详情描述</div>
				<el-form-item label="商品品牌" class="item">
					<el-input v-model="form.brand" style="width: 550px;"></el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							商品标题名称长度至少3个字符，最长200个汉字</div>
					</el-col>
				</el-form-item>
				<el-form-item label="商品描述" class="item">
					<div ref="editor" v-model="form.detail"></div>
				</el-form-item>
				<div class="mes">商品物流信息</div>
				<el-form-item label="所在地" class="item">
					<el-col :span="5">
						<el-select v-model="form.name" placeholder="请选择一级分类">
							<el-option label="区域一" value="shanghai"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.name" placeholder="请选择二级分类">
							<el-option label="区域一" value="shanghai"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.name" placeholder="请选择二级分类">
							<el-option label="区域一" value="shanghai"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="运费" class="item">
					<el-input v-model="form.freight" style="width: 150px;">
						<template slot="append">元</template>
					</el-input>
					<el-col :span="24" style="color: #999;">
						<div class="grid-content bg-purple-light">
							运费设为0，前台商品将显示免运费</div>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="handleSave('form')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import E from 'wangeditor';
	import {Goods} from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		props:["id"],
		components:{
			SingleUpload
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [],
				items:[],
				urlArr: [],
				urlString:[],
				urlObj: {},
				form: {
					cate_1st:'',
					cate_2nd:'',
					cate_3rd:'',
					name:'',
					hotPoint:'',
					price:'',
					marketPrice:'',
					cost:'',
					discount:'',
					inventory:'',
					articleNo:'',
					brand:'',
					detail:'',
					freight:'',
					img_1g:'',
					img_md:'',
					slider:'',
				},
				options_1st:[],
				options_2nd:[],
				options_3rd:[],
			}
		},
		watch:{
			"form.cate_1st":function(value){
				this.loadSubcate(value).then((options) => {
					this.options_2nd = options;
					// this.ruleForm.cate_2nd = options[0].id;
				});
			},
			"form.cate_2nd":function(value){
				this.loadSubcate(value).then((options) => {
					this.options_3rd = options;
					// this.ruleForm.cate_2nd = options[0].id;
				});
			},
			"form.cate_3rd":function(value){
				console.log(value);
			},
			
		},
		async mounted() {
			this.options_1st = await this.loadSubcate(1);
			
			
			let goods = await this.loadDetail(this.id);
			this.form = goods;
			//图片显示
			this.items = this.form.slider.split(",");
			   this.items.forEach(val => {
			   this.urlObj.url = val;
			   this.urlArr.push(val)
			   this.fileList.push(this.urlObj);
			    this.urlObj = {};
			});
			
			
			this.options_2nd = await this.loadSubcate(goods.cate_1st);
			this.options_3rd = await this.loadSubcate(goods.cate_2nd);
			
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.detail = html
			}
			editor.create()
			editor.txt.html(this.form.detail);
		},
		methods: {
			
			async loadDetail(id){
				let { status, data } = await Goods.detail({ id });
				
				if (status) {
					return data;
				}
			},
			async loadSubcate(id){
				let {status,data} =await Goods.subcate({pId:id});//id
				if(status){
					return data;
				}
			},
			async handleCate_1stChange(value){
				let options = await this.loadSubcate(goods.cate_1st);
				this.options_2nd = options;
				this.form.cate_2nd = options[0].id;
				
			},
			handleUploadSuccess(status,msg,data){
				this.form.img_md = data;
			},
			handleRemove(file, fileList) {
			        this.urlArr = [];
					fileList.forEach(item => {
					this.urlArr.push(item.url);
					this.urlString = this.urlArr.join(",");
					this.form.slider = this.urlString;
					});
			},
			handlePictureCardPreview(file) {
			        this.dialogImageUrl = file.url;
			        this.dialogVisible = true;
			},
			handleSuccess(res, file){
				this.urlArr.push(res.src);
				this.urlString = this.urlArr.join(",");
				this.form.slider = this.urlString;
			},
			beforeAvatarUpload(file) {
				const isLt = file.size / 1024 / 1024 < 1;
				
				if (!isLt) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return  isLt;
			},
			handleSave(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					let { status, msg } = await Goods.editgood({ ...this.form });
					// .then(({ status, msg }) => 
					if (status) {
						//成功
						this.$router.replace('/goods/list');
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

	.mes {
		background-color: #eaeaea;
		color: #333;
		text-align: left;
		line-height: 30px;
		padding: 5px 10px;
		border-radius: 3px;
		margin: 10px 0;
	}
</style>
