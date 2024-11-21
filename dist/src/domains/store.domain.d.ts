export interface Store {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
