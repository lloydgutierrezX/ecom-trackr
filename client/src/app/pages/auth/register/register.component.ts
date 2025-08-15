import { Component, OnInit } from '@angular/core';
import { DynamicFormComponent } from "../../../shared/components/forms/dynamic-form.component";
import { formConfig } from './config';
import { AuthLayoutComponent } from '../auth-layout.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent, AuthLayoutComponent, BrandComponent, AlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  registerFormConfig = formConfig;
  errorMessage: string = '';

  get isDisabled(): boolean {
    return false;
  }

  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  register() {

  }

  redirect(path: 'login'): void {
    if (path !== 'login') {
      return;
    }

    let returnUrl = '/login';
    const returnUrlQP = this.activedRoute.snapshot.queryParamMap.get('returnUrl');
    if (returnUrlQP) {
      const split = returnUrlQP.split('returnUrl=');
      returnUrl = split[0].startsWith('/login') ? split[1] : returnUrl;
    }

    const urlTree = this.router.createUrlTree([path], {
      queryParams: { returnUrl }
    });

    this.router.navigateByUrl(urlTree);
  }
}
