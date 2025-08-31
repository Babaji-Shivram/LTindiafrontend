import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { User, UserType, LoginRequest, LoginResponse } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Backend URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {
    // Check if user is already authenticated on service initialization
    this.checkAuthenticationStatus();
  }

  // Login Method
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    // For now, simulate login with mock data until backend is ready
    if (this.isMockMode()) {
      return this.mockLogin(loginRequest);
    }

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.success && response.user && response.token) {
            this.handleSuccessfulLogin(response.user, response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  // Mock Login for Development
  private mockLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return new Observable<LoginResponse>(observer => {
      // Simulate API delay
      setTimeout(() => {
        // Mock validation
        if (loginRequest.username === 'admin' && loginRequest.password === 'admin') {
          const mockUser: User = {
            id: 1,
            employee_code: 'admin',
            email: 'admin@ltindia.com',
            first_name: 'System',
            last_name: 'Administrator',
            user_type: UserType.ADMIN,
            is_hod: false,
            status: 'Active',
            company_id: 1,
            created_at: new Date(),
            user_permissions: [
              // Full CRM Access
              { module_id: 1, page_id: 101, module_name: 'CRM', page_name: 'Leads', permission_type: 'R', has_access: true },
              { module_id: 1, page_id: 101, module_name: 'CRM', page_name: 'Leads', permission_type: 'P', has_access: true },
              { module_id: 1, page_id: 101, module_name: 'CRM', page_name: 'Leads', permission_type: 'M', has_access: true },
              { module_id: 1, page_id: 102, module_name: 'CRM', page_name: 'Accounts', permission_type: 'R', has_access: true },
              { module_id: 1, page_id: 102, module_name: 'CRM', page_name: 'Accounts', permission_type: 'P', has_access: true },
              { module_id: 1, page_id: 102, module_name: 'CRM', page_name: 'Accounts', permission_type: 'M', has_access: true },
              { module_id: 1, page_id: 103, module_name: 'CRM', page_name: 'Opportunities', permission_type: 'R', has_access: true },
              { module_id: 1, page_id: 103, module_name: 'CRM', page_name: 'Opportunities', permission_type: 'P', has_access: true },
              { module_id: 1, page_id: 103, module_name: 'CRM', page_name: 'Opportunities', permission_type: 'M', has_access: true },
              
              // Full Masters Access
              { module_id: 2, page_id: 201, module_name: 'Masters', page_name: 'Parties', permission_type: 'R', has_access: true },
              { module_id: 2, page_id: 201, module_name: 'Masters', page_name: 'Parties', permission_type: 'P', has_access: true },
              { module_id: 2, page_id: 201, module_name: 'Masters', page_name: 'Parties', permission_type: 'M', has_access: true },
              { module_id: 2, page_id: 202, module_name: 'Masters', page_name: 'Ports', permission_type: 'R', has_access: true },
              { module_id: 2, page_id: 202, module_name: 'Masters', page_name: 'Ports', permission_type: 'P', has_access: true },
              { module_id: 2, page_id: 202, module_name: 'Masters', page_name: 'Ports', permission_type: 'M', has_access: true },
              
              // Full Identity Access
              { module_id: 3, page_id: 301, module_name: 'Identity', page_name: 'Users', permission_type: 'R', has_access: true },
              { module_id: 3, page_id: 301, module_name: 'Identity', page_name: 'Users', permission_type: 'P', has_access: true },
              { module_id: 3, page_id: 301, module_name: 'Identity', page_name: 'Users', permission_type: 'M', has_access: true },
              { module_id: 3, page_id: 302, module_name: 'Identity', page_name: 'Roles', permission_type: 'R', has_access: true },
              { module_id: 3, page_id: 302, module_name: 'Identity', page_name: 'Roles', permission_type: 'P', has_access: true },
              { module_id: 3, page_id: 302, module_name: 'Identity', page_name: 'Roles', permission_type: 'M', has_access: true },
              
              // Full Reports Access
              { module_id: 4, page_id: 401, module_name: 'Reports', page_name: 'Sales Reports', permission_type: 'R', has_access: true },
              { module_id: 4, page_id: 401, module_name: 'Reports', page_name: 'Sales Reports', permission_type: 'P', has_access: true },
              { module_id: 4, page_id: 402, module_name: 'Reports', page_name: 'Financial Reports', permission_type: 'R', has_access: true },
              { module_id: 4, page_id: 402, module_name: 'Reports', page_name: 'Financial Reports', permission_type: 'P', has_access: true }
            ]
          };

          const response: LoginResponse = {
            success: true,
            message: 'Login successful',
            user: mockUser,
            token: 'mock-jwt-token-' + Date.now()
          };

          observer.next(response);
          observer.complete();
        } else if (loginRequest.username === 'user' && loginRequest.password === 'user') {
          const mockUser: User = {
            id: 2,
            employee_code: 'user',
            email: 'user@ltindia.com',
            first_name: 'Regular',
            last_name: 'User',
            user_type: UserType.INTERNAL,
            is_hod: false,
            status: 'Active',
            company_id: 1,
            created_at: new Date(),
            user_permissions: [
              // Limited CRM Access (Read only)
              { module_id: 1, page_id: 101, module_name: 'CRM', page_name: 'Leads', permission_type: 'R', has_access: true },
              { module_id: 1, page_id: 102, module_name: 'CRM', page_name: 'Accounts', permission_type: 'R', has_access: true },
              
              // Limited Masters Access
              { module_id: 2, page_id: 201, module_name: 'Masters', page_name: 'Parties', permission_type: 'R', has_access: true },
              { module_id: 2, page_id: 202, module_name: 'Masters', page_name: 'Ports', permission_type: 'R', has_access: true },
              
              // Limited Reports Access
              { module_id: 4, page_id: 401, module_name: 'Reports', page_name: 'Sales Reports', permission_type: 'R', has_access: true }
            ]
          };

          const response: LoginResponse = {
            success: true,
            message: 'Login successful',
            user: mockUser,
            token: 'mock-jwt-token-user-' + Date.now()
          };

          observer.next(response);
          observer.complete();
        } else {
          observer.error({
            success: false,
            message: 'Invalid username or password'
          });
        }
      }, 1000); // Simulate 1 second delay
    });
  }

  // Handle Successful Login
  private handleSuccessfulLogin(user: User, token: string): void {
    this.sessionService.initializeSession(user, token);
    this.isAuthenticatedSubject.next(true);
  }

  // Logout Method
  logout(): Observable<any> {
    // Clear session
    this.sessionService.clearSession();
    this.isAuthenticatedSubject.next(false);
    
    // Navigate to login
    this.router.navigate(['/login']);
    
    // If backend logout is needed
    if (!this.isMockMode()) {
      const token = this.sessionService.getSessionToken();
      if (token) {
        return this.http.post(`${this.apiUrl}/auth/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        }).pipe(
          catchError(() => of(null)) // Ignore logout errors
        );
      }
    }
    
    return of(null);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.sessionService.isSessionValid();
  }

  // Get current user
  getCurrentUser(): User | null {
    const session = this.sessionService.currentSession$;
    let user: User | null = null;
    
    session.subscribe(s => {
      if (s) {
        // Reconstruct user from session data
        user = {
          id: s.user_id,
          employee_code: '', // This would come from user profile
          email: '', // This would come from user profile
          first_name: s.glEmpName.split(' ')[0] || '',
          last_name: s.glEmpName.split(' ').slice(1).join(' ') || '',
          user_type: UserType.INTERNAL, // Default, would be loaded from profile
          is_hod: false,
          status: 'Active',
          company_id: s.glCompanyId,
          user_permissions: s.permissions
        };
      }
    }).unsubscribe();
    
    return user;
  }

  // Check Authentication Status
  private checkAuthenticationStatus(): void {
    const isValid = this.sessionService.isSessionValid();
    this.isAuthenticatedSubject.next(isValid);
    
    if (!isValid && !this.isOnPublicRoute()) {
      this.router.navigate(['/login']);
    }
  }

  // Check if current route is public
  private isOnPublicRoute(): boolean {
    const publicRoutes = ['/login', '/register', '/forgot-password'];
    const currentUrl = this.router.url;
    return publicRoutes.some(route => currentUrl.includes(route));
  }

  // Password Reset (Future Implementation)
  requestPasswordReset(email: string): Observable<any> {
    if (this.isMockMode()) {
      return of({ success: true, message: 'Password reset email sent' });
    }
    
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email })
      .pipe(catchError(this.handleError));
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    if (this.isMockMode()) {
      return of({ success: true, message: 'Password reset successful' });
    }
    
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { token, password: newPassword })
      .pipe(catchError(this.handleError));
  }

  // Token Management
  getAuthToken(): string | null {
    return this.sessionService.getSessionToken();
  }

  refreshToken(): Observable<any> {
    const token = this.getAuthToken();
    if (!token || this.isMockMode()) {
      return of(null);
    }
    
    return this.http.post(`${this.apiUrl}/auth/refresh`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap((response: any) => {
        if (response.token) {
          // Update token in session
          const session = this.sessionService.currentSession$;
          session.subscribe(s => {
            if (s) {
              s.session_token = response.token;
            }
          }).unsubscribe();
        }
      }),
      catchError(this.handleError)
    );
  }

  // Utility Methods
  private isMockMode(): boolean {
    // Enable mock mode for development
    return true; // Set to false when backend is ready
  }

  private handleError(error: any): Observable<never> {
    console.error('Auth Service Error:', error);
    return throwError(() => error);
  }

  // User Type Utilities
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === UserType.ADMIN;
  }

  isInternal(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === UserType.INTERNAL || user?.user_type === UserType.ADMIN;
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === UserType.CUSTOMER;
  }

  isAgent(): boolean {
    const user = this.getCurrentUser();
    return user?.user_type === UserType.AGENT;
  }
}
