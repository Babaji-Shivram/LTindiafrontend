import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="page-title">Master Data Management</h1>
        <p class="secondary-text mt-2">Centralized management of organizational reference data</p>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🌍</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Geography Masters</p>
                <p class="page-title text-gray-900">{{ getTotalCountByCategory('geography') | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">💱</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Finance Masters</p>
                <p class="page-title text-gray-900">{{ getTotalCountByCategory('finance') | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🏢</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Organizational Masters</p>
                <p class="page-title text-gray-900">{{ getTotalCountByCategory('organizational') | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">🤝</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Business Masters</p>
                <p class="page-title text-gray-900">{{ getTotalCountByCategory('business') | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span class="text-xl">📏</span>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Operational Masters</p>
                <p class="page-title text-gray-900">{{ getTotalCountByCategory('operational') | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="detail-label text-gray-500">Total Masters</p>
                <p class="page-title text-gray-900">{{ getTotalMasterCount() | number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Access -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Quick Access</h3>
          <p class="mt-1 text-sm text-gray-500">Navigate to specific master data using the sidebar menu</p>
        </div>
        <div class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">🌍</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Geography Masters</p>
                <p class="text-xs text-gray-500">Countries, States, Cities, Ports, Branches</p>
              </div>
            </div>
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">💱</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Finance Masters</p>
                <p class="text-xs text-gray-500">Currencies, Tax Rates, Payment Terms</p>
              </div>
            </div>
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">🏢</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Organizational Masters</p>
                <p class="text-xs text-gray-500">Departments, Designations</p>
              </div>
            </div>
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">🤝</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Business Masters</p>
                <p class="text-xs text-gray-500">Parties, Commodities, Vessels, Services</p>
              </div>
            </div>
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">📏</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Operational Masters</p>
                <p class="text-xs text-gray-500">UOM, Incoterms, Document Types, Status Codes</p>
              </div>
            </div>
            <div class="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <span class="text-lg mr-3">🔢</span>
              <div>
                <p class="table-cell font-medium text-gray-900">Reference Data</p>
                <p class="text-xs text-gray-500">HSN Codes, Standard Classifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class MastersComponent {
  // Mock data counts for demonstration
  private masterCounts = {
    geography: { country: 195, state: 1246, city: 4871, port: 892, branch: 8 },
    finance: { currency: 168, 'tax-rate': 45, 'payment-terms': 12 },
    organizational: { department: 24, designation: 67 },
    business: { party: 1567, commodity: 345, vessel: 234, 'container-type': 45, service: 89 },
    operational: { uom: 156, incoterm: 11, 'document-type': 23, status: 34, 'hsn-code': 9876 }
  };

  getTotalCountByCategory(category: keyof typeof this.masterCounts): number {
    const categoryData = this.masterCounts[category];
    return Object.values(categoryData).reduce((sum, count) => sum + count, 0);
  }

  getTotalMasterCount(): number {
    return Object.keys(this.masterCounts).reduce((total, category) => {
      return total + this.getTotalCountByCategory(category as keyof typeof this.masterCounts);
    }, 0);
  }
}
