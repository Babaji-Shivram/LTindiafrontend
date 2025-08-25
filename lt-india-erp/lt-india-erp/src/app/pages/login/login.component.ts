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
    <div class="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm8 0a2 2 0 114 0 2 2 0 01-4 0z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">LT India ERP</h1>
          <p class="text-gray-600">Sign in to your account</p>
        </div>

        <!-- Login Form -->
        <form (ngSubmit)="onLogin()" class="space-y-6" *ngIf="!isLoading">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              [(ngModel)]="email"
              name="email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@ltindia.com"
              required>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password"
              name="password"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required>
          </div>

          <button 
            type="submit"
            [disabled]="isLoading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Sign In
          </button>
        </form>

        <!-- Loading State -->
        <div *ngIf="isLoading" class="flex flex-col items-center justify-center py-12">
          <app-loading-truck [size]="120" [speed]="1.5"></app-loading-truck>
          <p class="text-gray-600 mt-4 text-sm">Signing you in...</p>
        </div>

        <!-- Demo Credentials -->
        <div class="mt-6 p-4 bg-gray-50 rounded-lg" *ngIf="!isLoading">
          <p class="text-sm text-gray-600 mb-2"><strong>Demo Credentials:</strong></p>
          <p class="text-sm text-gray-600">Email: admin@ltindia.com</p>
          <p class="text-sm text-gray-600">Password: password</p>
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
      
      // Simulate loading time to show the truck animation
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      alert('Invalid credentials');
    }
  }
}