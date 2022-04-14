// @ts-ignore
import {gatewayUrl} from './api-master'

const baseUrl = gatewayUrl + "/mkbase"

/*------------base基础服务--------------------*/
/*保存文章*/
export const saveNoteApi = baseUrl + "/base/save/note"
/*查询文章*/
export const getNotesApi = baseUrl + "/base/get/notes"

/*获取删除的文章列表*/
export const getDeleteNotesApi = baseUrl + "/base/get/delete/notes"
/*获取分享的文章列表*/
export const getSharedNotesApi = baseUrl + "/base/get/shared/notes"
/*分享文章*/
export const shareOneNoteApi = baseUrl + "/base/to/share/note"
/*取消分享文章*/
export const disShareOneNoteApi = baseUrl + "/base/to/dishare/note"

/*获取一个文章*/
export const getOneNoteApi = baseUrl + "/base/get/one/note"
/*删除一个文章*/
export const deleteOneNoteApi = baseUrl + "/base/delete/one/note"
/*恢复被删除的文章*/
export const recoverOneNoteApi = baseUrl + "/base/recover/one/note"

/*收藏一个文章*/
export const collectOneNoteApi = baseUrl + "/base/to/collect/note"
/*取消收藏文章*/
export const disCollectOneNoteApi = baseUrl + "/base/to/disCollect/note"
/*收藏的文章列表*/
export const getCollectNotesApi = baseUrl + "/base/query/collect/notes"
/*------------search服务--------------------*/
const searchUrl = "/search"
/*搜索分享的文章标题与内容*/
export const searchShareNotesApi = baseUrl + searchUrl + "/share/notes"

/*搜索分享的文章标题*/
export const searchShareNoteTitleApi = baseUrl + searchUrl + "/share/notes/title"
/*------------管理员--------------------*/
/*根据状态查询文章*/
export const getNotesByStatusApi = baseUrl + "/manager/get/notes/by/status"
/**
 * 管理员删除一篇文章
 */
export const adminDeleteOneApi = baseUrl + "/manager/delete/one/note"
/**
 * 管理员恢复一篇文章
 */
export const adminRecoverOneApi = baseUrl + "/manager/recover/one/note"
/**
 * 查询数据
 */
export const queryNoteDataReportApi = baseUrl + "/manager/query/note/data/report"
/**
 * 更新笔记状态
 */
export const updateNoteStatusApi = baseUrl + "/manager/update/note/status"
/**
 * 获取所有类型
 */
export const getNoteTypeApi = baseUrl + "/base/query/all/type"
/**
 * 查询热点数据
 */
export const getQueryLeaderboardApi = baseUrl + "/base/query/leaderboard/data"
