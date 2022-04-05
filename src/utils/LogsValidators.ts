export interface LogsVO {
    total: number;
    logList: any;
}

export interface LogsDTO {
    pageSize: number;
    currentPage: number;
    /**
     * 关键字
     */
    keyWords: string;
    level: number;
}