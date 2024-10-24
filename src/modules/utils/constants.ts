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
  }
}
