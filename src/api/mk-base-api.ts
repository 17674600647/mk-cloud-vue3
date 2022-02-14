// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkbase"
/*保存文章*/
export const emailSendApi = baseUrl+"/base/save/note"
