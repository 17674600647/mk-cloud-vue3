//axios
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ElLoading} from 'element-plus';

let loading: any;
const startLoading: () => void = () => {
    const options: { background: string; lock: boolean; text: string } = {
        lock: true,
        text: "加载中>>>",
        background: 'rgba(0,0,0,0.7)',
    }
    loading = ElLoading.service(options)
}
const endLoading: () => void = () => {
    loading.close();
}
//请求拦截
axios.interceptors.request.use((config: AxiosRequestConfig<any>) => {
    //加载
    startLoading();
    return config;
})

//响应拦截
axios.interceptors.response.use((response: AxiosResponse<any, any>) => {
        endLoading();
        return response;
    }, error => {
        //错误提醒
    endLoading();
        return Promise.reject(error);
    }
)

export default axios;