import {gatewayUrl} from './api-master'
import {getCurrentInstance} from "vue";

const baseUrl = gatewayUrl + "/mkuser"
/*注册接口*/
export const userRegisterApi = baseUrl + "/base/register"
/*登录接口*/
export const userLoginApi = baseUrl + "/base/login"
/**
 * 登出接口
 */
export const signOutApi = baseUrl + "/base/sign/out"
// 获取用户信息
export const getUserInfoApi = baseUrl + "/base/get/info"
/**
 * 根据id 查询用户数据
 */
export const getUserInfoByIdApi = baseUrl + "/base/get/info/by/id"
/*
获取用户权限
 */
export const getUserAuthApi = baseUrl + "/auth/get/user/role"
//头像更新接口
export const headerPicUploadApi = baseUrl + "/base/change/picUrl"

//其他信息更新接口
export const updateInfoApi = baseUrl + "/base/update/info"
//获取分享的文章的接口
export const getNotesOwnerInfoApi = baseUrl + "/base/get/mknote/info"

//获取所有用户
export const getAllUsersByStatusApi = baseUrl + "/manager/get/all/users"
/**
 * 更新用户状态
 */
export const updateUserStatusApi = baseUrl + "/manager/update/user/status"
