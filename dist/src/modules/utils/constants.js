const foreignKeyMessages = {
    category: "Category not found",
    payment: "Payment type not found",
    bank: "Bank not found",
    store: "Store not found"
};
const filterColumns = {
    category: "categoryId",
    payment_type: "paymentTypeId",
    bank: "bankId",
    store: "storeId"
};
const orderColumns = {
    description: "description",
    amount: "amount",
    date: "date",
    due_date: "dueDate",
    category: ["category.description"],
    payment_type: ["paymentType.description"],
    bank: ["bank.name"],
    store: ["store.name"]
};
export const constants = {
    RECORD_NOT_FOUND: "P2025",
    FOREIGN_KEY_VIOLATION: "P2003",
    UNIQUE_CONSTRAINT_VIOLATION: "P2002",
    foreignKeyMessages,
    uniqueConstraintMessages: {
        duplicatedExpenses: "This expense is already registered"
    },
    filterColumns,
    orderColumns
};
//# sourceMappingURL=constants.js.map