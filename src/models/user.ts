export type SelectableUser = User & Selectable;

export interface User {
    id: string
    name: string
    lastname: string
    locale: string
    email: string
}

export type Login = {
    token: string
    user: User
}

export type CreateUser = {
    model: User & {
        pass: string
        lastIp: string
    }
    token: string
}

export interface Selectable {
    selected: boolean;
}