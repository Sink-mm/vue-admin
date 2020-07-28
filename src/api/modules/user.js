import axios from 'axios';

//列表
let  list = (data) => axios.get('/api/admin/list',{params:data});
//个人资料
let  info = (data) => axios.get('/api/admin',{params:data});
//删除
let  remove = (data) => axios.delete('/api/admin',{params:data});
//编辑管理员
let  edit = (data) => axios.put('/api/admin',data);


export default {
	list,
	info,
	remove,
	edit,
}

