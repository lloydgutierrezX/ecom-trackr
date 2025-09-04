import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  if (/^http/.test(req.url)) {
    return next(req);
  }

  const clonedReq = req.clone({
    url: `${environment.apiBaseUrl}/${req.url}`
  });

  return next(clonedReq);
}