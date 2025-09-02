import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  template: `<div>Redirecting...</div>`
})
export class UserDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    // Redirect to edit page with read-only mode
    this.router.navigate(['/identity/users', userId, 'edit'], { 
      queryParams: { readonly: 'true' } 
    });
  }
}
