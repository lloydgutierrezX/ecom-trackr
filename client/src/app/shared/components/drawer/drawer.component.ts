import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MENU_ITEMS } from '../menu/menu';
import { IMenu } from '../../interfaces/menu.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UserProfileComponent } from "../user-profile/user-profile.component";
import { IconsComponent } from '../icons/icons.component';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MenuComponent, UserProfileComponent, IconsComponent],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit, OnChanges {
  @Input() open = false;
  @Output() drawerStateChanged = new EventEmitter<boolean>();

  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;

  MENU_ITEMS_LIST: IMenu[] = MENU_ITEMS;
  private routerSub!: Subscription;

  constructor(private router: Router, private el: ElementRef) { }

  ngAfterViewInit() {
    this.syncDrawerState();

    this.routerSub = this.router.events
      .pipe(filter(events => events instanceof NavigationEnd))
      .subscribe(() => {
        console.log('asdasdasdsa')
        this.drawerToggle.nativeElement.checked = false;
        this.onDrawerChange()
      });
  }

  ngOnChanges() {
    this.syncDrawerState();
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
