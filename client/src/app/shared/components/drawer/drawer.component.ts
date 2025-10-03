import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MENU_ITEMS } from '../menu/menu';
import { IMenu } from '../../interfaces/menu.interface';
import { NavigationEnd, Router } from '@angular/router';
import { catchError, filter, finalize, Subscription, tap } from 'rxjs';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { ModalService } from '../../services/modal/modal.service';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MenuComponent, UserProfileComponent, IconsComponent],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() open = false;
  @Output() drawerStateChanged = new EventEmitter<boolean>();

  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;
  smallScreen = false;

  MENU_ITEMS_LIST: IMenu[] = MENU_ITEMS;
  private routerSub!: Subscription;

  isLoading = false;

  constructor(
    private router: Router,
    private authApiSrvc: AuthApiService,
    private modalSrvc: ModalService,
  ) { }

  ngOnInit(): void {
    this.modalSrvc.onClose$.subscribe(id => {
      if (id === 'confirm-modal') {
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.syncDrawerState();

    this.smallScreen = window.innerWidth < 1024;

    this.routerSub = this.router.events
      .pipe(filter(events => events instanceof NavigationEnd))
      .subscribe(() => {
        this.drawerToggle.nativeElement.checked = false;
        this.onDrawerChange()
      });
  }

  ngOnChanges(): void {
    this.syncDrawerState();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = window.innerWidth < 1024;
  }

  checkScreen(): boolean {
    return window.innerWidth < 1024;
  }

  syncDrawerState() {
    if (!this.drawerToggle) return;

    const el = this.drawerToggle.nativeElement;
    if (this.open !== el.checked) {
      el.checked = this.open;
    }
  }

  onDrawerChange() {
    const isChecked = this.drawerToggle.nativeElement.checked;
    this.drawerStateChanged.emit(isChecked);
  }

  signOut() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.modalSrvc.open('confirm-modal',
      {
        type: 'logout',
        handler: () => this.authApiSrvc.logoutUser()
      }
    );
  }
}