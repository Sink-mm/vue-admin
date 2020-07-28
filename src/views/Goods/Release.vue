<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>发布新商品</span>
			</div>
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="商品分类" class="item">
					<el-col :span="5">
						<el-select v-model="form.cate_1st" placeholder="请选择一级分类">
							<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
							<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_3rd" placeholder="请选择二级分类">
							<el-option v-for="option in options_3rd" :key="option.id" :label="option.name" :value="option.id"></el-option>
						</el-select>
					</el-col>
				</el-form-item>
				<el-form-item label="商品名称" class="item">
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
					<el-input v-model="discountRate" style="width: 150px;">
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
				<el-form-item label="商品轮播图" class="item">
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
					<el-select v-model="form.province" placeholder="请选择省份">
						<el-option v-for="item in address_1st" :key="item.province_id" :label="item.name" :value="item.province_id"></el-option>
					</el-select>
					<el-select v-model="form.city" placeholder="请选择市">
						<el-option v-for="item in address_2nd" :key="item.city_id" :label="item.name" :value="item.city_id"></el-option>
					</el-select>
					<el-select v-model="form.county" placeholder="请选择区">
						<el-option v-for="item in address_3rd" :key="item.county_id" :label="item.name" :value="item.county_id"></el-option>
					</el-select>
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
					<el-button type="success" @click="handleAdd('form')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import E from 'wangeditor';
	import { Goods } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		props: ['id'],
		components: {
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
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					brand: '',
					detail: '',
					freight: '',
					province: '',
					city: '',
					county: '',
					img_md: '',
					img_lg:'',
				},
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				address_1st: [],
				address_2nd: [],
				address_3rd: [],
			}
		},
		async created() {
			//获取一级分类的数据
			let options = await this.loadSubcate(1);
			this.options_1st = options;
			this.form.cate_1st = options[0].id;

			//省份
			this.address_1st = await this.loadProvince();
			// let provinces = await this.loadProvince();
			// this.address_1st = provinces;
			// this.form.province = provinces[14].name;
			//城市
			// let citys = await this.loadCity(0);
			// this.citys_2nd = citys;
			// this.form.city = citys[0].id;

		},
		watch: {
			'form.cate_1st': async function(val) {
				//获取二级分类数据
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				//默认选中第一项
				this.form.cate_2nd = options[0].id;
			},
			'form.cate_2nd': async function(val) {
				//获取三级分类数据
				let options = await this.loadSubcate(val);
				this.options_3rd = options;
				//默认选中第一项
				this.form.cate_3rd = options[0].id;
			},

			'form.province': async function(val) {
				this.address_2nd = await this.loadCity(val);
				this.form.city = this.address_2nd[0].city_id;
			},
			'form.city': async function(val) {
				this.address_3rd = await this.loadCounty(val);
				this.form.county = this.address_3rd[0].county_id;
			},
		},
		mounted() {
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.detail = html
			}
			editor.customConfig.uploadImgServer = '/api/upload/editor';
			// 配置上传的 fileName
			editor.customConfig.uploadFileName = 'file';
			// 自定义 header 头
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			};

			editor.create()
		},
		computed: {
			discountRate() {
				if (this.form.price != '' && this.form.marketPrice != '') {
					let temp = (this.form.price / this.form.marketPrice) * 10;
					this.form.discount = temp;
					return temp;
				}

			}
		},
		methods: {
			async loadSubcate(id) {
				let { status, data } = await Goods.subcate({ pId: id }); //id
				if (status) {
					return data;
				}
			},
			async loadProvince() {
				let { status, data } = await Goods.province();
				if (status) {
					return data;
				}
			},
			async loadCity(id) {
				let { status, data } = await Goods.city({ id });
				if (status) {
					return data;
				}
			},
			async loadCounty(id) {
				let { status, data } = await Goods.county({ id });
				if (status) {
					return data;
				}
			},
			handleUploadSuccess({ status, msg, mdImg }) {
				this.form.img_md = mdImg;
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
			handleAdd(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//校验失败
						return false;
					}
					//校验通过
					this.form.img_lg = this.form.img_md;
					let { status, msg, data } = await Goods.insertgood({ ...this.form });
					if (status) {
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
