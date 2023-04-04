import { User } from "../user";

export interface Team {
    id: string
    name: string
    description: string
    members: TeamMember[]
    invites: TeamInviteMember[]
    users?: User[]
}

export type MemberRole = 'admin' | 'client' | 'member';
export const MemberRoles = ['admin', 'client', 'member'];

export interface TeamMember {
    user: User
    role: MemberRole
}

export interface TeamInviteMember {
    email: string
    role: MemberRole
}