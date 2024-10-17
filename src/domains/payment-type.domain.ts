export interface PaymentType {
  id: string;
  description: string;
  createdAt: Date;
  updatedAt: Date | null;
  hasStatement: boolean;
  deletedAt: Date | null;
}
