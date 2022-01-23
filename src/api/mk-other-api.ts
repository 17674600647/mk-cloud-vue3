// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkother"
/*邮箱验证码接口*/
export const emailSendApi = baseUrl+"/base/email/send"