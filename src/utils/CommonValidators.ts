export interface Result {
    code: string;
    message: string;
    data: any;
}

interface MkUser {
    id: string;
    username: string;
    createTime: string;
    email: string;
    age: number;
    nickname: string;
}

export const StorageTokenStr = "MK_TOKEN";
export const StorageAuthStr = "MK_AUTH_INFO";
export const saveStorage = (res: Result) => {
    localStorage.setItem(StorageTokenStr, res.data.data.token);
    sessionStorage.setItem(StorageAuthStr, res.data.data.authInfo)
}

export const getUserInfo = (): MkUser => {
    let item = sessionStorage.getItem(StorageAuthStr)
    // @ts-ignore
    let atob1 = atob(item);
    return JSON.parse(decodeURI(atob1));
}
//获取localStorage的token
export const getToken = () => {
    return sessionStorage.getItem(StorageTokenStr);
}

export interface DataReportVo {
    days: any;
    userNumbChange: any;
    noteNumbChange: any;
    loginNumbChange: any;
    shareNumbChange: any;
}


