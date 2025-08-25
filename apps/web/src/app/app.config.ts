import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { routes } from './app.routes';
import { AuthInterceptor } from '@lt-india-erp/shared-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // Convert functional interceptor to class-based for AuthInterceptor
          const authInterceptor = new AuthInterceptor();
          return authInterceptor.intercept(req, next);
        }
      ])
    ),
    provideAnimations(),
    importProvidersFrom(
      MatSnackBarModule,
      MatDialogModule
    )
  ],
};