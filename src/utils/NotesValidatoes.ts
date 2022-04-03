export interface NoteDTO {
    noteId: string,
    title: string,
    content: string
}

export interface GetNotesDTO {
    pageSize: number,
    currentPage: number,
}
export interface GetNotesByShareStatusDTO {
    pageSize: number,
    currentPage: number,
    shareStatus:number
}

export interface GetOneNoteDTO {
    noteId: string
}
export interface UpdateNoteStatusDTO {
    noteId: string,
    shareStatus:number
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