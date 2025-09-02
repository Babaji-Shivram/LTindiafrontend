import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-permission-manager-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h1>Role Permission Manager - TEST</h1>
      <p>This is a test component to verify routing works.</p>
    </div>
  `
})
export class RolePermissionManagerTestComponent {
  constructor() {
    console.log('RolePermissionManagerTestComponent initialized');
  }
}
