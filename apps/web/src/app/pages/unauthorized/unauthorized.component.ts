import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 class="mt-6 text-3xl font-heading font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            You don't have permission to access this resource.
          </p>
        </div>
        <div>
          <a routerLink="/dashboard" 
             class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {}
