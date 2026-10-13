export declare const constants: {
    RECORD_NOT_FOUND: string;
    FOREIGN_KEY_VIOLATION: string;
    UNIQUE_CONSTRAINT_VIOLATION: string;
    foreignKeyMessages: Record<string, string>;
    uniqueConstraintMessages: {
        duplicatedExpenses: string;
    };
    filterColumns: {
        readonly category: "categoryId";
        readonly payment_type: "paymentTypeId";
        readonly bank: "bankId";
        readonly store: "storeId";
    };
    orderColumns: Record<string, string | string[]>;
};
