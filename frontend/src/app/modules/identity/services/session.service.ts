import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSession, User, UserPermissionDetail } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private currentSessionSubject = new BehaviorSubject<UserSession | null>(null);
  public currentSession$ = this.currentSessionSubject.asObservable();

  // Global Variables for Backend Integration
  private _glEmpName: string = '';
  private _glCompanyId: number = 1;
  private _glModuleId: number | null = null;

  constructor() {
    this.initializeFromStorage();
  }

  // Global Employee Name (Backend Variable)
  get glEmpName(): string {
    return this._glEmpName;
  }

  set glEmpName(value: string) {
    this._glEmpName = value;
    this.saveToStorage();
  }

  // Global Company ID (Backend Variable)
  get glCompanyId(): number {
    return this._glCompanyId;
  }

  set glCompanyId(value: number) {
    this._glCompanyId = value;
    this.saveToStorage();
  }

  // Global Module ID (Backend Variable)
  get glModuleId(): number | null {
    return this._glModuleId;
  }

  set glModuleId(value: number | null) {
    this._glModuleId = value;
    this.saveToStorage();
  }

  // Initialize Session
  initializeSession(user: User, sessionToken: string): void {
    const session: UserSession = {
      user_id: user.id || 0,
      glEmpName: `${user.first_name} ${user.last_name}`,
      glCompanyId: user.company_id || 1,
      glModuleId: undefined,
      session_token: sessionToken,
      login_time: new Date(),
      last_activity: new Date(),
      permissions: user.user_permissions || []
    };

    // Set global variables
    this.glEmpName = session.glEmpName;
    this.glCompanyId = session.glCompanyId;
    this.glModuleId = session.glModuleId || null;

    this.currentSessionSubject.next(session);
    this.saveToStorage();
  }

  // Update Last Activity
  updateActivity(): void {
    const session = this.currentSessionSubject.value;
    if (session) {
      session.last_activity = new Date();
      this.currentSessionSubject.next(session);
      this.saveToStorage();
    }
  }

  // Set Current Module
  setCurrentModule(moduleId: number): void {
    this.glModuleId = moduleId;
    const session = this.currentSessionSubject.value;
    if (session) {
      session.glModuleId = moduleId;
      this.currentSessionSubject.next(session);
      this.saveToStorage();
    }
  }

  // Check Module Permission
  hasModuleAccess(moduleId: number): boolean {
    const session = this.currentSessionSubject.value;
    if (!session) return false;

    return session.permissions.some(p => 
      p.module_id === moduleId && p.has_access
    );
  }

  // Check Page Permission
  hasPageAccess(moduleId: number, pageId: number, permissionType: 'P' | 'R' | 'M' = 'P'): boolean {
    const session = this.currentSessionSubject.value;
    if (!session) return false;

    return session.permissions.some(p => 
      p.module_id === moduleId && 
      p.page_id === pageId && 
      p.permission_type === permissionType && 
      p.has_access
    );
  }

  // Get User Permissions for Module
  getModulePermissions(moduleId: number): UserPermissionDetail[] {
    const session = this.currentSessionSubject.value;
    if (!session) return [];

    return session.permissions.filter(p => p.module_id === moduleId);
  }

  // Clear Session
  clearSession(): void {
    this._glEmpName = '';
    this._glCompanyId = 1;
    this._glModuleId = null;
    this.currentSessionSubject.next(null);
    this.clearStorage();
  }

  // Session Validation
  isSessionValid(): boolean {
    const session = this.currentSessionSubject.value;
    if (!session) return false;

    // Check if session is expired (24 hours)
    const sessionAge = Date.now() - session.login_time.getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    return sessionAge < maxAge;
  }

  // Get Current User ID
  getCurrentUserId(): number | null {
    const session = this.currentSessionSubject.value;
    return session?.user_id || null;
  }

  // Get Session Token
  getSessionToken(): string | null {
    const session = this.currentSessionSubject.value;
    return session?.session_token || null;
  }

  // Storage Management
  private saveToStorage(): void {
    const session = this.currentSessionSubject.value;
    if (session) {
      localStorage.setItem('user_session', JSON.stringify(session));
    }
    
    // Save global variables separately for backend compatibility
    localStorage.setItem('glEmpName', this._glEmpName);
    localStorage.setItem('glCompanyId', this._glCompanyId.toString());
    if (this._glModuleId !== null) {
      localStorage.setItem('glModuleId', this._glModuleId.toString());
    } else {
      localStorage.removeItem('glModuleId');
    }
  }

  private initializeFromStorage(): void {
    try {
      // Load session
      const sessionData = localStorage.getItem('user_session');
      if (sessionData) {
        const session = JSON.parse(sessionData) as UserSession;
        // Convert dates back from strings
        session.login_time = new Date(session.login_time);
        session.last_activity = new Date(session.last_activity);
        
        if (this.isSessionValidForData(session)) {
          this.currentSessionSubject.next(session);
        }
      }

      // Load global variables
      this._glEmpName = localStorage.getItem('glEmpName') || '';
      this._glCompanyId = parseInt(localStorage.getItem('glCompanyId') || '1');
      const moduleId = localStorage.getItem('glModuleId');
      this._glModuleId = moduleId ? parseInt(moduleId) : null;

    } catch (error) {
      console.error('Error loading session from storage:', error);
      this.clearStorage();
    }
  }

  private isSessionValidForData(session: UserSession): boolean {
    const sessionAge = Date.now() - new Date(session.login_time).getTime();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    return sessionAge < maxAge;
  }

  private clearStorage(): void {
    localStorage.removeItem('user_session');
    localStorage.removeItem('glEmpName');
    localStorage.removeItem('glCompanyId');
    localStorage.removeItem('glModuleId');
  }

  // Debug Methods
  getGlobalVariables(): { glEmpName: string; glCompanyId: number; glModuleId: number | null } {
    return {
      glEmpName: this._glEmpName,
      glCompanyId: this._glCompanyId,
      glModuleId: this._glModuleId
    };
  }

  setGlobalVariables(empName: string, companyId: number, moduleId?: number): void {
    this.glEmpName = empName;
    this.glCompanyId = companyId;
    if (moduleId !== undefined) {
      this.glModuleId = moduleId;
    }
  }
}
