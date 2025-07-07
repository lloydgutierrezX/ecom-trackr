import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { MenuComponent } from '../menu/menu.component';
import { MENU_ITEMS } from './menu';
import { IMenu } from '../../interface/menu.interface';
@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit, OnChanges {
  @Input() open = false;
  @Output() drawerStateChanged = new EventEmitter<boolean>();

  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;

  MENU_ITEMS_LIST: IMenu[] = MENU_ITEMS;

  ngAfterViewInit() {
    this.syncDrawerState();
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
}
