export interface Task {
    name: string
    description?: string
}

export interface Dashboard {
    name: string
    tasks: Task[]
}