import { ActivatedRoute, Router, UrlTree } from "@angular/router"

export const dedupeReturnUrl = (
  route: ActivatedRoute,
  router: Router,
  path: string = 'login'
): UrlTree => {
  let returnUrl = '/login';
  const returnUrlQP = route.snapshot.queryParamMap.get('returnUrl');
  if (returnUrlQP) {
    const split = returnUrlQP.split('returnUrl=');
    returnUrl = split[0].startsWith('/login') ? split[1] : returnUrl;
  }

  return router.createUrlTree([path], {
    queryParams: { returnUrl }
  });

}