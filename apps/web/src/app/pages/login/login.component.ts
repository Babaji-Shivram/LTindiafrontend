import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '@lt-india-erp/shared-data-access';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card-wrapper">
        <mat-card class="login-card">
          <mat-card-header class="login-header">
            <div class="logo-section">
              <div class="logo">
                <mat-icon class="logo-icon">business</mat-icon>
              </div>
              <div class="company-info">
                <h1 class="company-name">LT India ERP</h1>
                <p class="company-tagline">Enterprise Resource Planning</p>
              </div>
            </div>
          </mat-card-header>

          <mat-card-content class="login-content">
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <div class="form-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
              </div>

              <div class="form-fields">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Email Address</mat-label>
                  <input matInput 
                         type="email" 
                         formControlName="email"
                         placeholder="Enter your email"
                         autocomplete="email">
                  <mat-icon matSuffix>email</mat-icon>
                  <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                    Please enter a valid email
                  </mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Password</mat-label>
                  <input matInput 
                         [type]="hidePassword ? 'password' : 'text'"
                         formControlName="password"
                         placeholder="Enter your password"
                         autocomplete="current-password">
                  <button mat-icon-button 
                          matSuffix 
                          type="button"
                          (click)="hidePassword = !hidePassword">
                    <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                  <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                    Password is required
                  </mat-error>
                  <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                    Password must be at least 6 characters
                  </mat-error>
                </mat-form-field>
              </div>

              <div class="form-actions">
                <button mat-raised-button 
                        color="primary" 
                        type="submit"
                        [disabled]="loginForm.invalid || loading"
                        class="login-button">
                  <mat-spinner *ngIf="loading" diameter="20" class="button-spinner"></mat-spinner>
                  <span *ngIf="!loading">Sign In</span>
                  <span *ngIf="loading">Signing In...</span>
                </button>
              </div>

              <div class="demo-credentials">
                <p class="demo-title">Demo Credentials:</p>
                <p class="demo-info">Email: <strong>admin@ltindia.com</strong></p>
                <p class="demo-info">Password: <strong>password</strong></p>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <div class="login-footer">
          <p>&copy; 2024 LT India. All rights reserved.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #243C70 0%, #1A2B52 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .login-card-wrapper {
      width: 100%;
      max-width: 420px;
    }

    .login-card {
      padding: 0;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      overflow: hidden;
    }

    .login-header {
      background: linear-gradient(135deg, #243C70 0%, #1A2B52 100%);
      color: white;
      padding: 2rem;
      margin-bottom: 0;
    }

    .logo-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon {
      font-size: 24px;
      color: #F6B801;
    }

    .company-name {
      font-family: 'Roboto Slab', serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
    }

    .company-tagline {
      font-size: 0.875rem;
      opacity: 0.8;
      margin: 0.25rem 0 0 0;
    }

    .login-content {
      padding: 2rem;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .form-header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .form-header h2 {
      font-family: 'Roboto Slab', serif;
      font-size: 1.5rem;
      font-weight: 600;
      color: #243C70;
      margin: 0 0 0.5rem 0;
    }

    .form-header p {
      color: #6B7280;
      margin: 0;
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      margin-top: 0.5rem;
    }

    .login-button {
      width: 100%;
      height: 48px;
      font-size: 1rem;
      font-weight: 500;
      border-radius: 8px;
    }

    .button-spinner {
      margin-right: 0.5rem;
    }

    .demo-credentials {
      background: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }

    .demo-title {
      font-weight: 600;
      color: #374151;
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
    }

    .demo-info {
      font-size: 0.875rem;
      color: #6B7280;
      margin: 0.25rem 0;
    }

    .login-footer {
      text-align: center;
      margin-top: 2rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.875rem;
    }

    @media (max-width: 640px) {
      .login-container {
        padding: 1rem;
      }
      
      .login-header,
      .login-content {
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['admin@ltindia.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
          
          this.snackBar.open('Welcome back!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open('Invalid credentials. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}