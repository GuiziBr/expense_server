export interface PaymentType {
    id: string;
    description: string;
    hasStatement: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
