import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { IVerifyEmail } from '../../../core/services/auth/auth-api.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { IconsComponent } from '../../../shared/components/icons/icons.component';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [LoaderComponent, IconsComponent],
  templateUrl: './verify.component.html'
})
export class VerifyComponent implements OnInit {

  message = '';
  isLoading = false;
  isSuccess: boolean | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authApiSrvc: AuthApiService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'Invalid token link';
      this.isLoading = false;
      return;
    }

    const payload: IVerifyEmail = { token };
    this.authApiSrvc.verifyEmail(payload)
      .subscribe({
        next: () => {
          this.message = 'Email verified successfully! You can now log in.';
          this.isSuccess = true;
          this.isLoading = false;
        },
        error: () => {
          this.message = 'Verification link expired or invalid.';
          this.isSuccess = false;
          this.isLoading = false;
        }
      });
  }
}
