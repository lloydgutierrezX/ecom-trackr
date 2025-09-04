import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { apiPrefixInterceptor } from './core/interceptors/api-prefix/api-prefix.interceptor';
import { RetryInterceptor } from './core/interceptors/retry/retry.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([
      apiPrefixInterceptor,
      authInterceptor
    ])), // <- enables interceptors
    provideRouter(routes),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RetryInterceptor,
    //   multi: true
    // },
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ]
};