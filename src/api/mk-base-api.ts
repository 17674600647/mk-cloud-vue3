// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkbase"
/*保存文章*/
export const saveNoteApi = baseUrl+"/base/save/note"
/*查询文章*/
export const getNotesApi = baseUrl+"/base/get/notes"
