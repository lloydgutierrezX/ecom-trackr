import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges, HostListener } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MENU_ITEMS } from '../menu/menu';
import { IMenu } from '../../interfaces/menu.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MenuComponent, UserProfileComponent, IconsComponent],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit, OnChanges {
  @Input() open = false;
  @Output() drawerStateChanged = new EventEmitter<boolean>();

  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;
  smallScreen = false;

  MENU_ITEMS_LIST: IMenu[] = MENU_ITEMS;
  private routerSub!: Subscription;

  constructor(private router: Router, private el: ElementRef) { }

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
    console.log(window.innerWidth);
    console.log(this.smallScreen);
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
    console.log('log me out!');
  }
}
