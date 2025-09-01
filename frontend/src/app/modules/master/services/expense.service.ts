import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenses: Expense[] = [
    {
      lid: 1,
      ExpenseName: 'Freight Charges',
      ExpenseCode: 'FREIGHT',
      ExpenseType: 'Variable',
      AccountCode: 'ACC001',
      IsActive: true,
      CreatedDate: new Date('2024-01-15'),
      CreatedBy: 1
    },
    {
      lid: 2,
      ExpenseName: 'Custom Duty',
      ExpenseCode: 'CUSTOMS',
      ExpenseType: 'Variable',
      AccountCode: 'ACC002',
      IsActive: true,
      CreatedDate: new Date('2024-01-20'),
      CreatedBy: 1
    },
    {
      lid: 3,
      ExpenseName: 'Documentation Fees',
      ExpenseCode: 'DOCFEE',
      ExpenseType: 'Fixed',
      AccountCode: 'ACC003',
      IsActive: true,
      CreatedDate: new Date('2024-02-01'),
      CreatedBy: 1
    },
    {
      lid: 4,
      ExpenseName: 'Insurance Premium',
      ExpenseCode: 'INSURE',
      ExpenseType: 'Variable',
      AccountCode: 'ACC004',
      IsActive: true,
      CreatedDate: new Date('2024-02-05'),
      CreatedBy: 1
    },
    {
      lid: 5,
      ExpenseName: 'Port Handling Charges',
      ExpenseCode: 'PORTCHG',
      ExpenseType: 'Fixed',
      AccountCode: 'ACC005',
      IsActive: true,
      CreatedDate: new Date('2024-02-10'),
      CreatedBy: 1
    },
    {
      lid: 6,
      ExpenseName: 'Storage Charges',
      ExpenseCode: 'STORAGE',
      ExpenseType: 'Variable',
      AccountCode: 'ACC006',
      IsActive: false,
      CreatedDate: new Date('2024-02-15'),
      CreatedBy: 1
    },
    {
      lid: 7,
      ExpenseName: 'Clearing Agent Fees',
      ExpenseCode: 'CLEARFEE',
      ExpenseType: 'Fixed',
      AccountCode: 'ACC007',
      IsActive: true,
      CreatedDate: new Date('2024-02-20'),
      CreatedBy: 1
    },
    {
      lid: 8,
      ExpenseName: 'Transportation Cost',
      ExpenseCode: 'TRANSP',
      ExpenseType: 'Variable',
      AccountCode: 'ACC008',
      IsActive: true,
      CreatedDate: new Date('2024-02-25'),
      CreatedBy: 1
    },
    {
      lid: 9,
      ExpenseName: 'Bank Charges',
      ExpenseCode: 'BANKCHG',
      ExpenseType: 'Fixed',
      AccountCode: 'ACC009',
      IsActive: true,
      CreatedDate: new Date('2024-03-01'),
      CreatedBy: 1
    },
    {
      lid: 10,
      ExpenseName: 'Loading/Unloading',
      ExpenseCode: 'LOADING',
      ExpenseType: 'Variable',
      AccountCode: 'ACC010',
      IsActive: true,
      CreatedDate: new Date('2024-03-05'),
      CreatedBy: 1
    }
  ];

  getAllExpenses(): Observable<Expense[]> {
    return of(this.expenses);
  }

  getExpenseById(lid: number): Observable<Expense | undefined> {
    return of(this.expenses.find(expense => expense.lid === lid));
  }

  createExpense(expense: Omit<Expense, 'lid' | 'CreatedDate' | 'CreatedBy'>): Observable<Expense> {
    const newExpense: Expense = {
      ...expense,
      lid: Math.max(...this.expenses.map(e => e.lid)) + 1,
      CreatedDate: new Date(),
      CreatedBy: 1 // Current user ID
    };
    this.expenses.push(newExpense);
    return of(newExpense);
  }

  updateExpense(lid: number, expense: Partial<Expense>): Observable<Expense | null> {
    const index = this.expenses.findIndex(e => e.lid === lid);
    if (index !== -1) {
      this.expenses[index] = { 
        ...this.expenses[index], 
        ...expense
      };
      return of(this.expenses[index]);
    }
    return of(null);
  }

  deleteExpense(lid: number): Observable<boolean> {
    const index = this.expenses.findIndex(e => e.lid === lid);
    if (index !== -1) {
      this.expenses.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
