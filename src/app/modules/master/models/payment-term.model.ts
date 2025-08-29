export interface PaymentTerm {
  id: number;
  name: string;
  code: string;
  description: string;
  daysNet: number;          // Net payment days (e.g., Net 30)
  discountDays?: number;    // Early payment discount days
  discountPercentage?: number; // Early payment discount percentage
  type: 'Net' | 'EOM' | 'COD' | 'Advance' | 'Custom';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
}
