export type ShareTyle = 'Project' | 'Item' | 'SubItem';

export interface ShareData {
    type: ShareTyle
    link: string
}