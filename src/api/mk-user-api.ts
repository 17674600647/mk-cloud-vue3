import {gatewayUrl} from './api-master'
import {getCurrentInstance} from "vue";

const baseUrl = gatewayUrl + "/mkuser"
/*注册接口*/
export const userRegisterApi = baseUrl+"/base/register"

