import axios from 'axios';

// 商品列表
let  list = (data) => axios.get('/api/admin/goods/list',{params:data});
//商品分类
let  subcate = (data) => axios.get('/api/category/sub',{params:data});
//编辑分类
let  edit = (data) => axios.put('/api/category',data);
//添加分类
let  insert = (data) => axios.post('/api/category',data);
//删除
let  remove = (data) => axios.delete('/api/category',{params:data});
//获取商品详情
let  detail = (data) => axios.get('/api/admin/goods',{params:data});
//编辑
let editgood = (data) => axios.put('/api/admin/goods',data);
//发布商品
let insertgood = (data) => axios.post('/api/admin/goods',data);
//删除商品
let  removegood = (data) => axios.delete('/api/admin/goods',{params:data});

//省份
let  province = (data) => axios.get('/api/pcct/province',{params:data});
//城市
let  city = (data) => axios.get('/api/pcct/city',{params:data});
//县区
let  county = (data) => axios.get('/api/pcct/county',{params:data});

export default {
	list,
	subcate,
	edit,
	insert,
	remove,
	detail,
	editgood,
	province,
	city,
	county,
	insertgood,
	removegood,
}