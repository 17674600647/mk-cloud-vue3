export interface NoteDTO {
    noteId: string,
    title: string,
    content: string
    mkTypeNameList:[]
}

export interface GetNotesDTO {
    pageSize: number,
    currentPage: number,
}
export interface GetNotesDTO2 {
    pageSize: number,
    currentPage: number,
    noteTypeId: any
}
export interface GetNotesByShareStatusDTO {
    pageSize: number,
    currentPage: number,
    shareStatus: number
}

export interface GetOneNoteDTO {
    noteId: string
}

export interface UpdateNoteStatusDTO {
    noteId: string,
    shareStatus: number
}


export interface ChangeMode {
    controlBtn: boolean
    controlMode: string
    controlBrowser: boolean;
}

export interface SearchNotesDTO {
    searchContent: string,
    pageSize: number,
    currentPage: number,
}

export interface NoteInfoDTO {
    noteId: string,
    title: string,
    content: string
}

export interface NoteDataReportVO {
    /**
     * 没审核的
     */
    notReviewed: number;
    /**
     * 不通过的
     */
    notPassed: number;
    /**
     * 不通过率
     */
    notPassedRate: number;
}