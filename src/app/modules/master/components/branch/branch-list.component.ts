import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="space-y-4">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-base font-medium text-gray-900">Branch Management</h3>
          <p class="text-xs text-gray-600">Manage company branches and offices</p>
        </div>
        <button style="background-color: #2c4170;" class="text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all text-xs font-medium">
          <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
          </svg>
          Add Branch
        </button>
      </div>

      <!-- Search and Filters -->
      <div class="flex items-center justify-between space-x-4 mb-4">
        <div class="relative flex-1 max-w-md">
          <input type="text" 
                 placeholder="Search branches..." 
                 [(ngModel)]="searchTerm"
                 class="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs">
          <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
        </div>
        <select [(ngModel)]="statusFilter" class="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs min-w-32">
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <!-- Branches Table -->
      <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manager</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let branch of getFilteredBranches()" class="hover:bg-gray-50">
                <td class="px-4 py-3 text-xs">
                  <span class="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded text-xs">{{ branch.BranchCode }}</span>
                </td>
                <td class="px-4 py-3">
                  <div>
                    <div class="text-xs font-medium text-gray-900">{{ branch.BranchName }}</div>
                    <div class="text-xs text-gray-500">{{ branch.BranchAddress }}</div>
                  </div>
                </td>
                <td class="px-4 py-3 text-xs text-gray-900">{{ branch.BranchState }}, {{ branch.BranchCountry }}</td>
                <td class="px-4 py-3 text-xs text-gray-900">{{ branch.BranchManager }}</td>
                <td class="px-4 py-3">
                  <div>
                    <div class="text-xs text-gray-900">{{ branch.BranchEmail }}</div>
                    <div class="text-xs text-gray-500">{{ branch.BranchPhone }}</div>
                  </div>
                </td>
                <td class="px-4 py-3">
                  <span [class]="getStatusBadge(branch.IsActive)">{{ branch.IsActive ? 'Active' : 'Inactive' }}</span>
                </td>
                <td class="px-4 py-3 text-xs font-medium space-x-2">
                  <button class="p-1 rounded hover:bg-blue-50 transition-colors" style="color: #2c4170;" title="Edit">
                    <span class="material-icons text-sm">edit</span>
                  </button>
                  <button class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                    <span class="material-icons text-sm">delete</span>
                  </button>
                  <button class="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-colors" title="View">
                    <span class="material-icons text-sm">visibility</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class BranchListComponent implements OnInit {
  branches: Branch[] = [];
  searchTerm = '';
  statusFilter = '';

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.loadBranches();
  }

  loadBranches() {
    this.branchService.getAllBranches().subscribe(branches => {
      this.branches = branches;
    });
  }

  getFilteredBranches(): Branch[] {
    return this.branches.filter(branch => {
      const matchesSearch = !this.searchTerm || 
        branch.BranchName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.BranchCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.BranchState.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        branch.BranchCity.toString().includes(this.searchTerm);
      
      const matchesStatus = !this.statusFilter || branch.IsActive.toString() === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  getStatusBadge(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }
}
