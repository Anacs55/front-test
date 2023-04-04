export interface AuditoryDTO {
    createdAt: number
    createdBy: string
    updatedAt?: number | undefined
    updatedBy?: string | undefined
    deletedAt?: number | undefined
    deletedBy?: string | undefined
}

export interface AuditoryField {
    auditory: AuditoryDTO
}