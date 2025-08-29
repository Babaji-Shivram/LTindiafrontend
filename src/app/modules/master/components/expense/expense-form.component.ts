import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto px-4 py-6">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="component-header text-[#2c4170]">{{ isEditMode ? 'Edit Expense Category' : 'Add New Expense Category' }}</h1>
          <p class="text-xs text-gray-600 mt-1">{{ isEditMode ? 'Update expense category information' : 'Create a new expense category' }}</p>
        </div>
        <button 
          [routerLink]="'/masters/expenses'"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to List
        </button>
      </div>

      <!-- Form -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200">
        <form (ngSubmit)="onSubmit()" #expenseForm="ngForm" class="p-6 space-y-6">
          
          <!-- Basic Information -->
          <div>
            <h3 class="form-section-header text-[#2c4170] mb-4 border-b border-gray-200 pb-2">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label for="expenseName" class="block text-xs font-medium text-gray-700 mb-1">Expense Name *</label>
                <input
                  type="text"
                  id="expenseName"
                  name="expenseName"
                  [(ngModel)]="expense.ExpenseName"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter expense name">
              </div>

              <div>
                <label for="expenseCode" class="block text-xs font-medium text-gray-700 mb-1">Expense Code *</label>
                <input
                  type="text"
                  id="expenseCode"
                  name="expenseCode"
                  [(ngModel)]="expense.ExpenseCode"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter expense code">
              </div>

              <div>
                <label for="expenseType" class="block text-xs font-medium text-gray-700 mb-1">Expense Type *</label>
                <select
                  id="expenseType"
                  name="expenseType"
                  [(ngModel)]="expense.ExpenseType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]">
                  <option value="">Select expense type</option>
                  <option value="Fixed">Fixed</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>

              <div>
                <label for="accountCode" class="block text-xs font-medium text-gray-700 mb-1">Account Code *</label>
                <input
                  type="text"
                  id="accountCode"
                  name="accountCode"
                  [(ngModel)]="expense.AccountCode"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#2c4170] focus:border-[#2c4170]"
                  placeholder="Enter account code">
              </div>

              <div class="md:col-span-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    [(ngModel)]="expense.IsActive"
                    class="h-4 w-4 text-[#2c4170] focus:ring-[#2c4170] border-gray-300 rounded">
                  <span class="ml-2 text-xs text-gray-700">Active</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              [routerLink]="'/masters/expenses'"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170]">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="!expenseForm.form.valid"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-[#2c4170] hover:bg-[#1e2d4f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c4170] disabled:opacity-50 disabled:cursor-not-allowed">
              {{ isEditMode ? 'Update Expense Category' : 'Create Expense Category' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class ExpenseFormComponent implements OnInit {
  expense: Partial<Expense> = {
    ExpenseName: '',
    ExpenseCode: '',
    ExpenseType: '',
    AccountCode: '',
    IsActive: true
  };

  isEditMode = false;
  expenseId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.expenseId = parseInt(id, 10);
      this.loadExpense();
    }
  }

  loadExpense() {
    // TODO: Load expense data from service
    // For now, use mock data
    const mockExpense: Expense = {
      lid: this.expenseId!,
      ExpenseName: 'Office Rent',
      ExpenseCode: 'RENT001',
      ExpenseType: 'Fixed',
      AccountCode: 'AC-5001',
      IsActive: true,
      CreatedDate: new Date(),
      CreatedBy: 1
    };

    this.expense = mockExpense;
  }

  onSubmit() {
    if (!this.expense.ExpenseName || !this.expense.ExpenseCode || !this.expense.ExpenseType || !this.expense.AccountCode) {
      return;
    }

    // Set additional fields if creating new
    if (!this.isEditMode) {
      this.expense.CreatedDate = new Date();
      this.expense.CreatedBy = 1; // TODO: Get from auth service
    }

    // TODO: Save expense data using service
    console.log('Saving expense:', this.expense);

    // Navigate back to list
    this.router.navigate(['/masters/expenses']);
  }
}
