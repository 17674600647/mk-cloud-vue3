// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkother"
/*邮箱验证码接口*/
export const emailSendApi = baseUrl+"/base/email/send"
/*文章图片上传*/
export const picUploadApi = baseUrl+"/file/pic/upload"