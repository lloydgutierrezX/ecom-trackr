import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html'
})
export class DrawerComponent implements AfterViewInit, OnChanges {
  @Input() open = false;
  @Output() drawerStateChanged = new EventEmitter<boolean>();

  @ViewChild('drawerToggle') drawerToggle!: ElementRef<HTMLInputElement>;

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
