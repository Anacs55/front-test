import { AuditoryField } from "../auditory";

export type AttachmentType = 'text/xml' | 'text/html' | 'text/csv' | 'text/css' | 'text/plain';

export interface FileDTO extends AuditoryField {
    id: string
    name: string
    type: string
    size: number
}
export interface FileMetadata {
    itemId: string
    bucketId: string
}