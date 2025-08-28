import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { User, UserDetail, UserWithDetails, UserType, UserDropdown } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<UserWithDetails[]>([]);
  private users$ = this.usersSubject.asObservable();

  // Sample data
  private sampleUsers: UserWithDetails[] = [
    {
      lId: 1,
      sName: 'John Smith',
      lType: UserType.INTERNAL,
      lRoleId: 1,
      bDel: false,
      deptId: 1,
      designId: 1,
      divId: 'DIV001',
      branchId: 1,
      hod: 'Y',
      empCode: 'EMP001',
      email: 'john.smith@ltindia.com',
      contactNo: '+91 98765 43210',
      departmentName: 'Information Technology',
      roleName: 'Admin',
      branchName: 'Mumbai Branch',
      divisionName: 'Technology Division',
      designationName: 'IT Manager',
      userDetail: {
        userId: 1,
        empName: 'John Smith',
        email: 'john.smith@ltindia.com',
        deptId: 1,
        divisionId: 1,
        empCode: 'EMP001',
        mobile: '+91 98765 43210',
        address: '123 Tech Street, Mumbai, Maharashtra 400001',
        userRole: 1,
        lUser: 1
      }
    },
    {
      lId: 2,
      sName: 'Sarah Johnson',
      lType: UserType.INTERNAL,
      lRoleId: 2,
      bDel: false,
      deptId: 2,
      designId: 2,
      divId: 'DIV002',
      branchId: 1,
      hod: 'Y',
      empCode: 'EMP002',
      email: 'sarah.johnson@ltindia.com',
      contactNo: '+91 87654 32109',
      departmentName: 'Human Resources',
      roleName: 'HR Manager',
      branchName: 'Mumbai Branch',
      divisionName: 'Admin Division',
      designationName: 'HR Manager',
      userDetail: {
        userId: 2,
        empName: 'Sarah Johnson',
        email: 'sarah.johnson@ltindia.com',
        deptId: 2,
        divisionId: 2,
        empCode: 'EMP002',
        mobile: '+91 87654 32109',
        address: '456 HR Plaza, Mumbai, Maharashtra 400002',
        userRole: 2,
        lUser: 1
      }
    },
    {
      lId: 3,
      sName: 'Michael Brown',
      lType: UserType.INTERNAL,
      lRoleId: 3,
      bDel: false,
      deptId: 3,
      designId: 3,
      divId: 'DIV003',
      branchId: 2,
      hod: 'N',
      empCode: 'EMP003',
      email: 'michael.brown@ltindia.com',
      contactNo: '+91 76543 21098',
      departmentName: 'Finance',
      roleName: 'Finance User',
      branchName: 'Delhi Branch',
      divisionName: 'Finance Division',
      designationName: 'Senior Accountant',
      userDetail: {
        userId: 3,
        empName: 'Michael Brown',
        email: 'michael.brown@ltindia.com',
        deptId: 3,
        divisionId: 3,
        empCode: 'EMP003',
        mobile: '+91 76543 21098',
        address: '789 Finance Tower, Delhi, Delhi 110001',
        userRole: 3,
        lUser: 1
      }
    },
    {
      lId: 4,
      sName: 'Lisa Davis',
      lType: UserType.INTERNAL,
      lRoleId: 4,
      bDel: false,
      deptId: 4,
      designId: 4,
      divId: 'DIV004',
      branchId: 1,
      hod: 'Y',
      empCode: 'EMP004',
      email: 'lisa.davis@ltindia.com',
      contactNo: '+91 65432 10987',
      departmentName: 'Operations',
      roleName: 'Operations Manager',
      branchName: 'Mumbai Branch',
      divisionName: 'Operations Division',
      designationName: 'Operations Manager',
      userDetail: {
        userId: 4,
        empName: 'Lisa Davis',
        email: 'lisa.davis@ltindia.com',
        deptId: 4,
        divisionId: 4,
        empCode: 'EMP004',
        mobile: '+91 65432 10987',
        address: '321 Operations Center, Mumbai, Maharashtra 400003',
        userRole: 4,
        lUser: 1
      }
    },
    {
      lId: 5,
      sName: 'David Wilson',
      lType: UserType.OTHER,
      lRoleId: 5,
      bDel: false,
      deptId: 5,
      designId: 5,
      divId: 'DIV005',
      branchId: 3,
      hod: 'N',
      empCode: 'EMP005',
      email: 'david.wilson@ltindia.com',
      contactNo: '+91 54321 09876',
      departmentName: 'Sales & Marketing',
      roleName: 'Sales User',
      branchName: 'Chennai Branch',
      divisionName: 'Sales Division',
      designationName: 'Sales Executive',
      userDetail: {
        userId: 5,
        empName: 'David Wilson',
        email: 'david.wilson@ltindia.com',
        deptId: 5,
        divisionId: 5,
        empCode: 'EMP005',
        mobile: '+91 54321 09876',
        address: '654 Sales Complex, Chennai, Tamil Nadu 600001',
        userRole: 5,
        lUser: 1
      }
    },
    {
      lId: 6,
      sName: 'Emily Chen',
      lType: UserType.INTERNAL,
      lRoleId: 6,
      bDel: true,
      deptId: 6,
      designId: 6,
      divId: 'DIV006',
      branchId: 2,
      hod: 'N',
      empCode: 'EMP006',
      email: 'emily.chen@ltindia.com',
      contactNo: '+91 43210 98765',
      departmentName: 'Quality Assurance',
      roleName: 'QA User',
      branchName: 'Delhi Branch',
      divisionName: 'Quality Division',
      designationName: 'QA Analyst',
      userDetail: {
        userId: 6,
        empName: 'Emily Chen',
        email: 'emily.chen@ltindia.com',
        deptId: 6,
        divisionId: 6,
        empCode: 'EMP006',
        mobile: '+91 43210 98765',
        address: '987 Quality Center, Delhi, Delhi 110002',
        userRole: 6,
        lUser: 1
      }
    }
  ];

  constructor() {
    this.usersSubject.next(this.sampleUsers);
  }

  // Get all users
  getUsers(): Observable<UserWithDetails[]> {
    return this.users$.pipe(delay(300));
  }

  // Get user by ID
  getUserById(id: number): Observable<UserWithDetails | undefined> {
    return this.users$.pipe(
      map(users => users.find(user => user.lId === id)),
      delay(200)
    );
  }

  // Get active users only
  getActiveUsers(): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => users.filter(user => !user.bDel)),
      delay(300)
    );
  }

  // Get users by department
  getUsersByDepartment(deptId: number): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.deptId === deptId && !user.bDel)),
      delay(300)
    );
  }

  // Get users by type
  getUsersByType(userType: UserType): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.lType === userType && !user.bDel)),
      delay(300)
    );
  }

  // Get HODs (Head of Department)
  getHODs(): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.hod === 'Y' && !user.bDel)),
      delay(300)
    );
  }

  // Create new user
  createUser(userData: Partial<User>, userDetail?: Partial<UserDetail>): Observable<UserWithDetails> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUsers = this.usersSubject.value;
        const newId = Math.max(...currentUsers.map(u => u.lId)) + 1;
        
        const newUser: UserWithDetails = {
          lId: newId,
          sName: userData.sName || '',
          lType: userData.lType || UserType.INTERNAL,
          lRoleId: userData.lRoleId || 1,
          bDel: false,
          deptId: userData.deptId || 1,
          designId: userData.designId || 1,
          divId: userData.divId || 'DIV001',
          branchId: userData.branchId || 1,
          hod: userData.hod || 'N',
          empCode: userData.empCode || `EMP${newId.toString().padStart(3, '0')}`,
          email: userData.email || '',
          contactNo: userData.contactNo || '',
          departmentName: 'Department Name', // Would be populated from department service
          roleName: 'Role Name', // Would be populated from role service
          branchName: 'Branch Name', // Would be populated from branch service
          divisionName: 'Division Name', // Would be populated from division service
          designationName: 'Designation Name', // Would be populated from designation service
          userDetail: userDetail ? {
            userId: newId,
            empName: userDetail.empName || userData.sName || '',
            email: userDetail.email || userData.email || '',
            deptId: userDetail.deptId || userData.deptId || 1,
            divisionId: userDetail.divisionId || 1,
            empCode: userDetail.empCode || userData.empCode || `EMP${newId.toString().padStart(3, '0')}`,
            mobile: userDetail.mobile || userData.contactNo || '',
            address: userDetail.address || '',
            userRole: userDetail.userRole || userData.lRoleId || 1,
            lUser: 1
          } : undefined
        };

        const updatedUsers = [...currentUsers, newUser];
        this.usersSubject.next(updatedUsers);
        observer.next(newUser);
        observer.complete();
      }, 500);
    });
  }

  // Update user
  updateUser(id: number, userData: Partial<User>, userDetail?: Partial<UserDetail>): Observable<UserWithDetails | null> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUsers = this.usersSubject.value;
        const userIndex = currentUsers.findIndex(user => user.lId === id);
        
        if (userIndex !== -1) {
          const updatedUser: UserWithDetails = {
            ...currentUsers[userIndex],
            ...userData,
            userDetail: userDetail ? {
              userId: userDetail.userId || currentUsers[userIndex].userDetail?.userId || id,
              empName: userDetail.empName || '',
              email: userDetail.email || '',
              deptId: userDetail.deptId || 0,
              divisionId: userDetail.divisionId || 0,
              empCode: userDetail.empCode || '',
              mobile: userDetail.mobile || '',
              address: userDetail.address || '',
              userRole: userDetail.userRole || 0,
              lUser: userDetail.lUser || 1
            } : currentUsers[userIndex].userDetail
          };

          const updatedUsers = [...currentUsers];
          updatedUsers[userIndex] = updatedUser;
          this.usersSubject.next(updatedUsers);
          observer.next(updatedUser);
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 500);
    });
  }

  // Soft delete user (set bDel = true)
  deleteUser(id: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUsers = this.usersSubject.value;
        const userIndex = currentUsers.findIndex(user => user.lId === id);
        
        if (userIndex !== -1) {
          const updatedUsers = [...currentUsers];
          updatedUsers[userIndex] = { ...updatedUsers[userIndex], bDel: true };
          this.usersSubject.next(updatedUsers);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 300);
    });
  }

  // Restore deleted user
  restoreUser(id: number): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUsers = this.usersSubject.value;
        const userIndex = currentUsers.findIndex(user => user.lId === id);
        
        if (userIndex !== -1) {
          const updatedUsers = [...currentUsers];
          updatedUsers[userIndex] = { ...updatedUsers[userIndex], bDel: false };
          this.usersSubject.next(updatedUsers);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 300);
    });
  }

  // Check if employee code is unique
  isEmpCodeUnique(empCode: string, excludeUserId?: number): Observable<boolean> {
    return this.users$.pipe(
      map(users => {
        const existingUser = users.find(user => 
          user.empCode.toLowerCase() === empCode.toLowerCase() && 
          user.lId !== excludeUserId
        );
        return !existingUser;
      }),
      delay(300)
    );
  }

  // Check if email is unique
  isEmailUnique(email: string, excludeUserId?: number): Observable<boolean> {
    return this.users$.pipe(
      map(users => {
        const existingUser = users.find(user => 
          user.email.toLowerCase() === email.toLowerCase() && 
          user.lId !== excludeUserId
        );
        return !existingUser;
      }),
      delay(300)
    );
  }

  // Get users for dropdown
  getUsersForDropdown(): Observable<UserDropdown[]> {
    return this.users$.pipe(
      map(users => users
        .filter(user => !user.bDel)
        .map(user => ({
          lId: user.lId,
          sName: user.sName,
          email: user.email,
          empCode: user.empCode,
          bDel: user.bDel
        }))
      ),
      delay(200)
    );
  }

  // Get user types
  getUserTypes(): { value: number; label: string }[] {
    return [
      { value: UserType.INTERNAL, label: 'Internal User' },
      { value: UserType.OTHER, label: 'Other User' }
    ];
  }

  // Search users
  searchUsers(searchTerm: string): Observable<UserWithDetails[]> {
    return this.users$.pipe(
      map(users => {
        if (!searchTerm.trim()) return users;
        
        const term = searchTerm.toLowerCase();
        return users.filter(user =>
          user.sName.toLowerCase().includes(term) ||
          user.empCode.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.contactNo.includes(term) ||
          user.departmentName?.toLowerCase().includes(term) ||
          user.roleName?.toLowerCase().includes(term)
        );
      }),
      delay(300)
    );
  }
}
