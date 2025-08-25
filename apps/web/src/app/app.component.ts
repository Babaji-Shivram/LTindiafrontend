import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@lt-india-erp/shared-data-access';
import { PageLayoutComponent } from '@lt-india-erp/design-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PageLayoutComponent],
  template: `
    <div class="app-container">
      <ng-container *ngIf="showLayout; else noLayout">
        <ds-page-layout [pageTitle]="pageTitle">
          <router-outlet></router-outlet>
        </ds-page-layout>
      </ng-container>
      
      <ng-template #noLayout>
        <router-outlet></router-outlet>
      </ng-template>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  showLayout = false;
  pageTitle = '';

  ngOnInit() {
    // Listen to route changes to determine layout visibility and page title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateLayoutVisibility(event.url);
      this.updatePageTitle(event.url);
    });

    // Initial check
    this.updateLayoutVisibility(this.router.url);
    this.updatePageTitle(this.router.url);
  }

  private updateLayoutVisibility(url: string): void {
    // Hide layout for login and other auth pages
    const noLayoutRoutes = ['/login', '/unauthorized', '/404'];
    this.showLayout = !noLayoutRoutes.some(route => url.startsWith(route)) && 
                     this.authService.isAuthenticated();
  }

  private updatePageTitle(url: string): void {
    const titleMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/identity': 'Identity Management',
      '/identity/users': 'Users',
      '/identity/roles': 'Roles',
      '/masters': 'Master Data',
      '/masters/parties': 'Parties',
      '/masters/ports': 'Ports',
      '/masters/charge-codes': 'Charge Codes',
      '/masters/tax-rates': 'Tax Rates',
      '/masters/uom': 'Units of Measure',
      '/crm': 'Customer Relationship Management',
      '/crm/leads': 'Leads',
      '/crm/opportunities': 'Opportunities',
      '/crm/accounts': 'Accounts'
    };

    // Find the most specific match
    const matchingRoute = Object.keys(titleMap)
      .sort((a, b) => b.length - a.length)
      .find(route => url.startsWith(route));

    this.pageTitle = matchingRoute ? titleMap[matchingRoute] : 'LT India ERP';
  }
}