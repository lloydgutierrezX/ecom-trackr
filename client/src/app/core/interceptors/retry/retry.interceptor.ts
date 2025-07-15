import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, retry, tap, timer } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader/loader.service';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor(private loaderSrvc: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't retry non GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    return next.handle(req)
      .pipe(
        retry({
          count: 3,
          delay: () => {
            this.loaderSrvc.show();
            return timer(2000);
          }
        }),
        finalize(() => {
          this.loaderSrvc.hide();
        })
      )
  }
}