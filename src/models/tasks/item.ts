import { SelectableUser } from "../user"

export interface ItemTime {
    total: number
    spent: number
}

export interface ItemDate {
    start?: number
    end?: number
}

export interface ItemDateDates {
    start?: Date
    end?: Date
}

export interface SubItem {
    name: string
    description?: string
    time: ItemTime
    priority?: PiorityType
    completed: boolean
}

export type PiorityType = 'unset' | 'low' | 'medium' | 'high'
export interface Priority {
    color: string
    value: PiorityType | undefined
    priority: number
}
export const Priorities: Priority[] = [
    { color: '#FF0000', value: 'high', priority: 3 },
    { color: '#ffa600', value: 'medium', priority: 2 },
    { color: '#32CD32', value: 'low', priority: 1 },
    { color: '#A1A1DD', value: 'unset', priority: 0 },
]

export interface ItemDTO {
    id: string
    projectId: string
    name: string
    column: string
    index: number
    description?: string
    userIds?: string[]
    tags?: string[]
    time: ItemTime
    date?: ItemDate
    subtasks?: SubItem[]
    priority?: PiorityType
    observers?: string[]
}

export interface DialogUsersItemData {
    allUsers: SelectableUser[]
    users: string[]
}

export interface DialogItemData {
    item: ItemDTO
    projectId: string
}