import {gatewayUrl} from './api-master'
import {getCurrentInstance} from "vue";

const baseUrl = gatewayUrl + "/mkuser"
/*注册接口*/
export const userRegisterApi = baseUrl+"/base/register"
/*登录接口*/
export const userLoginApi = baseUrl+"/base/login"
// 获取用户信息
export const getUserInfoApi = baseUrl+"/base/get/info"

export const headerPicUploadApi = baseUrl+"/base/change/picUrl"


