export interface userModel{
    _id?: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    image?: string,
    password?: string,
    username?: string,
    gender: "Male" | "Female",
    notifications?: number,
    notificationCleared?: Date | string 
}