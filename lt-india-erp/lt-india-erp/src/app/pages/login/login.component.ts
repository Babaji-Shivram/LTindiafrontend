import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingTruckComponent } from '../../shared/loading-truck/loading-truck.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingTruckComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <!-- Header -->
        <div class="px-8 py-8 text-center" style="background: linear-gradient(135deg, #2c4170 0%, #1e2a4a 100%);">
          <div class="w-60 h-60 flex items-center justify-center mx-auto">
            <img src="/BABAJI LOGO.svg" alt="Babaji Logo" class="w-full h-full object-contain filter brightness-0 invert">
          </div>
        </div>

        <!-- Login Form -->
        <div class="p-8" *ngIf="!isLoading">
          <div class="text-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-2">Welcome back</h2>
            <p class="text-gray-600 text-sm">Please sign in to your account</p>
          </div>

          <form (ngSubmit)="onLogin()" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                type="email" 
                [(ngModel)]="email"
                name="email"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="Enter your email"
                required>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                [(ngModel)]="password"
                name="password"
                class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="Enter your password"
                required>
            </div>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                <span class="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" class="font-medium hover:opacity-90" style="color: #2c4170;">Forgot password?</a>
            </div>

            <button 
              type="submit"
              [disabled]="isLoading"
              class="w-full text-white py-2.5 px-4 rounded-lg hover:opacity-90 transition-colors font-medium text-sm"
              style="background-color: #2c4170;">
              Sign in
            </button>
          </form>

          <!-- Demo Credentials -->
          <div class="mt-6 p-3 bg-gray-50 rounded-lg border">
            <p class="text-xs text-gray-600 mb-2 font-medium">Demo Credentials:</p>
            <div class="text-xs text-gray-600 space-y-1">
              <p><span class="font-medium">Email:</span> admin@ltindia.com</p>
              <p><span class="font-medium">Password:</span> password</p>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-12 px-8">
          <app-loading-truck [size]="100" [speed]="1.5"></app-loading-truck>
          <p class="text-gray-600 mt-4 text-sm">Signing you in...</p>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = 'admin@ltindia.com';
  password = 'password';
  isLoading = false;

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'admin@ltindia.com' && this.password === 'password') {
      this.isLoading = true;
      
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      alert('Invalid credentials');
    }
  }
}