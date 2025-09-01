import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { BSRoleMaster } from '../../models/role-detail.model';
import { RoleDetailService } from '../../services/role-detail.service';

@Component({
  selector: 'app-role-detail-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RoleDetailService],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit Role' : 'Create New Role' }}</h2>
      
      <form [formGroup]="roleForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="roleName">Role Name *</label>
          <input 
            type="text"
            id="roleName"
            formControlName="roleName"
            placeholder="Enter role name">
          <div *ngIf="roleForm.get('roleName')?.invalid && roleForm.get('roleName')?.touched">
            Role name is required
          </div>
        </div>

        <div class="form-group">
          <label for="remarks">Description</label>
          <textarea 
            id="remarks"
            formControlName="remarks"
            rows="3"
            placeholder="Enter role description"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" (click)="goBack()">Cancel</button>
          <button type="submit" [disabled]="roleForm.invalid || saving">
            {{ saving ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 600px; }
    .form-group { margin-bottom: 20px; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input, textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    .form-actions { display: flex; gap: 10px; justify-content: flex-end; }
    button { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
    button[type="submit"] { background: #007bff; color: white; }
    button[type="button"] { background: #6c757d; color: white; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class RoleDetailFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  roleForm!: FormGroup;
  isEditMode = false;
  roleId: number = 0;
  saving = false;
  currentRole: BSRoleMaster | null = null;
  
  constructor(
    private fb: FormBuilder,
    private roleDetailService: RoleDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['id']) {
        this.roleId = +params['id'];
        this.isEditMode = true;
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      remarks: ['', [Validators.maxLength(500)]]
    });
  }

  private loadData(): void {
    if (this.isEditMode && this.roleId) {
      this.roleDetailService.getRoleDetail(this.roleId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this.currentRole = data.role;
            this.populateForm();
          },
          error: (error) => {
            console.error('Error loading role data:', error);
            alert('Error loading role data. Please try again.');
            this.goBack();
          }
        });
    }
  }

  private populateForm(): void {
    if (this.currentRole) {
      this.roleForm.patchValue({
        roleName: this.currentRole.sName,
        remarks: this.currentRole.sRemarks
      });
    }
  }

  onSubmit(): void {
    if (this.roleForm.valid && !this.saving) {
      this.saving = true;
      
      const formValue = this.roleForm.value;
      
      // Create CRM-compatible role request
      const crmRoleData = {
        sName: formValue.roleName,
        sRemarks: formValue.remarks || '',
        lCompId: 0, // Default company ID
        lUserId: 1, // TODO: Get current user ID from auth service
        isActive: true,
        // Legacy compatibility
        name: formValue.roleName,
        description: formValue.remarks || '',
        priority: 1,
        permissionIds: []
      };

      if (this.isEditMode) {
        // Update existing role with CRM compatibility
        const updateData = {
          lRoleId: this.roleId,
          id: this.roleId,
          ...crmRoleData
        };
        
        this.roleDetailService.updateCRMRole(updateData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response.success) {
                alert('Role updated successfully with CRM compatibility!');
                this.goBack();
              } else {
                alert('Error updating role: ' + response.message);
                this.saving = false;
              }
            },
            error: (error) => {
              console.error('Error updating role:', error);
              alert('Error updating role. Please try again.');
              this.saving = false;
            }
          });
      } else {
        // Create new role with CRM compatibility
        this.roleDetailService.createCRMRole(crmRoleData)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              if (response.success) {
                alert('Role created successfully with CRM compatibility!');
                this.goBack();
              } else {
                alert('Error creating role: ' + response.message);
                this.saving = false;
              }
            },
            error: (error) => {
              console.error('Error creating role:', error);
              alert('Error creating role. Please try again.');
              this.saving = false;
            }
          });
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/identity/roles']);
  }
}