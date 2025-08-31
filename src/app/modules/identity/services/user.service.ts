import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, UserWithDetails, UserType, Department, Branch, Role, UserFormData, UserListFilters } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<UserWithDetails[]>([]);
  public users$ = this.usersSubject.asObservable();

  private mockUsers: UserWithDetails[] = [
    {
      id: 1,
      employee_code: 'EMP001',
      first_name: 'John',
      last_name: 'Doe',
      full_name: 'John Doe',
      email: 'john.doe@company.com',
      phone: '+91 98765 43210',
      department_id: 1,
      department_name: 'Information Technology',
      branch_id: 1,
      branch_name: 'Mumbai Branch',
      division_id: 1,
      division_name: 'Software Development',
      user_type: UserType.INTERNAL,
      is_hod: true,
      role_id: 1,
      role_name: 'Admin',
      status: 'Active',
      created_at: '2024-01-15T10:30:00Z',
      department: {
        id: 1,
        name: 'Information Technology',
        code: 'IT'
      },
      branch: {
        id: 1,
        name: 'Mumbai Branch',
        code: 'MUM'
      },
      role: {
        id: 1,
        name: 'Admin',
        permissions: ['read', 'write', 'delete']
      }
    },
    {
      id: 2,
      employee_code: 'EMP002',
      first_name: 'Jane',
      last_name: 'Smith',
      full_name: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+91 87654 32109',
      department_id: 2,
      department_name: 'Human Resources',
      branch_id: 1,
      branch_name: 'Mumbai Branch',
      division: 'Administration',
      user_type: UserType.INTERNAL,
      is_hod: false,
      role_id: 2,
      role_name: 'User',
      status: 'Active',
      created_at: '2024-01-20T14:45:00Z',
      department: {
        id: 2,
        name: 'Human Resources',
        code: 'HR'
      },
      branch: {
        id: 1,
        name: 'Mumbai Branch',
        code: 'MUM'
      },
      role: {
        id: 2,
        name: 'User',
        permissions: ['read', 'write']
      }
    },
    {
      id: 3,
      employee_code: 'EMP003',
      first_name: 'Mike',
      last_name: 'Johnson',
      full_name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      phone: '+91 76543 21098',
      department_id: 3,
      department_name: 'Finance',
      branch_id: 2,
      branch_name: 'Delhi Branch',
      division: 'Finance',
      user_type: UserType.INTERNAL,
      is_hod: true,
      role_id: 3,
      role_name: 'Manager',
      status: 'Active',
      created_at: '2024-02-01T09:15:00Z',
      department: {
        id: 3,
        name: 'Finance',
        code: 'FIN'
      },
      branch: {
        id: 2,
        name: 'Delhi Branch',
        code: 'DEL'
      },
      role: {
        id: 3,
        name: 'Manager',
        permissions: ['read', 'write', 'approve']
      }
    }
  ];

  private mockDepartments: Department[] = [
    { id: 1, name: 'Information Technology', code: 'IT', status: 'Active' },
    { id: 2, name: 'Human Resources', code: 'HR', status: 'Active' },
    { id: 3, name: 'Finance', code: 'FIN', status: 'Active' },
    { id: 4, name: 'Operations', code: 'OPS', status: 'Active' },
    { id: 5, name: 'Sales', code: 'SAL', status: 'Active' }
  ];

  private mockBranches: Branch[] = [
    { id: 1, name: 'Mumbai Branch', code: 'MUM', city: 'Mumbai', state: 'Maharashtra', country: 'India', status: 'Active' },
    { id: 2, name: 'Delhi Branch', code: 'DEL', city: 'Delhi', state: 'Delhi', country: 'India', status: 'Active' },
    { id: 3, name: 'Chennai Branch', code: 'CHN', city: 'Chennai', state: 'Tamil Nadu', country: 'India', status: 'Active' },
    { id: 4, name: 'Bangalore Branch', code: 'BLR', city: 'Bangalore', state: 'Karnataka', country: 'India', status: 'Active' }
  ];

  private mockRoles: Role[] = [
    { id: 1, name: 'Admin', description: 'Full system access', permissions: ['read', 'write', 'delete', 'admin'], status: 'Active' },
    { id: 2, name: 'User', description: 'Standard user access', permissions: ['read', 'write'], status: 'Active' },
    { id: 3, name: 'Manager', description: 'Managerial access', permissions: ['read', 'write', 'approve'], status: 'Active' },
    { id: 4, name: 'Viewer', description: 'Read-only access', permissions: ['read'], status: 'Active' }
  ];

  constructor() {
    this.usersSubject.next(this.mockUsers);
  }

  // User CRUD operations
  getUsers(filters?: UserListFilters): Observable<UserWithDetails[]> {
    let filteredUsers = [...this.mockUsers];

    if (filters) {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredUsers = filteredUsers.filter(user =>
          user.full_name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.employee_code.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.department_id) {
        filteredUsers = filteredUsers.filter(user => user.department_id === filters.department_id);
      }

      if (filters.branch_id) {
        filteredUsers = filteredUsers.filter(user => user.branch_id === filters.branch_id);
      }

      if (filters.user_type) {
        filteredUsers = filteredUsers.filter(user => user.user_type === filters.user_type);
      }

      if (filters.status) {
        filteredUsers = filteredUsers.filter(user => user.status === filters.status);
      }

      if (filters.is_hod !== undefined) {
        filteredUsers = filteredUsers.filter(user => user.is_hod === filters.is_hod);
      }
    }

    return of(filteredUsers);
  }

  getUserById(id: number): Observable<UserWithDetails | null> {
    const user = this.mockUsers.find(u => u.id === id);
    return of(user || null);
  }

  createUser(userData: UserFormData): Observable<UserWithDetails> {
    const newUser: UserWithDetails = {
      id: Math.max(...this.mockUsers.map(u => u.id || 0)) + 1,
      ...userData,
      full_name: `${userData.first_name} ${userData.last_name}`,
      department_name: this.mockDepartments.find(d => d.id === userData.department_id)?.name || '',
      branch_name: this.mockBranches.find(b => b.id === userData.branch_id)?.name || '',
      role_name: this.mockRoles.find(r => r.id === userData.role_id)?.name || '',
      created_at: new Date().toISOString(),
      department: this.mockDepartments.find(d => d.id === userData.department_id) || { id: 0, name: '', code: '' },
      branch: this.mockBranches.find(b => b.id === userData.branch_id) || { id: 0, name: '', code: '' },
      role: this.mockRoles.find(r => r.id === userData.role_id) || { id: 0, name: '', permissions: [] }
    };

    this.mockUsers.push(newUser);
    this.usersSubject.next([...this.mockUsers]);
    return of(newUser);
  }

  updateUser(id: number, userData: Partial<UserFormData>): Observable<UserWithDetails> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...this.mockUsers[userIndex],
      ...userData,
      full_name: userData.first_name && userData.last_name ? `${userData.first_name} ${userData.last_name}` : this.mockUsers[userIndex].full_name,
      department_name: userData.department_id ? this.mockDepartments.find(d => d.id === userData.department_id)?.name || '' : this.mockUsers[userIndex].department_name,
      branch_name: userData.branch_id ? this.mockBranches.find(b => b.id === userData.branch_id)?.name || '' : this.mockUsers[userIndex].branch_name,
      role_name: userData.role_id ? this.mockRoles.find(r => r.id === userData.role_id)?.name || '' : this.mockUsers[userIndex].role_name,
      updated_at: new Date().toISOString()
    };

    if (userData.department_id) {
      updatedUser.department = this.mockDepartments.find(d => d.id === userData.department_id) || updatedUser.department;
    }
    if (userData.branch_id) {
      updatedUser.branch = this.mockBranches.find(b => b.id === userData.branch_id) || updatedUser.branch;
    }
    if (userData.role_id) {
      updatedUser.role = this.mockRoles.find(r => r.id === userData.role_id) || updatedUser.role;
    }

    this.mockUsers[userIndex] = updatedUser;
    this.usersSubject.next([...this.mockUsers]);
    return of(updatedUser);
  }

  deleteUser(id: number): Observable<boolean> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return of(false);
    }

    // Soft delete - update status to inactive and set deleted_at
    this.mockUsers[userIndex] = {
      ...this.mockUsers[userIndex],
      status: 'Inactive',
      deleted_at: new Date().toISOString()
    };

    this.usersSubject.next([...this.mockUsers]);
    return of(true);
  }

  restoreUser(id: number): Observable<boolean> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return of(false);
    }

    this.mockUsers[userIndex] = {
      ...this.mockUsers[userIndex],
      status: 'Active',
      deleted_at: undefined
    };

    this.usersSubject.next([...this.mockUsers]);
    return of(true);
  }

  // Helper methods for dropdowns
  getDepartments(): Observable<Department[]> {
    return of(this.mockDepartments.filter(d => d.status === 'Active'));
  }

  getBranches(): Observable<Branch[]> {
    return of(this.mockBranches.filter(b => b.status === 'Active'));
  }

  getRoles(): Observable<Role[]> {
    return of(this.mockRoles.filter(r => r.status === 'Active'));
  }

  // Validation methods
  validateEmployeeCode(code: string, excludeId?: number): Observable<boolean> {
    const exists = this.mockUsers.some(u => u.employee_code === code && u.id !== excludeId);
    return of(!exists);
  }

  validateEmail(email: string, excludeId?: number): Observable<boolean> {
    const exists = this.mockUsers.some(u => u.email === email && u.id !== excludeId);
    return of(!exists);
  }

  // Statistics
  getUserStats(): Observable<any> {
    const stats = {
      total: this.mockUsers.length,
      active: this.mockUsers.filter(u => u.status === 'Active').length,
      inactive: this.mockUsers.filter(u => u.status === 'Inactive').length,
      hods: this.mockUsers.filter(u => u.is_hod && u.status === 'Active').length,
      byDepartment: {} as any,
      byBranch: {} as any
    };

    // Group by department
    this.mockUsers.forEach(user => {
      if (user.department_name) {
        stats.byDepartment[user.department_name] = (stats.byDepartment[user.department_name] || 0) + 1;
      }
    });

    // Group by branch
    this.mockUsers.forEach(user => {
      if (user.branch_name) {
        stats.byBranch[user.branch_name] = (stats.byBranch[user.branch_name] || 0) + 1;
      }
    });

    return of(stats);
  }

  // Status management
  updateUserStatus(userId: number, status: 'Active' | 'Inactive'): Observable<User> {
    const userIndex = this.mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.mockUsers[userIndex].status = status;
    this.usersSubject.next([...this.mockUsers]);
    
    return of(this.mockUsers[userIndex]);
  }
}
