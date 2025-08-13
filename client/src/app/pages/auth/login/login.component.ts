import { Component } from '@angular/core';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninFormComponent, BrandComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
