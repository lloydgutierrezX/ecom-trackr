import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip if full URL already present
    if (/^http/.test(req.url)) return next.handle(req);

    const request = req.clone({
      url: `${environment.apiBaseUrl}/${req.url}`
    });

    return next.handle(request);
  }
}