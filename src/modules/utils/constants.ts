export const constants = {
  RECORD_NOT_FOUND: 'P2025',
  FOREIGN_KEY_VIOLATION: 'P2003',
  UNIQUE_CONSTRAINT_VIOLATION: 'P2002',
  foreignKeyMessages: {
    category: 'Category not found',
    payment: 'Payment type not found',
    bank: 'Bank not found',
    store: 'Store not found'
  },
  uniqueConstraintMessages: {
    duplicatedExpenses: 'This expense is already registered'
  },
  filterColumns: {
    category: 'categoryId',
    payment_type: 'paymentTypeId',
    bank: 'bankId',
    store: 'storeId'
  },
  orderColumns: {
    description: 'description',
    amount: 'amount',
    date: 'date',
    due_date: 'dueDate',
    category: ['category.description'], // Order by category description
    payment_type: ['paymentType.description'], // Order by payment type description
    bank: ['bank.name'], // Order by bank name
    store: ['store.name'] // Order by store name
  }
}
