// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkbase"
/*保存文章*/
export const saveNoteApi = baseUrl+"/base/save/note"
/*查询文章*/
export const getNotesApi = baseUrl+"/base/get/notes"
export const getDeleteNotesApi = baseUrl+"/base/get/delete/notes"
export const getOneNoteApi = baseUrl+"/base/get/one/note"
export const deleteOneNoteApi = baseUrl+"/base/delete/one/note"
export const recoverOneNoteApi = baseUrl+"/base/recover/one/note"
