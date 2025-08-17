import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-field',
  standalone: true,
  imports: [],
  templateUrl: './toggle-field.component.html'
})
export class ToggleFieldComponent {
  @Input() checked = false;
  @Input() label = '';
  @Output() toggleState = new EventEmitter<boolean>();
}
