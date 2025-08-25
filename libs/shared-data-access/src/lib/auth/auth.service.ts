import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();

  private readonly TOKEN_KEY = 'lt_erp_token';
  private readonly USER_KEY = 'lt_erp_user';

  constructor() {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.tokenSubject.next(token);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Mock login for development
    if (credentials.email === 'admin@ltindia.com' && credentials.password === 'password') {
      const mockResponse: LoginResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: 'admin@ltindia.com',
          name: 'Admin User',
          roles: ['admin', 'user']
        },
        expiresIn: 3600
      };

      return of(mockResponse).pipe(
        tap(response => {
          this.setAuth(response.token, response.user);
        })
      );
    }

    return throwError(() => new Error('Invalid credentials'));

    // Real API call would be:
    // return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(
    //   tap(response => {
    //     this.setAuth(response.token, response.user);
    //   }),
    //   catchError(error => {
    //     console.error('Login error:', error);
    //     return throwError(() => error);
    //   })
    // );
  }

  logout(): void {
    this.clearAuth();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<LoginResponse> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No token available'));
    }

    // Mock refresh for development
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const mockResponse: LoginResponse = {
        token: 'refreshed-jwt-token-' + Date.now(),
        user: currentUser,
        expiresIn: 3600
      };

      return of(mockResponse).pipe(
        tap(response => {
          this.setAuth(response.token, response.user);
        })
      );
    }

    return throwError(() => new Error('No user available'));

    // Real API call would be:
    // return this.http.post<LoginResponse>('/api/auth/refresh', { token }).pipe(
    //   tap(response => {
    //     this.setAuth(response.token, response.user);
    //   }),
    //   catchError(error => {
    //     this.logout();
    //     return throwError(() => error);
    //   })
    // );
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user?.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }

  private setAuth(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.tokenSubject.next(token);
    this.currentUserSubject.next(user);
  }

  private clearAuth(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }
}