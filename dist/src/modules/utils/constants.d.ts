export declare const constants: {
    RECORD_NOT_FOUND: string;
    FOREIGN_KEY_VIOLATION: string;
    UNIQUE_CONSTRAINT_VIOLATION: string;
    foreignKeyMessages: {
        category: string;
        payment: string;
        bank: string;
        store: string;
    };
    uniqueConstraintMessages: {
        duplicatedExpenses: string;
    };
    filterColumns: {
        category: string;
        payment_type: string;
        bank: string;
        store: string;
    };
    orderColumns: {
        description: string;
        amount: string;
        date: string;
        due_date: string;
        category: string[];
        payment_type: string[];
        bank: string[];
        store: string[];
    };
};
