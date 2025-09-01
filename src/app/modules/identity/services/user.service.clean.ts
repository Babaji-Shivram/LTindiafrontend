import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserWithDetails, UserType, Branch, Role, UserFormData, UserListFilters } from '../models/user.model';
import { DepartmentService } from '../../master/services/department.service';
import { DepartmentMaster } from '../../master/models/department.model';

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
      division_id: 1,
      division_name: 'Administration',
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
    }
  ];

  constructor(private departmentService: DepartmentService) {
    this.usersSubject.next(this.mockUsers);
  }

  // Get all users
  getUsers(): Observable<UserWithDetails[]> {
    return this.users$;
  }

  // Get user by ID
  getUserById(id: number): Observable<UserWithDetails | undefined> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === id))
    );
  }

  // Get filtered users
  getFilteredUsers(filters: UserListFilters): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => {
        let filtered = [...users];

        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          filtered = filtered.filter(user =>
            user.full_name?.toLowerCase().includes(term) ||
            user.email?.toLowerCase().includes(term) ||
            user.employee_code?.toLowerCase().includes(term)
          );
        }

        if (filters.department) {
          filtered = filtered.filter(user => user.department_name === filters.department);
        }

        if (filters.userType) {
          filtered = filtered.filter(user => user.user_type === filters.userType);
        }

        if (filters.status) {
          filtered = filtered.filter(user => user.status === filters.status);
        }

        return filtered;
      })
    );
  }

  // Create new user
  createUser(userData: UserFormData): Observable<UserWithDetails> {
    const departments = this.getDepartmentsSync();
    const department = departments.find(d => d.lid === userData.department_id);
    
    const newUser: UserWithDetails = {
      id: Math.max(...this.mockUsers.map(u => u.id || 0), 0) + 1,
      employee_code: userData.employee_code,
      first_name: userData.first_name,
      last_name: userData.last_name,
      full_name: `${userData.first_name} ${userData.last_name}`,
      email: userData.email,
      phone: userData.phone,
      department_id: userData.department_id,
      department_name: department?.DepartmentName || '',
      branch_id: userData.branch_id,
      branch_name: userData.branch_name || '',
      division_id: userData.division_id,
      division_name: userData.division_name || '',
      user_type: userData.user_type,
      is_hod: userData.is_hod || false,
      role_id: userData.role_id,
      role_name: userData.role_name || '',
      status: userData.status || 'Active',
      created_at: new Date().toISOString(),
      department: {
        id: department?.lid || 0,
        name: department?.DepartmentName || '',
        code: department?.DepartmentCode || ''
      },
      branch: {
        id: userData.branch_id || 0,
        name: userData.branch_name || '',
        code: ''
      },
      role: {
        id: userData.role_id || 0,
        name: userData.role_name || '',
        permissions: []
      }
    };

    this.mockUsers.push(newUser);
    this.usersSubject.next([...this.mockUsers]);
    return of(newUser);
  }

  // Update user
  updateUser(id: number, userData: Partial<UserFormData>): Observable<UserWithDetails | null> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return of(null);
    }

    const departments = this.getDepartmentsSync();
    const department = departments.find(d => d.lid === userData.department_id);

    const updatedUser = {
      ...this.mockUsers[userIndex],
      ...userData,
      full_name: userData.first_name && userData.last_name 
        ? `${userData.first_name} ${userData.last_name}` 
        : this.mockUsers[userIndex].full_name,
      department_name: department?.DepartmentName || this.mockUsers[userIndex].department_name,
      updated_at: new Date().toISOString(),
      department: department ? {
        id: department.lid,
        name: department.DepartmentName,
        code: department.DepartmentCode
      } : this.mockUsers[userIndex].department
    };

    this.mockUsers[userIndex] = updatedUser;
    this.usersSubject.next([...this.mockUsers]);
    return of(updatedUser);
  }

  // Delete user
  deleteUser(id: number): Observable<boolean> {
    const userIndex = this.mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return of(false);
    }

    this.mockUsers.splice(userIndex, 1);
    this.usersSubject.next([...this.mockUsers]);
    return of(true);
  }

  // Get departments from Masters module
  getDepartments(): Observable<DepartmentMaster[]> {
    return this.departmentService.getDepartments();
  }

  // Get active departments from Masters module
  getActiveDepartments(): Observable<DepartmentMaster[]> {
    return this.departmentService.getActiveDepartments();
  }

  // Sync method to get departments for internal use
  private getDepartmentsSync(): DepartmentMaster[] {
    // This is a simplified sync version - in real app, departments would be cached
    return [
      { lid: 1, DepartmentName: 'Information Technology', DepartmentCode: 'IT', DepartmentHead: 'John Smith', Description: 'IT Department', IsActive: true, CreatedDate: new Date(), CreatedBy: 1 },
      { lid: 2, DepartmentName: 'Human Resources', DepartmentCode: 'HR', DepartmentHead: 'Sarah Johnson', Description: 'HR Department', IsActive: true, CreatedDate: new Date(), CreatedBy: 1 },
      { lid: 3, DepartmentName: 'Finance & Accounting', DepartmentCode: 'FIN', DepartmentHead: 'Michael Chen', Description: 'Finance Department', IsActive: true, CreatedDate: new Date(), CreatedBy: 1 },
      { lid: 4, DepartmentName: 'Operations', DepartmentCode: 'OPS', DepartmentHead: 'Emily Davis', Description: 'Operations Department', IsActive: true, CreatedDate: new Date(), CreatedBy: 1 },
      { lid: 5, DepartmentName: 'Sales & Marketing', DepartmentCode: 'SAL', DepartmentHead: 'David Wilson', Description: 'Sales Department', IsActive: true, CreatedDate: new Date(), CreatedBy: 1 }
    ];
  }

  // Get branches (mock data - should be from Masters module)
  getBranches(): Observable<Branch[]> {
    return of([
      { id: 1, name: 'Mumbai Branch', code: 'MUM', address: 'Mumbai Office', status: 'Active' },
      { id: 2, name: 'Delhi Branch', code: 'DEL', address: 'Delhi Office', status: 'Active' },
      { id: 3, name: 'Bangalore Branch', code: 'BLR', address: 'Bangalore Office', status: 'Active' }
    ]);
  }

  // Get roles (mock data - should be from Masters module)
  getRoles(): Observable<Role[]> {
    return of([
      { id: 1, name: 'Admin', description: 'System Administrator', permissions: ['read', 'write', 'delete'], status: 'Active' },
      { id: 2, name: 'Manager', description: 'Department Manager', permissions: ['read', 'write'], status: 'Active' },
      { id: 3, name: 'User', description: 'Regular User', permissions: ['read'], status: 'Active' }
    ]);
  }

  // Statistics
  getUsersCount(): number {
    return this.mockUsers.length;
  }

  getActiveUsersCount(): number {
    return this.mockUsers.filter(u => u.status === 'Active').length;
  }

  getInactiveUsersCount(): number {
    return this.mockUsers.filter(u => u.status === 'Inactive').length;
  }

  // Utility methods
  isEmployeeCodeUnique(code: string, excludeId?: number): Observable<boolean> {
    return this.users$.pipe(
      map(users => {
        const existingUser = users.find(u => 
          u.employee_code?.toLowerCase() === code.toLowerCase() && 
          u.id !== excludeId
        );
        return !existingUser;
      })
    );
  }

  isEmailUnique(email: string, excludeId?: number): Observable<boolean> {
    return this.users$.pipe(
      map(users => {
        const existingUser = users.find(u => 
          u.email?.toLowerCase() === email.toLowerCase() && 
          u.id !== excludeId
        );
        return !existingUser;
      })
    );
  }
}
