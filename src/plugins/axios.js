import axios from 'axios';
import router from '@/router/index';

import { Loading ,Message} from 'element-ui';

let loading;

axios.defaults.baseURL = 'http://localhost:3003';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	// console.log(config);
	
	//开启loading
	loading = Loading.service({background:"rgba(0,0,0,0.3)"});
	//判断是否携带token
	if(config.url == '/admin/login' || config.url == '/admin/register'){
		return config; 
	}
	//获取token
	let token = sessionStorage.token;
	// console.log(token)
	//无token
	if(!token){
		Message.error("无效的token，请重新登录");
		setTimeout(()=>{
			loading.close();
			router.replace("/login");
		},1000)
		
	}
	//有token
	config.headers.Authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function(response) {

	let { status, data } = response;
	
	loading.close();


	return data;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
