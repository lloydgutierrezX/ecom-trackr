import { Component, Input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Router, RouterModule } from '@angular/router';
import { IMenu } from '../../interface/menu.interface';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, IconsComponent, NgTemplateOutlet],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  @Input() menus: IMenu[] = [];

  constructor(public router: Router) { }

  trackByFn(item: { route: string }) {
    return item.route;
  }
}
