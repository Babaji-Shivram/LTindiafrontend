import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnhancedCrmService, CrmContract, CrmQuote } from '../../services/enhanced-crm.service';

@Component({
  selector: 'app-contract-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="page-title">Contract Management</h1>
        <p class="page-subtitle">Manage contracts and agreements</p>
      </div>
      <button
        (click)="showCreateContractModal = true"
        class="btn btn-primary">
        <i class="fas fa-plus"></i>
        New Contract
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            <i class="fas fa-file-contract text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Contracts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getTotalContracts() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            <i class="fas fa-check-circle text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Contracts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getActiveContracts() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <i class="fas fa-dollar-sign text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Contract Value</p>
            <p class="text-2xl font-semibold text-gray-900">₹{{ getTotalContractValue() | number:'1.0-0' }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-purple-100 text-purple-600">
            <i class="fas fa-calendar-check text-xl"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Expiring Soon</p>
            <p class="text-2xl font-semibold text-gray-900">{{ getExpiringSoon() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow mb-6">
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                [(ngModel)]="searchTerm"
                (ngModelChange)="applyFilters()"
                placeholder="Search contracts by company, contract number, or contact..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-4">
            <select
              [(ngModel)]="statusFilter"
              (ngModelChange)="applyFilters()"
              class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Status</option>
              <option value="DRAFT">Draft</option>
              <option value="ACTIVE">Active</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            
            <input
              type="date"
              [(ngModel)]="dateFilter"
              (ngModelChange)="applyFilters()"
              class="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>
      </div>
    </div>

    <!-- Contracts Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="min-w-full">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Details</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let contract of filteredContracts; trackBy: trackByContractId" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-file-contract text-blue-600"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ contract.contractNumber }}</div>
                    <div class="text-sm text-gray-500">Contract ID: {{ contract.contractID }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ contract.leadCompany }}</div>
                <div class="text-sm text-gray-500">{{ contract.contractDate | date:'MMM dd, yyyy' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">₹{{ contract.contractValue | number:'1.0-0' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ contract.startDate | date:'MMM dd, yyyy' }}</div>
                <div class="text-sm text-gray-500">to {{ contract.endDate | date:'MMM dd, yyyy' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-gray-100 text-gray-800': contract.status === 'DRAFT',
                        'bg-green-100 text-green-800': contract.status === 'ACTIVE',
                        'bg-blue-100 text-blue-800': contract.status === 'COMPLETED',
                        'bg-red-100 text-red-800': contract.status === 'CANCELLED'
                      }">
                  {{ contract.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    (click)="viewContract(contract)"
                    class="text-blue-600 hover:text-blue-900 p-1"
                    title="View Details">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button
                    (click)="editContract(contract)"
                    class="text-yellow-600 hover:text-yellow-900 p-1"
                    title="Edit Contract">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    (click)="downloadContract(contract)"
                    class="text-green-600 hover:text-green-900 p-1"
                    title="Download PDF">
                    <i class="fas fa-download"></i>
                  </button>
                  <button
                    (click)="emailContract(contract)"
                    class="text-purple-600 hover:text-purple-900 p-1"
                    title="Email Contract">
                    <i class="fas fa-envelope"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div *ngIf="filteredContracts.length === 0" class="text-center py-12">
          <i class="fas fa-file-contract text-gray-300 text-4xl mb-4"></i>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
          <p class="text-gray-500 mb-4">{{ searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first contract' }}</p>
          <button
            (click)="showCreateContractModal = true"
            class="btn btn-primary">
            Create Contract
          </button>
        </div>
      </div>
    </div>

    <!-- Create Contract Modal -->
    <div *ngIf="showCreateContractModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Create New Contract</h3>
          <button
            (click)="showCreateContractModal = false"
            class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form (ngSubmit)="createContract()" class="p-6 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Select Quote</label>
              <select
                [(ngModel)]="newContract.quoteID"
                (ngModelChange)="onQuoteSelected($event)"
                name="quoteID"
                required
                class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select a quote</option>
                <option *ngFor="let quote of availableQuotes" [value]="quote.quoteID">
                  {{ quote.quoteNumber }} - {{ quote.leadCompany }} (₹{{ quote.totalAmount | number:'1.0-0' }})
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contract Value</label>
              <input
                type="number"
                [(ngModel)]="newContract.contractValue"
                name="contractValue"
                required
                class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                [(ngModel)]="newContract.startDate"
                name="startDate"
                required
                class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                [(ngModel)]="newContract.endDate"
                name="endDate"
                required
                class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500">
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
            <textarea
              [(ngModel)]="newContract.terms"
              name="terms"
              rows="4"
              placeholder="Enter contract terms and conditions..."
              class="w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              (click)="showCreateContractModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary">
              Create Contract
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Contract Details Modal -->
    <div *ngIf="showDetailsModal && selectedContract" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Contract Details - {{ selectedContract.contractNumber }}</h3>
          <button
            (click)="showDetailsModal = false"
            class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Contract Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContract.contractNumber }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Company</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContract.leadCompany }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Contract Value</label>
                <p class="mt-1 text-sm text-gray-900">₹{{ selectedContract.contractValue | number:'1.0-0' }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <span class="mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="{
                        'bg-gray-100 text-gray-800': selectedContract.status === 'DRAFT',
                        'bg-green-100 text-green-800': selectedContract.status === 'ACTIVE',
                        'bg-blue-100 text-blue-800': selectedContract.status === 'COMPLETED',
                        'bg-red-100 text-red-800': selectedContract.status === 'CANCELLED'
                      }">
                  {{ selectedContract.status }}
                </span>
              </div>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Contract Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContract.contractDate | date:'MMM dd, yyyy' }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Duration</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ selectedContract.startDate | date:'MMM dd, yyyy' }} to {{ selectedContract.endDate | date:'MMM dd, yyyy' }}
                </p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Created By</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContract.createdBy }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Created On</label>
                <p class="mt-1 text-sm text-gray-900">{{ selectedContract.createdOn | date:'MMM dd, yyyy' }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700">Terms & Conditions</label>
            <div class="mt-1 p-3 bg-gray-50 rounded-md">
              <p class="text-sm text-gray-900">{{ selectedContract.terms || 'No terms specified' }}</p>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              (click)="downloadContract(selectedContract)"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              <i class="fas fa-download mr-2"></i>Download PDF
            </button>
            <button
              (click)="editContract(selectedContract)"
              class="btn btn-primary">
              <i class="fas fa-edit mr-2"></i>Edit Contract
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Brand Button Styles */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.875rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    .btn-primary {
      background: linear-gradient(135deg, #2c4170 0%, #1e2e4f 100%);
      color: white;
      border: 1px solid #2c4170;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #1e2e4f 0%, #162238 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(44, 65, 112, 0.3);
    }

    .btn-primary:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(44, 65, 112, 0.2);
    }

    /* Page Title Styles */
    .page-title {
      font-size: 1.875rem;
      font-weight: 700;
      color: #2c4170;
      margin: 0 0 0.25rem 0;
    }

    .page-subtitle {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 0;
    }

    /* Original styles */
    .table-container {
      max-height: 600px;
      overflow-y: auto;
    }
    
    .status-badge {
      @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
    }
    
    .action-button {
      @apply p-1 rounded hover:bg-gray-100 transition-colors;
    }
  `]
})
export class ContractManagementComponent implements OnInit {
  contracts: CrmContract[] = [];
  filteredContracts: CrmContract[] = [];
  availableQuotes: CrmQuote[] = [];
  
  // Filters
  searchTerm = '';
  statusFilter = '';
  dateFilter = '';
  
  // Modal states
  showCreateContractModal = false;
  showDetailsModal = false;
  selectedContract: CrmContract | null = null;
  
  // New contract form
  newContract: Partial<CrmContract> = {
    contractValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    terms: ''
  };

  constructor(
    private enhancedCrmService: EnhancedCrmService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadContracts();
    this.loadAvailableQuotes();
  }

  loadContracts() {
    this.enhancedCrmService.getContracts().subscribe((contracts: CrmContract[]) => {
      this.contracts = contracts;
      this.applyFilters();
    });
  }

  loadAvailableQuotes() {
    this.enhancedCrmService.getQuotes().subscribe((quotes: CrmQuote[]) => {
      this.availableQuotes = quotes.filter((q: CrmQuote) => q.status === 'ACCEPTED' || q.status === 'SENT');
    });
  }

  applyFilters() {
    this.filteredContracts = this.contracts.filter(contract => {
      const matchesSearch = !this.searchTerm || 
        contract.leadCompany.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.contractNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.contractID.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || contract.status === this.statusFilter;
      
      const matchesDate = !this.dateFilter || 
        contract.contractDate.toDateString() === new Date(this.dateFilter).toDateString();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }

  onQuoteSelected(quoteId: string) {
    const selectedQuote = this.availableQuotes.find(q => q.quoteID === quoteId);
    if (selectedQuote) {
      this.newContract.leadID = selectedQuote.leadID;
      this.newContract.leadCompany = selectedQuote.leadCompany;
      this.newContract.contractValue = selectedQuote.totalAmount;
    }
  }

  createContract() {
    if (this.newContract.quoteID && this.newContract.contractValue) {
      this.enhancedCrmService.createContract(this.newContract).subscribe((contract: CrmContract) => {
        this.loadContracts();
        this.showCreateContractModal = false;
        this.resetNewContract();
      });
    }
  }

  resetNewContract() {
    this.newContract = {
      contractValue: 0,
      startDate: new Date(),
      endDate: new Date(),
      terms: ''
    };
  }

  viewContract(contract: CrmContract) {
    this.selectedContract = contract;
    this.showDetailsModal = true;
  }

  editContract(contract: CrmContract) {
    this.router.navigate(['/crm/contracts', contract.contractID, 'edit']);
  }

  downloadContract(contract: CrmContract) {
    // Implement PDF download functionality
    console.log('Downloading contract:', contract.contractNumber);
  }

  emailContract(contract: CrmContract) {
    // Implement email functionality
    console.log('Emailing contract:', contract.contractNumber);
  }

  // Summary calculations
  getTotalContracts(): number {
    return this.contracts.length;
  }

  getActiveContracts(): number {
    return this.contracts.filter(c => c.status === 'ACTIVE').length;
  }

  getTotalContractValue(): number {
    return this.contracts.reduce((total, contract) => total + contract.contractValue, 0);
  }

  getExpiringSoon(): number {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return this.contracts.filter(contract => 
      contract.status === 'ACTIVE' && 
      contract.endDate <= thirtyDaysFromNow
    ).length;
  }

  trackByContractId(index: number, contract: CrmContract): string {
    return contract.contractID;
  }
}