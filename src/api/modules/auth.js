import axios from 'axios';

// 角色列表
let  list = (data) => axios.get('/api/role/list',{params:data});
//添加角色
let insert = (data) => axios.post('/api/role',data);
//编辑角色
let  edit = (data) => axios.put('/api/role',data);
//删除角色
let  remove = (data) => axios.delete('/api/role',{params:data});

//菜单
let  subcate = (data) => axios.get('/api/menu/sub',{params:data});
//编辑
let  editmenu = (data) => axios.put('/api/menu',data);
//删除
let  removemenu = (data) => axios.delete('/api/menu',{params:data});
//添加
let insertmenu = (data) => axios.post('/api/menu',data);

//图标
let iconlist = (data) => axios.get('/api/admin/icon/list',{params:data});
//设置
let setting = (data) => axios.get('/api/role/config',{params:data});
//添加
let setadd = (data) => axios.post('/api/role/menu',data);
//删除
let setremove = (data) => axios.delete('/api/role/menu',{params:data});
let set = (data) => axios.put('/api/menu/icon',data);

export default {
	list,
	insert,
	edit,
	remove,
	subcate,
	editmenu,
	removemenu,
	insertmenu,
	iconlist,
	setting,
	setadd,
	setremove,
	set,
}