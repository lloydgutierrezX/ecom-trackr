import { Component } from '@angular/core';
import { FormModalComponent } from '../../shared/components/modals/types/form-modal/form-modal.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [FormModalComponent],
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {

}
