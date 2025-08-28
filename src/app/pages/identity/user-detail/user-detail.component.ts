import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { 
  UserDetailView, 
  TwoFactorSetupResponse, 
  TwoFactorVerificationRequest,
  LoginAttempt,
  UserSession
} from '../../../models/database.interfaces';
import { DatabaseService } from '../../../services/database.service';
import { TwoFactorSetupComponent } from '../../../components/two-factor-setup/two-factor-setup.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, TwoFactorSetupComponent],
  template: `
    <div class="space-y-6" *ngIf="user">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button routerLink="/identity/users" 
                  class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-white font-semibold text-lg">{{ getInitials() }}</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ user.fullName }}</h1>
              <p class="text-sm text-gray-600">{{ user.position }} • {{ user.department }}</p>
            </div>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button (click)="editUser()" 
                  style="background-color: #2c4170;" 
                  class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
            <svg class="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
            </svg>
            Edit User
          </button>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button (click)="activeTab = 'overview'" 
                  [class]="getTabClass('overview')">
            Overview
          </button>
          <button (click)="activeTab = 'security'" 
                  [class]="getTabClass('security')">
            Security & 2FA
          </button>
          <button (click)="activeTab = 'login-history'" 
                  [class]="getTabClass('login-history')">
            Login History
          </button>
          <button (click)="activeTab = 'sessions'" 
                  [class]="getTabClass('sessions')">
            Active Sessions
          </button>
        </nav>
      </div>

      <!-- Overview Tab -->
      <div *ngIf="activeTab === 'overview'" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Username:</span>
              <span class="text-sm text-gray-900">{{ user.userName }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Email:</span>
              <span class="text-sm text-gray-900">{{ user.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Phone:</span>
              <span class="text-sm text-gray-900">{{ user.phoneNumber || 'Not provided' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Employee ID:</span>
              <span class="text-sm text-gray-900">{{ user.employeeId || 'Not assigned' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Role:</span>
              <span class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                {{ user.roleName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Status:</span>
              <span [class]="getStatusBadgeClass(user.isActive)">
                {{ user.isActive ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Email Verified:</span>
              <span [class]="getStatusBadgeClass(user.isEmailVerified)">
                {{ user.isEmailVerified ? 'Verified' : 'Unverified' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Account Status -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Created:</span>
              <span class="text-sm text-gray-900">{{ user.createdDate | date:'medium' }}</span>
            </div>
            <div class="flex justify-between" *ngIf="user.lastLoginDate">
              <span class="text-sm font-medium text-gray-500">Last Login:</span>
              <div class="text-right">
                <div class="text-sm text-gray-900">{{ user.lastLoginDate | date:'medium' }}</div>
                <div class="text-xs text-gray-500" *ngIf="user.lastLoginLocation">{{ user.lastLoginLocation }}</div>
              </div>
            </div>
            <div class="flex justify-between" *ngIf="user.previousLoginDate">
              <span class="text-sm font-medium text-gray-500">Previous Login:</span>
              <span class="text-sm text-gray-900">{{ user.previousLoginDate | date:'medium' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Login Attempts:</span>
              <span class="text-sm text-gray-900">{{ user.loginAttempts }}</span>
            </div>
            <div class="flex justify-between" *ngIf="user.lastFailedLoginDate">
              <span class="text-sm font-medium text-gray-500">Last Failed Login:</span>
              <span class="text-sm text-red-600">{{ user.lastFailedLoginDate | date:'medium' }}</span>
            </div>
            <div class="flex justify-between" *ngIf="user.accountLocked">
              <span class="text-sm font-medium text-gray-500">Account Locked:</span>
              <span class="text-sm text-red-600">{{ user.lockoutEndDate | date:'medium' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Security & 2FA Tab -->
      <div *ngIf="activeTab === 'security'" class="space-y-6">
        <!-- Two-Factor Authentication -->
        <div class="bg-white rounded-lg shadow border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
            <span [class]="get2FAStatusBadgeClass()">
              {{ user.twoFactorEnabled ? 'Enabled' : 'Disabled' }}
            </span>
          </div>
          
          <div *ngIf="!user.twoFactorEnabled" class="space-y-4">
            <p class="text-sm text-gray-600">Two-factor authentication adds an extra layer of security to your account.</p>
            <button (click)="setup2FA()" 
                    style="background-color: #2c4170;" 
                    class="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-medium">
              Enable 2FA
            </button>
          </div>
          
          <div *ngIf="user.twoFactorEnabled" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm font-medium text-gray-500">Setup Date:</span>
                <p class="text-sm text-gray-900">{{ user.twoFactorDetails?.setupDate | date:'medium' }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Last Used:</span>
                <p class="text-sm text-gray-900">{{ (user.twoFactorDetails?.lastUsed | date:'medium') || 'Never' }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Backup Codes:</span>
                <p class="text-sm text-gray-900">{{ user.twoFactorDetails?.backupCodesRemaining || 0 }} remaining</p>
              </div>
            </div>
            
            <div class="flex space-x-3">
              <button (click)="generateBackupCodes()" 
                      class="text-blue-600 px-4 py-2 border border-blue-600 rounded-lg hover:bg-blue-50 transition-all text-sm font-medium">
                Generate Backup Codes
              </button>
              <button (click)="disable2FA()" 
                      class="text-red-600 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-all text-sm font-medium">
                Disable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Login History Tab -->
      <div *ngIf="activeTab === 'login-history'" class="space-y-6">
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Recent Login Attempts</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2FA Used</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let attempt of loginAttempts" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ attempt.attemptTime | date:'medium' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span [class]="getLoginStatusBadgeClass(attempt.isSuccessful)">
                      {{ attempt.isSuccessful ? 'Success' : 'Failed' }}
                    </span>
                    <div *ngIf="!attempt.isSuccessful && attempt.failureReason" class="text-xs text-gray-500 mt-1">
                      {{ attempt.failureReason }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ attempt.ipAddress }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ attempt.location || 'Unknown' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ getDeviceType(attempt.userAgent) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span *ngIf="attempt.twoFactorUsed" class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                      Yes
                    </span>
                    <span *ngIf="!attempt.twoFactorUsed" class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                      No
                    </span>
                  </td>
                </tr>
                <tr *ngIf="loginAttempts.length === 0">
                  <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                    No login attempts found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Active Sessions Tab -->
      <div *ngIf="activeTab === 'sessions'" class="space-y-6">
        <div class="bg-white rounded-lg shadow border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Active Sessions</h3>
            <button (click)="terminateAllSessions()" 
                    class="text-red-600 px-4 py-2 border border-red-600 rounded-lg hover:bg-red-50 transition-all text-sm font-medium">
              Terminate All Sessions
            </button>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div *ngFor="let session of activeSessions" class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ getDeviceType(session.userAgent) }}</div>
                      <div class="text-xs text-gray-500">{{ session.ipAddress }} • {{ session.location }}</div>
                    </div>
                  </div>
                  <div class="mt-2 text-xs text-gray-500">
                    Started: {{ session.startTime | date:'medium' }} • 
                    Last activity: {{ session.lastActivity | date:'medium' }}
                  </div>
                </div>
                <button (click)="terminateSession(session.sessionId)" 
                        class="text-red-600 hover:text-red-800 text-sm font-medium">
                  Terminate
                </button>
              </div>
            </div>
            <div *ngIf="activeSessions.length === 0" class="p-6 text-center text-sm text-gray-500">
              No active sessions found
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="!user" class="flex items-center justify-center h-64">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="text-gray-600 mt-4">Loading user details...</p>
      </div>
    </div>

    <!-- Two-Factor Setup Component -->
    <app-two-factor-setup 
      [isVisible]="show2FASetup"
      [userId]="userId"
      (setupComplete)="on2FASetupComplete($event)"
      (setupCancelled)="on2FASetupCancelled()">
    </app-two-factor-setup>
  `
})
export class UserDetailComponent implements OnInit {
  activeTab = 'overview';
  user?: UserDetailView;
  userId!: number;
  
  // 2FA Setup
  show2FASetup = false;
  twoFactorSetup?: TwoFactorSetupResponse;
  verificationCode = '';
  
  // Login History
  loginAttempts: LoginAttempt[] = [];
  activeSessions: UserSession[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      console.log('User detail page loading for userId:', this.userId, 'from params:', params);
      this.loadUserDetails();
      this.loadLoginHistory();
      this.loadActiveSessions();
    });
  }

  // Mock users data - same as users listing component
  private mockUsers: UserDetailView[] = [
    {
      id: 1,
      userName: 'john.doe',
      email: 'john.doe@ltindia.com',
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      phoneNumber: '+91 9876543210',
      profilePicture: '',
      department: 'IT',
      position: 'Senior Developer',
      employeeId: 'EMP001',
      status: 'Active',
      isActive: true,
      isLocked: false,
      isEmailVerified: true,
      twoFactorEnabled: true,
      twoFactorSetupDate: new Date('2024-01-16'),
      createdDate: new Date('2024-01-15'),
      lastLoginDate: new Date('2024-08-26T14:30:00'),
      lastLoginLocation: 'Mumbai, India',
      previousLoginDate: new Date('2024-08-25T09:15:00'),
      loginAttempts: 125,
      lastFailedLoginDate: undefined,
      roleId: 1,
      roleName: 'Admin',
      accountLocked: false,
      lockoutEndDate: undefined,
      securityQuestions: [],
      recentLogins: [],
      activeSession: undefined,
      twoFactorDetails: {
        enabled: true,
        setupDate: new Date('2024-01-16'),
        lastUsed: new Date('2024-08-26T14:30:00'),
        backupCodesRemaining: 8
      },
      createdBy: 'System Admin',
      modifiedDate: new Date('2024-01-20'),
      modifiedBy: 'System Admin'
    },
    {
      id: 2,
      userName: 'jane.smith',
      email: 'jane.smith@ltindia.com',
      firstName: 'Jane',
      lastName: 'Smith',
      fullName: 'Jane Smith',
      phoneNumber: '+91 9876543211',
      profilePicture: '',
      department: 'HR',
      position: 'HR Manager',
      employeeId: 'EMP002',
      status: 'Active',
      isActive: true,
      isLocked: false,
      isEmailVerified: true,
      twoFactorEnabled: false,
      twoFactorSetupDate: undefined,
      createdDate: new Date('2024-01-20'),
      lastLoginDate: new Date('2024-08-25T16:45:00'),
      lastLoginLocation: 'Mumbai, India',
      previousLoginDate: new Date('2024-08-24T11:30:00'),
      loginAttempts: 89,
      lastFailedLoginDate: undefined,
      roleId: 2,
      roleName: 'Manager',
      accountLocked: false,
      lockoutEndDate: undefined,
      securityQuestions: [],
      recentLogins: [],
      activeSession: undefined,
      twoFactorDetails: {
        enabled: false,
        setupDate: undefined,
        lastUsed: undefined,
        backupCodesRemaining: 0
      },
      createdBy: 'System Admin',
      modifiedDate: new Date('2024-01-25'),
      modifiedBy: 'System Admin'
    },
    {
      id: 3,
      userName: 'mike.johnson',
      email: 'mike.johnson@ltindia.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      fullName: 'Mike Johnson',
      phoneNumber: '+91 9876543212',
      profilePicture: '',
      department: 'Finance',
      position: 'Financial Analyst',
      employeeId: 'EMP003',
      status: 'Inactive',
      isActive: false,
      isLocked: false,
      isEmailVerified: true,
      twoFactorEnabled: false,
      twoFactorSetupDate: undefined,
      createdDate: new Date('2024-02-01'),
      lastLoginDate: new Date('2024-08-20T10:15:00'),
      lastLoginLocation: 'Delhi, India',
      previousLoginDate: new Date('2024-08-15T14:22:00'),
      loginAttempts: 67,
      lastFailedLoginDate: undefined,
      roleId: 3,
      roleName: 'User',
      accountLocked: false,
      lockoutEndDate: undefined,
      securityQuestions: [],
      recentLogins: [],
      activeSession: undefined,
      twoFactorDetails: {
        enabled: false,
        setupDate: undefined,
        lastUsed: undefined,
        backupCodesRemaining: 0
      },
      createdBy: 'System Admin',
      modifiedDate: new Date('2024-02-05'),
      modifiedBy: 'HR Manager'
    },
    {
      id: 4,
      userName: 'sarah.wilson',
      email: 'sarah.wilson@ltindia.com',
      firstName: 'Sarah',
      lastName: 'Wilson',
      fullName: 'Sarah Wilson',
      phoneNumber: '+91 9876543213',
      profilePicture: '',
      department: 'Operations',
      position: 'Operations Lead',
      employeeId: 'EMP004',
      status: 'Locked',
      isActive: true,
      isLocked: true,
      isEmailVerified: false,
      twoFactorEnabled: true,
      twoFactorSetupDate: new Date('2024-02-11'),
      createdDate: new Date('2024-02-10'),
      lastLoginDate: new Date('2024-08-24T12:20:00'),
      lastLoginLocation: 'Bangalore, India',
      previousLoginDate: new Date('2024-08-23T10:45:00'),
      loginAttempts: 234,
      lastFailedLoginDate: new Date('2024-08-23T09:30:00'),
      roleId: 2,
      roleName: 'Manager',
      accountLocked: true,
      lockoutEndDate: new Date('2024-08-26T09:30:00'),
      securityQuestions: [],
      recentLogins: [],
      activeSession: undefined,
      twoFactorDetails: {
        enabled: true,
        setupDate: new Date('2024-02-11'),
        lastUsed: new Date('2024-08-24T12:20:00'),
        backupCodesRemaining: 5
      },
      createdBy: 'System Admin',
      modifiedDate: new Date('2024-08-23'),
      modifiedBy: 'Security Team'
    },
    {
      id: 5,
      userName: 'david.brown',
      email: 'david.brown@ltindia.com',
      firstName: 'David',
      lastName: 'Brown',
      fullName: 'David Brown',
      phoneNumber: '+91 9876543214',
      profilePicture: '',
      department: 'Sales',
      position: 'Sales Executive',
      employeeId: 'EMP005',
      status: 'Active',
      isActive: true,
      isLocked: false,
      isEmailVerified: true,
      twoFactorEnabled: false,
      twoFactorSetupDate: undefined,
      createdDate: new Date('2024-03-01'),
      lastLoginDate: new Date('2024-08-26T09:30:00'),
      lastLoginLocation: 'Chennai, India',
      previousLoginDate: new Date('2024-08-25T16:15:00'),
      loginAttempts: 156,
      lastFailedLoginDate: undefined,
      roleId: 4,
      roleName: 'Viewer',
      accountLocked: false,
      lockoutEndDate: undefined,
      securityQuestions: [],
      recentLogins: [],
      activeSession: undefined,
      twoFactorDetails: {
        enabled: false,
        setupDate: undefined,
        lastUsed: undefined,
        backupCodesRemaining: 0
      },
      createdBy: 'System Admin',
      modifiedDate: new Date('2024-03-05'),
      modifiedBy: 'System Admin'
    }
  ];

  loadUserDetails(): void {
    // Find user by ID from mock data
    const foundUser = this.mockUsers.find(u => u.id === this.userId);
    
    if (foundUser) {
      this.user = foundUser;
      console.log('Loaded user details for ID:', this.userId, this.user);
    } else {
      console.error('User not found with ID:', this.userId);
      // Handle user not found case - redirect back to users list
      this.router.navigate(['/identity/users']);
    }
  }

  loadLoginHistory(): void {
    // Mock login attempts data
    this.loginAttempts = [
      {
        id: 1,
        userId: this.userId,
        attemptTime: new Date('2024-01-21T10:30:00'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Mumbai, India',
        isSuccessful: true,
        twoFactorUsed: false
      },
      {
        id: 2,
        userId: this.userId,
        attemptTime: new Date('2024-01-20T09:15:00'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Mumbai, India',
        isSuccessful: true,
        twoFactorUsed: false
      },
      {
        id: 3,
        userId: this.userId,
        attemptTime: new Date('2024-01-19T08:45:00'),
        ipAddress: '203.192.123.45',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)',
        location: 'Delhi, India',
        isSuccessful: false,
        failureReason: 'Invalid password',
        twoFactorUsed: false
      }
    ];
  }

  loadActiveSessions(): void {
    // Mock active sessions data
    this.activeSessions = [
      {
        sessionId: 'sess_123456',
        startTime: new Date('2024-01-21T10:30:00'),
        lastActivity: new Date('2024-01-21T14:15:00'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        deviceType: 'Desktop',
        location: 'Mumbai, India',
        isActive: true
      }
    ];
  }

  getTabClass(tab: string): string {
    const baseClasses = 'py-2 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer';
    return tab === this.activeTab
      ? `${baseClasses} border-blue-500 text-blue-600`
      : `${baseClasses} border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300`;
  }

  getInitials(): string {
    if (!this.user) return '';
    return `${this.user.firstName.charAt(0)}${this.user.lastName.charAt(0)}`;
  }

  getStatusBadgeClass(isActive: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isActive 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  get2FAStatusBadgeClass(): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return this.user?.twoFactorEnabled 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-yellow-100 text-yellow-800`;
  }

  getLoginStatusBadgeClass(isSuccessful: boolean): string {
    const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full';
    return isSuccessful 
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  }

  getDeviceType(userAgent: string): string {
    if (userAgent.includes('iPhone') || userAgent.includes('Android')) {
      return 'Mobile';
    } else if (userAgent.includes('iPad') || userAgent.includes('Tablet')) {
      return 'Tablet';
    } else {
      return 'Desktop';
    }
  }

  editUser(): void {
    this.router.navigate(['/identity/users', this.userId, 'edit']);
  }

  // 2FA Methods
  setup2FA(): void {
    this.show2FASetup = true;
  }

  disable2FA(): void {
    if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
      // In real implementation, would require current password and 2FA token
      console.log('Disabling 2FA for user:', this.userId);
      this.user!.twoFactorEnabled = false;
      this.user!.twoFactorDetails!.enabled = false;
    }
  }

  generateBackupCodes(): void {
    this.databaseService.generateBackupCodes(this.userId).subscribe(
      (codes) => {
        // Show backup codes modal or download
        console.log('Generated backup codes:', codes);
        alert('New backup codes generated. Please save them securely.');
      },
      (error) => {
        console.error('Error generating backup codes:', error);
      }
    );
  }

  terminateSession(sessionId: string): void {
    if (confirm('Are you sure you want to terminate this session?')) {
      this.databaseService.terminateSession(sessionId).subscribe(
        () => {
          this.activeSessions = this.activeSessions.filter(s => s.sessionId !== sessionId);
        },
        (error) => {
          console.error('Error terminating session:', error);
        }
      );
    }
  }

  terminateAllSessions(): void {
    if (confirm('Are you sure you want to terminate all sessions? This will log out the user from all devices.')) {
      this.databaseService.terminateAllSessions(this.userId).subscribe(
        () => {
          this.activeSessions = [];
        },
        (error) => {
          console.error('Error terminating all sessions:', error);
        }
      );
    }
  }

  // 2FA Setup Component Event Handlers
  on2FASetupComplete(success: boolean): void {
    if (success) {
      this.show2FASetup = false;
      if (this.user) {
        this.user.twoFactorEnabled = true;
        if (this.user.twoFactorDetails) {
          this.user.twoFactorDetails.enabled = true;
          this.user.twoFactorDetails.setupDate = new Date();
        }
      }
      // Refresh user data
      this.loadUserDetails();
    }
  }

  on2FASetupCancelled(): void {
    this.show2FASetup = false;
  }
}
