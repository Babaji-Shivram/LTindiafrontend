import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
      <div class="text-center">
        <div class="mb-8">
          <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h1 class="page-title text-gray-900 mb-4">CRM Module</h1>
        <p class="page-title text-gray-600 mb-8">Coming Soon</p>
        <div class="space-y-2 text-gray-500">
          <p>• Customer Relationship Management</p>
          <p>• Lead Management</p>
          <p>• Opportunity Tracking</p>
          <p>• Account Management</p>
        </div>
        <div class="mt-8">
          <span class="inline-flex items-center px-3 py-1 rounded-full badge-text bg-orange-100 text-orange-800">
            Under Development
          </span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ComingSoonComponent {
}
