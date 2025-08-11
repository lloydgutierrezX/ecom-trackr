import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { AlertModalComponent } from "../../shared/components/modals/types/alert-modal/alert-modal.component";
import { FormModalComponent } from "../../shared/components/modals/types/form-modal/form-modal.component";
import { ConfirmModalComponent } from '../../shared/components/modals/types/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, DrawerComponent, LoaderComponent, AlertModalComponent, FormModalComponent, ConfirmModalComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements AfterViewInit {
  isDrawerOpen = false;
  isLoading = false;

  constructor(
    private loaderSrvc: LoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.loaderSrvc.loading$.subscribe((state) => {
      this.isLoading = state;
      this.cdr.detectChanges();
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  // Optional: handle external closing
  onDrawerStateChanged(isOpen: boolean) {
    this.isDrawerOpen = isOpen;
  }
}
