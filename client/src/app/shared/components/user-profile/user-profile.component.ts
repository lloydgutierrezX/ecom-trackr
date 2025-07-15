import { Component } from '@angular/core';
import { IconsComponent } from "./../icons/icons.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent {
  user: string = 'John Doe';

  onClick() {
    console.log('open modal');
  }
}
