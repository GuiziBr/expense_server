import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Bank: 'Bank',
    Category: 'Category',
    PaymentType: 'PaymentType',
    StatementPeriod: 'StatementPeriod',
    Store: 'Store',
    Expense: 'Expense'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const BankScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const CategoryScalarFieldEnum = {
    id: 'id',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const PaymentTypeScalarFieldEnum = {
    id: 'id',
    description: 'description',
    hasStatement: 'hasStatement',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const StatementPeriodScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    paymentTypeId: 'paymentTypeId',
    bankId: 'bankId',
    initialDay: 'initialDay',
    finalDay: 'finalDay',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const StoreScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const ExpenseScalarFieldEnum = {
    id: 'id',
    description: 'description',
    date: 'date',
    amount: 'amount',
    split: 'split',
    personal: 'personal',
    dueDate: 'dueDate',
    ownerId: 'ownerId',
    categoryId: 'categoryId',
    paymentTypeId: 'paymentTypeId',
    bankId: 'bankId',
    storeId: 'storeId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map