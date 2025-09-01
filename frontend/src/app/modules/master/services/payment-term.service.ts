import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaymentTerm } from '../models/payment-term.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermService {
  private mockPaymentTerms: PaymentTerm[] = [
    {
      id: 1,
      name: 'Net 30',
      code: 'NET30',
      description: 'Payment due within 30 days',
      daysNet: 30,
      type: 'Net',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 1
    },
    {
      id: 2,
      name: 'Net 15',
      code: 'NET15',
      description: 'Payment due within 15 days',
      daysNet: 15,
      type: 'Net',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 1
    },
    {
      id: 3,
      name: '2/10 Net 30',
      code: '2-10-NET30',
      description: '2% discount if paid within 10 days, otherwise net 30',
      daysNet: 30,
      discountDays: 10,
      discountPercentage: 2,
      type: 'Net',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 1
    },
    {
      id: 4,
      name: 'Cash on Delivery',
      code: 'COD',
      description: 'Payment required upon delivery',
      daysNet: 0,
      type: 'COD',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 1
    },
    {
      id: 5,
      name: 'End of Month',
      code: 'EOM',
      description: 'Payment due at the end of the month',
      daysNet: 0,
      type: 'EOM',
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      createdBy: 1
    }
  ];

  getAllPaymentTerms(): Observable<PaymentTerm[]> {
    return of(this.mockPaymentTerms);
  }

  getPaymentTermById(id: number): Observable<PaymentTerm | undefined> {
    const paymentTerm = this.mockPaymentTerms.find(pt => pt.id === id);
    return of(paymentTerm);
  }

  createPaymentTerm(paymentTerm: Omit<PaymentTerm, 'id' | 'createdAt' | 'updatedAt'>): Observable<PaymentTerm> {
    const newPaymentTerm: PaymentTerm = {
      ...paymentTerm,
      id: Math.max(...this.mockPaymentTerms.map(pt => pt.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockPaymentTerms.push(newPaymentTerm);
    return of(newPaymentTerm);
  }

  updatePaymentTerm(id: number, paymentTerm: Partial<PaymentTerm>): Observable<PaymentTerm | null> {
    const index = this.mockPaymentTerms.findIndex(pt => pt.id === id);
    if (index !== -1) {
      this.mockPaymentTerms[index] = {
        ...this.mockPaymentTerms[index],
        ...paymentTerm,
        updatedAt: new Date()
      };
      return of(this.mockPaymentTerms[index]);
    }
    return of(null);
  }

  deletePaymentTerm(id: number): Observable<boolean> {
    const index = this.mockPaymentTerms.findIndex(pt => pt.id === id);
    if (index !== -1) {
      this.mockPaymentTerms.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
