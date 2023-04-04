export type Menu = {
    name: string
    path: string
}

export const menus: Menu[] = [
    { name: 'beeTask', path: '/projects' }
];

export type LateralMenu = Menu &{
    icon: string
}