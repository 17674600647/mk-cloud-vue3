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