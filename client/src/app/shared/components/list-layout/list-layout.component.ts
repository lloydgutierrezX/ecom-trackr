import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-layout',
  standalone: true,
  imports: [],
  templateUrl: './list-layout.component.html'
})
export class ListLayoutComponent {
  @Input() title = '';
}
