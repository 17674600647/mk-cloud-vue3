export interface UserInfo {
    nickName: string;
    describe: string;
    age: number;
    createTime: string;
    email: string;
    picUrl: any;
}

export interface updateUserInfo {
    nickName: string;
    describe: string;
    password: string;
    checkPass: string;
    oldPassword: string;
    age: number;
    email: string;
    flag: number;
}
export interface GetUserPageDTO {
    pageSize: number,
    currentPage: number,
    status: number,
    content: string
}
export interface GetUserByIdDTO {
    userId: string
}
export interface UpdateStatusDTO {
    userId: string,
    status: number,
}

