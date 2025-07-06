import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, DrawerComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  isDrawerOpen = false;

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  // Optional: handle external closing
  onDrawerStateChanged(isOpen: boolean) {
    this.isDrawerOpen = isOpen;
  }
}
