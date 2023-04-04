import { ItemDTO } from "./item";

export interface ColumnConfig {
    showTimes?: boolean;
}

export interface ColumnDTO {
    id: string
    name: string
    items?: ItemDTO[]
    config?: ColumnConfig
    color?: string
}

export interface ProjectDTO {
    id: string
    name: string
    team: string
    color: string
    color2: string
    image?: any
    columns: ColumnDTO[]
}