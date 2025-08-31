import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-semibold text-gray-900 mb-6">Enquiry List</h1>
      <p class="text-gray-600">This component has been moved to Enquiry Management.</p>
      <button 
        (click)="navigateToEnquiryManagement()"
        class="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Go to Enquiry Management
      </button>
    </div>
  `
})
export class EnquiryListComponent implements OnInit {
  // Math reference for template compatibility
  Math = Math;

  constructor(private router: Router) {}

  ngOnInit() {
    // Redirect to the new enquiry management component
    this.navigateToEnquiryManagement();
  }

  navigateToEnquiryManagement() {
    this.router.navigate(['/crm/enquiries']);
  }
}
