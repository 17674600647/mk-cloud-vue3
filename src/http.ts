//axios
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ElLoading} from 'element-plus';
import {StorageTokenStr} from "@/utils/CommonValidators";
import {createRouter, createWebHashHistory} from "vue-router";
import {ElNotification} from "element-plus/es";
import router from "@/router/index.ts"

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
    //加载动画开始
    startLoading();
    // @ts-ignore
    config.headers.token = localStorage.getItem(StorageTokenStr);
    return config;
})
//响应拦截
axios.interceptors.response.use((response: AxiosResponse<any, any>) => {
        endLoading();
        console.log("返回值打印开始----------")
        console.log(JSON.stringify(response))
        console.log("返回值打印结束----------")
        if (response.data.code != 200) {
            ElNotification({
                title: 'Error',
                message: response.data.message,
                type: 'error',
            })
        }
        return response;
    }, error => {
        //错误提醒
        endLoading();
        //todo :完成没有权限就跳转到登录页
        if (error.response) {
            console.log("status:" + error.response.status)
            switch (error.response.status) {
                case 401:
                    //完善登录跳转
                    alert("身份认证失败~")
                    // @ts-ignore
                    router.push({
                            //传递参数使用query的话，指定path或者name都行，但使用params的话，只能使用name指定
                            path: '/login',
                            query: {
                                auth: "0"
                            }
                        }
                    );
                    break;
                default:
                    alert("未知错误~")
            }
        }

        return Promise.reject(error);
    }
)

export default axios;