import { Component, EventEmitter, Output } from '@angular/core';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { ThemeComponent } from '../theme/theme.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LucideAngularModule,
    ThemeComponent
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  @Output() toggle = new EventEmitter<void>();
  readonly Menu = Menu;

  emitToggle() {
    this.toggle.emit();
  }
}
