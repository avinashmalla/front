import { LoginType, User } from "../../types/user";

export const adminUser: User = {
    id: 3, 
    email: "admin@mail.com", 
    password: "admin123", 
    name: "Admin",
    role: "admin",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=229"
}

export const testUser: User = {
    id: 1, 
    email: "john@mail.com", 
    password: "changeme", 
    name: "Jhon",
    role: "customer",
    avatar: "https://api.lorem.space/image/face?w=640&h=480&r=6450"
}

export const adminLogin: LoginType = {
    email: "admin@mail.com",
    password: "admin123"
}