import { Component, Input } from '@angular/core';
import { IconsComponent } from "../icons/icons.component";

type IAlertType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() type!: IAlertType;
  @Input() message!: string;
}
