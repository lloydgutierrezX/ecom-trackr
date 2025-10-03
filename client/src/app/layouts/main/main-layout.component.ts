import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { DrawerComponent } from '../../shared/components/drawer/drawer.component';
import { LoaderService } from '../../shared/services/loader/loader.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { AlertModalComponent } from "../../shared/components/modals/types/alert-modal/alert-modal.component";
import { FormModalComponent } from "../../shared/components/modals/types/form-modal/form-modal.component";
import { ConfirmModalComponent } from '../../shared/components/modals/types/confirm-modal/confirm-modal.component';
import { AuthService } from '../../shared/services/auth/auth.service';
import { FormService } from '../../shared/services/form/form.service';
import { Observable } from 'rxjs';
import { IModalActionEvent } from '../../shared/interfaces/modal-action-events.interface';
import { ModalService } from '../../shared/services/modal/modal.service';
import { ToastService } from '../../shared/services/toast/toast.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent, DrawerComponent, LoaderComponent, AlertModalComponent, FormModalComponent, ConfirmModalComponent],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements AfterViewInit {

  confirmModalId: 'confirm-modal' = 'confirm-modal';
  isDrawerOpen = false;
  isLoading = false;

  constructor(
    private loaderSrvc: LoaderService,
    private cdr: ChangeDetectorRef,
    private authSrvc: AuthService,
    private router: Router,
    private formSrvc: FormService,
    private modalSrvc: ModalService,
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

  onDrawerStateChanged(isOpen: boolean) {
    this.isDrawerOpen = isOpen;
  }

  onConfirmAction(actionEvent: IModalActionEvent) {
    const { action, id, handler } = actionEvent;

    console.log('Logging out...', action, handler);

    if (!handler) {
      console.error('No handler provided for confirm action');
      return;
    }

    switch (action) {
      case 'logout':
        this.logout(handler);
        break;
      case 'delete':
        if (!id) {
          return;
        }
        this.deleteData(id, handler);
        break;
      default:
        console.error('Unknown action:', action);
        break;
    }
  }

  deleteData(id: string, handler: <T>(payload?: T) => Observable<T>) {
    this.formSrvc.onDelete(id, handler)
      .subscribe({
        next: () => {
          this.modalSrvc.close(this.confirmModalId);
        }
      });
  }

  logout(handler: <T>(payload?: T) => Observable<T>) {
    handler().subscribe({
      next: () => {
        this.modalSrvc.close(this.confirmModalId);
        this.authSrvc.clearToken();
        this.router.navigateByUrl('/login');
      },
    })
  }
}
