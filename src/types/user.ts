export type UserRole = 'customer'|'admin'

export interface User{
    id: number,
    name: string,
    role: UserRole,
    email: string,
    password: string,
    avatar: string | undefined //undefined because you might want to leave avatar empty
}

export interface UserReducerState{
    userList: User[],
    currentUser: User | undefined
}

export interface LoginType {
    email: string,
    password: string
}
