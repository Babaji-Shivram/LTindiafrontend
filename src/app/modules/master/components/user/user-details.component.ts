import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User, UserDetail, UserType, UserWithDetails } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <!-- Header -->
      <div class="border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-semibold text-gray-900">User Details</h1>
            <p class="text-sm text-gray-600 mt-1">
              Complete information for {{ user?.sName }}
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              type="button"
              (click)="editUser()"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Edit User
            </button>
            <button
              type="button"
              (click)="goBack()"
              class="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm font-medium">
              Back to List
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="loading" class="p-6">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>

      <!-- User Not Found -->
      <div *ngIf="!loading && !user" class="p-6 text-center">
        <div class="text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">User not found</h3>
          <p class="mt-1 text-sm text-gray-500">The requested user could not be found.</p>
          <div class="mt-6">
            <button
              type="button"
              (click)="goBack()"
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Back to Users
            </button>
          </div>
        </div>
      </div>

      <!-- User Details Content -->
      <div *ngIf="!loading && user" class="p-6">
        <div class="space-y-8">
          <!-- Status Banner -->
          <div *ngIf="user.bDel" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Deactivated User</h3>
                <p class="text-sm text-red-700 mt-1">This user account has been deactivated and cannot access the system.</p>
              </div>
            </div>
          </div>

          <!-- Basic Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Basic Information
            </h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">User Name</label>
                  <div class="mt-1 flex items-center">
                    <p class="text-sm text-gray-900">{{ user.sName }}</p>
                    <span *ngIf="user.hod === 'Y'" class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      HOD
                    </span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Employee Code</label>
                  <p class="mt-1 text-sm text-gray-900 font-mono">{{ user.empCode }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">User Type</label>
                  <div class="mt-1">
                    <span [class]="getUserTypeBadgeClass(user.lType)">
                      {{ getUserTypeLabel(user.lType) }}
                    </span>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Status</label>
                  <div class="mt-1">
                    <span [class]="user.bDel ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800' : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'">
                      {{ user.bDel ? 'Inactive' : 'Active' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Email Address</label>
                  <a [href]="'mailto:' + user.email" class="mt-1 text-sm text-blue-600 hover:text-blue-800">
                    {{ user.email }}
                  </a>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Contact Number</label>
                  <a [href]="'tel:' + user.contactNo" class="mt-1 text-sm text-blue-600 hover:text-blue-800">
                    {{ user.contactNo }}
                  </a>
                </div>
                <div *ngIf="user.userDetail?.mobile && user.userDetail?.mobile !== user.contactNo">
                  <label class="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <a [href]="'tel:' + user.userDetail?.mobile" class="mt-1 text-sm text-blue-600 hover:text-blue-800">
                    {{ user.userDetail?.mobile }}
                  </a>
                </div>
                <div *ngIf="user.userDetail?.address">
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <p class="mt-1 text-sm text-gray-900">{{ user.userDetail?.address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Organizational Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Organizational Information
            </h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getDepartmentName(user.deptId) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Role</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getRoleName(user.lRoleId) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Designation</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getDesignationName(user.designId) }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Branch</label>
                  <p class="mt-1 text-sm text-gray-900">{{ getBranchName(user.branchId) }}</p>
                </div>
                <div *ngIf="user.divId">
                  <label class="block text-sm font-medium text-gray-700">Division</label>
                  <p class="mt-1 text-sm text-gray-900">{{ user.divId }}</p>
                </div>
                <div *ngIf="user.userDetail?.empName && user.userDetail?.empName !== user.sName">
                  <label class="block text-sm font-medium text-gray-700">Employee Name</label>
                  <p class="mt-1 text-sm text-gray-900">{{ user.userDetail?.empName }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <svg class="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              System Information
            </h2>
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">User ID</label>
                  <p class="mt-1 text-sm text-gray-900 font-mono">{{ user.lId }}</p>
                </div>
                <div *ngIf="user.userDetail?.lUser">
                  <label class="block text-sm font-medium text-gray-700">Created By</label>
                  <p class="mt-1 text-sm text-gray-900">User ID: {{ user.userDetail?.lUser }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Account Type</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ user.lType === userTypes.INTERNAL ? 'Internal User' : 'Other User' }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Department Head</label>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ user.hod === 'Y' ? 'Yes' : 'No' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserDetailsComponent implements OnInit {
  user: UserWithDetails | null = null;
  loading = true;
  userId: number | undefined = undefined;
  userTypes = UserType;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userId = +params['id'];
        this.loadUser();
      } else {
        this.goBack();
      }
    });
  }

  loadUser(): void {
    if (this.userId) {
      this.loading = true;
      this.userService.getUserById(this.userId).subscribe({
        next: (user: UserWithDetails | undefined) => {
          this.user = user || null;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading user:', error);
          this.loading = false;
        }
      });
    }
  }

  editUser(): void {
    if (this.userId) {
      this.router.navigate(['/masters/users/edit', this.userId]);
    }
  }

  goBack(): void {
    this.router.navigate(['/masters/users']);
  }

  getUserTypeLabel(type: number): string {
    switch (type) {
      case UserType.INTERNAL:
        return 'Internal User';
      case UserType.OTHER:
        return 'Other User';
      default:
        return 'Unknown';
    }
  }

  getUserTypeBadgeClass(type: number): string {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    switch (type) {
      case UserType.INTERNAL:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case UserType.OTHER:
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getDepartmentName(deptId: number): string {
    const departments: { [key: number]: string } = {
      1: 'Information Technology',
      2: 'Human Resources',
      3: 'Finance',
      4: 'Operations',
      5: 'Sales & Marketing'
    };
    return departments[deptId] || `Department ${deptId}`;
  }

  getRoleName(roleId: number): string {
    const roles: { [key: number]: string } = {
      1: 'Admin',
      2: 'Manager',
      3: 'User',
      4: 'Viewer'
    };
    return roles[roleId] || `Role ${roleId}`;
  }

  getDesignationName(designId: number): string {
    const designations: { [key: number]: string } = {
      1: 'Manager',
      2: 'Senior Executive',
      3: 'Executive',
      4: 'Assistant'
    };
    return designations[designId] || `Designation ${designId}`;
  }

  getBranchName(branchId: number): string {
    const branches: { [key: number]: string } = {
      1: 'Mumbai Branch',
      2: 'Delhi Branch',
      3: 'Chennai Branch',
      4: 'Bangalore Branch'
    };
    return branches[branchId] || `Branch ${branchId}`;
  }
}
