import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  FrontendUser, 
  FrontendRole, 
  FrontendPermission,
  UserListResponse,
  RoleListResponse,
  PermissionListResponse,
  CreateUserRequest,
  UpdateUserRequest,
  CreateRoleRequest,
  UpdateRoleRequest,
  UserFilterOptions,
  RoleFilterOptions,
  TwoFactorSetupResponse,
  TwoFactorVerificationRequest,
  TwoFactorVerificationResponse,
  TwoFactorDisableRequest,
  UserLoginHistory,
  LoginAttempt,
  UserSession,
  UserDetailView
} from '../models/database.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:5200/api/v1'; // Gateway URL

  constructor(private http: HttpClient) { }

  // User Management APIs
  getUsers(filters?: UserFilterOptions, page: number = 1, pageSize: number = 10): Observable<UserListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.roleId) params = params.set('roleId', filters.roleId.toString());
      if (filters.status) params = params.set('status', filters.status);
      if (filters.department) params = params.set('department', filters.department);
      if (filters.isEmailVerified !== undefined) params = params.set('isEmailVerified', filters.isEmailVerified.toString());
      if (filters.twoFactorEnabled !== undefined) params = params.set('twoFactorEnabled', filters.twoFactorEnabled.toString());
      if (filters.createdDateFrom) params = params.set('createdDateFrom', filters.createdDateFrom.toISOString());
      if (filters.createdDateTo) params = params.set('createdDateTo', filters.createdDateTo.toISOString());
    }

    return this.http.get<UserListResponse>(`${this.apiUrl}/users`, { params });
  }

  // Get all users without pagination
  getAllUsers(filters?: UserFilterOptions): Observable<UserListResponse> {
    let params = new HttpParams()
      .set('page', '1')
      .set('pageSize', '-1'); // -1 means get all users

    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.roleId) params = params.set('roleId', filters.roleId.toString());
      if (filters.status) params = params.set('status', filters.status);
      if (filters.department) params = params.set('department', filters.department);
      if (filters.isEmailVerified !== undefined) params = params.set('isEmailVerified', filters.isEmailVerified.toString());
      if (filters.twoFactorEnabled !== undefined) params = params.set('twoFactorEnabled', filters.twoFactorEnabled.toString());
      if (filters.createdDateFrom) params = params.set('createdDateFrom', filters.createdDateFrom.toISOString());
      if (filters.createdDateTo) params = params.set('createdDateTo', filters.createdDateTo.toISOString());
    }

    return this.http.get<UserListResponse>(`${this.apiUrl}/users`, { params });
  }

  getUserById(id: number): Observable<FrontendUser> {
    return this.http.get<FrontendUser>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<FrontendUser> {
    return this.http.post<FrontendUser>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: UpdateUserRequest): Observable<FrontendUser> {
    return this.http.put<FrontendUser>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  activateUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/activate`, {});
  }

  deactivateUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/deactivate`, {});
  }

  unlockUser(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/unlock`, {});
  }

  resetPassword(id: number, newPassword: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/reset-password`, { newPassword });
  }

  // Role Management APIs
  getRoles(filters?: RoleFilterOptions, page: number = 1, pageSize: number = 10): Observable<RoleListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filters) {
      if (filters.search) params = params.set('search', filters.search);
      if (filters.isActive !== undefined) params = params.set('isActive', filters.isActive.toString());
      if (filters.isSystemRole !== undefined) params = params.set('isSystemRole', filters.isSystemRole.toString());
      if (filters.moduleName) params = params.set('moduleName', filters.moduleName);
      if (filters.hasUsers !== undefined) params = params.set('hasUsers', filters.hasUsers.toString());
    }

    return this.http.get<RoleListResponse>(`${this.apiUrl}/roles`, { params });
  }

  getRoleById(id: number): Observable<FrontendRole> {
    return this.http.get<FrontendRole>(`${this.apiUrl}/roles/${id}`);
  }

  createRole(role: CreateRoleRequest): Observable<FrontendRole> {
    return this.http.post<FrontendRole>(`${this.apiUrl}/roles`, role);
  }

  updateRole(role: UpdateRoleRequest): Observable<FrontendRole> {
    return this.http.put<FrontendRole>(`${this.apiUrl}/roles/${role.id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/roles/${id}`);
  }

  getRolePermissions(roleId: number): Observable<FrontendPermission[]> {
    return this.http.get<FrontendPermission[]>(`${this.apiUrl}/roles/${roleId}/permissions`);
  }

  updateRolePermissions(roleId: number, permissionIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/roles/${roleId}/permissions`, { permissionIds });
  }

  // Permission Management APIs
  getPermissions(): Observable<PermissionListResponse> {
    return this.http.get<PermissionListResponse>(`${this.apiUrl}/permissions`);
  }

  getPermissionsByModule(moduleName: string): Observable<FrontendPermission[]> {
    return this.http.get<FrontendPermission[]>(`${this.apiUrl}/permissions/module/${moduleName}`);
  }

  // Dashboard Analytics APIs
  getUserStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/users`);
  }

  getRoleStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/roles`);
  }

  getLoginStatistics(days: number = 30): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/logins?days=${days}`);
  }

  getSystemHealth(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/analytics/system-health`);
  }

  // Audit and Activity APIs
  getRecentActivity(limit: number = 10): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/audit/recent-activity?limit=${limit}`);
  }

  getUserActivity(userId: number, days: number = 30): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/audit/user-activity/${userId}?days=${days}`);
  }

  // Authentication APIs
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/logout`, {});
  }

  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/refresh-token`, {});
  }

  changePassword(currentPassword: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/change-password`, { 
      currentPassword, 
      newPassword 
    });
  }

  // Two-Factor Authentication APIs
  setup2FA(userId: number): Observable<TwoFactorSetupResponse> {
    return this.http.post<TwoFactorSetupResponse>(`${this.apiUrl}/auth/2fa/setup`, { userId });
  }

  verify2FASetup(request: TwoFactorVerificationRequest): Observable<TwoFactorVerificationResponse> {
    return this.http.post<TwoFactorVerificationResponse>(`${this.apiUrl}/auth/2fa/verify-setup`, request);
  }

  verify2FA(request: TwoFactorVerificationRequest): Observable<TwoFactorVerificationResponse> {
    return this.http.post<TwoFactorVerificationResponse>(`${this.apiUrl}/auth/2fa/verify`, request);
  }

  disable2FA(request: TwoFactorDisableRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/2fa/disable`, request);
  }

  generateBackupCodes(userId: number): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/auth/2fa/backup-codes`, { userId });
  }

  // Login History APIs
  getUserLoginHistory(userId: number, days: number = 30): Observable<UserLoginHistory> {
    return this.http.get<UserLoginHistory>(`${this.apiUrl}/users/${userId}/login-history?days=${days}`);
  }

  getLoginAttempts(userId: number, limit: number = 10): Observable<LoginAttempt[]> {
    return this.http.get<LoginAttempt[]>(`${this.apiUrl}/users/${userId}/login-attempts?limit=${limit}`);
  }

  getUserSessions(userId: number): Observable<UserSession[]> {
    return this.http.get<UserSession[]>(`${this.apiUrl}/users/${userId}/sessions`);
  }

  terminateSession(sessionId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/sessions/${sessionId}`);
  }

  terminateAllSessions(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}/sessions`);
  }

  // Profile Management APIs
  getCurrentUser(): Observable<FrontendUser> {
    return this.http.get<FrontendUser>(`${this.apiUrl}/profile/me`);
  }

  updateProfile(profile: Partial<FrontendUser>): Observable<FrontendUser> {
    return this.http.put<FrontendUser>(`${this.apiUrl}/profile/me`, profile);
  }

  uploadProfilePicture(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return this.http.post<string>(`${this.apiUrl}/profile/upload-picture`, formData);
  }

  // User Detail APIs
  getUserDetail(id: number): Observable<UserDetailView> {
    return this.http.get<UserDetailView>(`${this.apiUrl}/users/${id}/detail`);
  }
}
