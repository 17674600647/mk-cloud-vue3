export interface NoteDTO {
    noteId: string,
    title: string,
    content: string
}

export interface GetNotesDTO {
    pageSize: number,
    currentPage: number,
}

export interface GetOneNoteDTO {
    noteId: string
}

export interface ChangeMode {
    controlBtn: boolean
    controlMode: string
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