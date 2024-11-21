export interface StatementPeriod {
    id: string;
    userId: string;
    paymentTypeId: string;
    bankId: string;
    initialDay: string;
    finalDay: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
