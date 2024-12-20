export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    createdAt: Date;
    updatedAt: Date | null;
}
